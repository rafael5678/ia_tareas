import { NextRequest, NextResponse } from 'next/server';

// Tipos de IA disponibles
type AIProvider = 'openai' | 'groq' | 'gemini';

// Sistema de prompts por categoría
const systemPrompts = {
  Inglés: `Eres un profesor experto de inglés. Ayudas con traducciones, gramática, vocabulario y pronunciación. 
  Responde de forma clara y educativa. Incluye ejemplos y contexto.`,
  
  Matemáticas: `Eres un profesor experto en matemáticas. Resuelves problemas paso a paso, explicando cada operación.
  Incluye la solución final y verifica el resultado. Usa símbolos matemáticos claros.`,
  
  Cálculo: `Eres un profesor experto en cálculo diferencial e integral. Explicas derivadas, integrales y límites paso a paso.
  Usa notación matemática clara y proporciona ejemplos.`,
  
  Programación: `Eres un desarrollador senior experto. Ayudas con código, algoritmos y debugging.
  Proporciona ejemplos de código funcionales y explica conceptos claramente.`,
  
  Idiomas: `Eres un políglota experto. Ayudas a aprender idiomas con traducciones, gramática básica y frases útiles.
  Proporciona contexto cultural cuando sea relevante.`,
  
  Estudio: `Eres un coach educativo experto. Enseñas técnicas de estudio efectivas, organización y métodos de aprendizaje.
  Proporciona consejos prácticos y aplicables.`,
  
  General: `Eres un asistente educativo general. Ayudas con cualquier tema académico o de aprendizaje.
  Eres claro, conciso y educativo.`,
};

// Detectar categoría del mensaje
function detectCategory(message: string): keyof typeof systemPrompts {
  const lower = message.toLowerCase();
  
  if (lower.match(/inglés|english|translate|traducir|grammar|gramática/i)) return 'Inglés';
  if (lower.match(/matemáticas|math|ecuación|resolver|suma|resta|multiplicar|algebra/i)) return 'Matemáticas';
  if (lower.match(/cálculo|derivada|integral|límite|diferencial/i)) return 'Cálculo';
  if (lower.match(/programar|código|code|javascript|python|algoritmo/i)) return 'Programación';
  if (lower.match(/francés|alemán|portugués|idioma|language/i)) return 'Idiomas';
  if (lower.match(/estudiar|study|examen|test|memorizar|técnica/i)) return 'Estudio';
  
  return 'General';
}

// Función para llamar a OpenAI
async function callOpenAI(message: string, category: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY no configurada');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview', // o 'gpt-3.5-turbo' para más barato
      messages: [
        { role: 'system', content: systemPrompts[category as keyof typeof systemPrompts] },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Función para llamar a Groq (GRATIS y RÁPIDA - solo texto)
async function callGroq(message: string, category: string) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY no configurada');
  }

  const model = 'llama-3.3-70b-versatile'; // Modelo de texto ultrarrápido
  
  const messages: any[] = [
    { role: 'system', content: systemPrompts[category as keyof typeof systemPrompts] },
    { role: 'user', content: message }
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Groq API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Función para llamar a Google Gemini (GRATIS - soporta imágenes)
async function callGemini(message: string, category: string, image?: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no configurada');
  }

  const prompt = `${systemPrompts[category as keyof typeof systemPrompts]}\n\nUsuario: ${message}`;

  // Usar modelo con visión si hay imagen
  const model = image ? 'gemini-1.5-flash-latest' : 'gemini-pro';
  
  const parts: any[] = [{ text: prompt }];
  
  // Si hay imagen, agregarla (debe ser base64)
  if (image) {
    // Extraer el base64 de la imagen (quitar el prefijo data:image/...;base64,)
    const base64Image = image.split(',')[1] || image;
    const mimeType = image.includes('data:') ? image.split(';')[0].split(':')[1] : 'image/jpeg';
    
    parts.push({
      inline_data: {
        mime_type: mimeType,
        data: base64Image
      }
    });
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Handler principal
export async function POST(request: NextRequest) {
  try {
    const { message, provider = 'groq', image } = await request.json();

    if (!message && !image) {
      return NextResponse.json(
        { error: 'Mensaje o imagen requerido' },
        { status: 400 }
      );
    }

    // Detectar categoría
    const category = detectCategory(message || 'Análisis de imagen');

    // Llamar a la IA según el proveedor
    let response: string;

    // Si hay imagen, usar Gemini (tiene visión gratis)
    if (image) {
      response = await callGemini(message || '¿Qué hay en esta imagen? Analízala en detalle y resuelve cualquier problema que veas.', category, image);
    } else {
      // Sin imagen, usar el proveedor seleccionado
      switch (provider as AIProvider) {
        case 'openai':
          response = await callOpenAI(message, category);
          break;
        case 'groq':
          response = await callGroq(message, category);
          break;
        case 'gemini':
          response = await callGemini(message, category);
          break;
        default:
          return NextResponse.json(
            { error: 'Proveedor de IA no válido' },
            { status: 400 }
          );
      }
    }

    return NextResponse.json({
      response,
      category,
      provider,
    });

  } catch (error: any) {
    console.error('Error en API de IA:', error);
    
    // Si no hay API key configurada, usar respuestas locales como fallback
    if (error.message.includes('no configurada')) {
      return NextResponse.json(
        { 
          error: 'API key no configurada',
          fallback: true,
          message: 'Usando respuestas locales. Configura una API key para mejores resultados.'
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  const providers = {
    openai: !!process.env.OPENAI_API_KEY,
    groq: !!process.env.GROQ_API_KEY,
    gemini: !!process.env.GEMINI_API_KEY,
  };

  return NextResponse.json({
    status: 'OK',
    providers,
    message: 'AI API endpoint funcionando',
  });
}


