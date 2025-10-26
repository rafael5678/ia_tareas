"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, BookOpen, Calculator, Globe, Code, Lightbulb, Brain, Zap, MessageSquare, Image as ImageIcon, X, Volume2, VolumeX, Mic, MicOff, History, Save, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";

interface Message {
  role: "user" | "ai";
  content: string;
  category?: string;
  image?: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

export default function AIAssistantUniversal() {
  const { tasks } = useStore();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "¡Hola! 👋 Soy tu asistente universal con IA. Puedo ayudarte con:\n\n📚 Inglés - Traducciones, gramática, vocabulario\n🔢 Matemáticas - Álgebra, geometría, estadística\n📐 Cálculo - Derivadas, integrales, límites\n💻 Programación - JavaScript, Python, algoritmos\n📖 Estudio - Resúmenes, esquemas, técnicas\n✍️ Escritura - Ensayos, redacción, corrección\n\n¿En qué puedo ayudarte hoy?",
    },
  ]);

  const subjects = [
    {
      icon: BookOpen,
      title: "Inglés",
      description: "Traduce, corrige gramática",
      color: "from-blue-400 to-cyan-500",
      prompt: "Ayúdame con inglés: traducción y gramática",
    },
    {
      icon: Calculator,
      title: "Matemáticas",
      description: "Resuelve problemas matemáticos",
      color: "from-purple-400 to-pink-500",
      prompt: "Necesito ayuda resolviendo un problema de matemáticas",
    },
    {
      icon: Brain,
      title: "Cálculo",
      description: "Derivadas, integrales, límites",
      color: "from-orange-400 to-red-500",
      prompt: "Ayúdame con cálculo: derivadas e integrales",
    },
    {
      icon: Code,
      title: "Programación",
      description: "Código y algoritmos",
      color: "from-green-400 to-emerald-500",
      prompt: "Necesito ayuda con programación",
    },
    {
      icon: Globe,
      title: "Idiomas",
      description: "Español, francés, alemán",
      color: "from-yellow-400 to-amber-500",
      prompt: "Ayúdame a aprender un nuevo idioma",
    },
    {
      icon: Lightbulb,
      title: "Estudio General",
      description: "Técnicas y organización",
      color: "from-indigo-400 to-blue-500",
      prompt: "Dame técnicas de estudio efectivas",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [aiProvider, setAiProvider] = useState<"groq" | "openai" | "gemini" | "local">("groq");
  const [useRealAI, setUseRealAI] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Text-to-Speech
      if ('speechSynthesis' in window) {
        synthesisRef.current = window.speechSynthesis;
        setSpeechEnabled(true);
      }
      
      // Speech-to-Text
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'es-ES';
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setMessage((prev) => prev + (prev ? ' ' : '') + transcript);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };
        
        setVoiceEnabled(true);
      }
    }
    
    // Cargar conversaciones guardadas
    const saved = localStorage.getItem('ai-conversations');
    if (saved) {
      try {
        setConversations(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading conversations:', error);
      }
    }
  }, []);

  // Guardar conversación actual
  const saveCurrentConversation = () => {
    if (messages.length <= 1) return; // No guardar si solo está el mensaje inicial
    
    const title = messages[1]?.content.substring(0, 50) + (messages[1]?.content.length > 50 ? '...' : '');
    const newConversation: Conversation = {
      id: currentConversationId || Date.now().toString(),
      title,
      messages,
      timestamp: Date.now()
    };
    
    const updated = currentConversationId
      ? conversations.map(c => c.id === currentConversationId ? newConversation : c)
      : [newConversation, ...conversations];
    
    setConversations(updated);
    setCurrentConversationId(newConversation.id);
    localStorage.setItem('ai-conversations', JSON.stringify(updated));
  };

  // Cargar una conversación guardada
  const loadConversation = (conv: Conversation) => {
    setMessages(conv.messages);
    setCurrentConversationId(conv.id);
    setShowHistory(false);
  };

  // Nueva conversación
  const newConversation = () => {
    setMessages([{
      role: "ai",
      content: "¡Hola! 👋 Soy tu asistente universal con IA. Puedo ayudarte con:\n\n📚 Inglés - Traducciones, gramática, vocabulario\n🔢 Matemáticas - Álgebra, geometría, estadística\n📐 Cálculo - Derivadas, integrales, límites\n💻 Programación - JavaScript, Python, algoritmos\n📖 Estudio - Resúmenes, esquemas, técnicas\n✍️ Escritura - Ensayos, redacción, corrección\n\n¿En qué puedo ayudarte hoy?",
    }]);
    setCurrentConversationId(null);
  };

  // Eliminar conversación
  const deleteConversation = (id: string) => {
    const updated = conversations.filter(c => c.id !== id);
    setConversations(updated);
    localStorage.setItem('ai-conversations', JSON.stringify(updated));
    if (currentConversationId === id) {
      newConversation();
    }
  };

  const speakText = (text: string) => {
    if (!synthesisRef.current || !speechEnabled) return;
    
    // Cancelar cualquier speech en progreso
    synthesisRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && voiceEnabled) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting voice recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    if ((!message.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = { 
      role: "user", 
      content: message || "¿Qué hay en esta imagen?",
      image: selectedImage || undefined
    };
    
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);
    
    // Limpiar imagen después de enviar
    const imageToSend = selectedImage;
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    try {
      // Intentar usar IA real si está habilitada y no es "local"
      if (useRealAI && aiProvider !== "local") {
        const requestBody: any = {
          message: message || "Analiza esta imagen",
          provider: aiProvider,
        };

        // Si hay imagen, agregarla al request
        if (imageToSend) {
          requestBody.image = imageToSend;
        }

        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (data.fallback || !response.ok) {
          // Usar respuestas locales como fallback
          console.log('Usando respuestas locales (fallback)');
          const category = detectCategory(message);
          const localResponse = generateUniversalAIResponse(message, category);
          setMessages([...newMessages, { role: "ai", content: localResponse + "\n\n💡 *Tip: Configura una API key gratuita de Groq para mejores respuestas. Ver GUIA-API-IA.md*", category }]);
        } else {
          // Usar respuesta de IA real
          setMessages([...newMessages, { 
            role: "ai", 
            content: data.response, 
            category: data.category 
          }]);
        }
      } else {
        // Modo local (sin API)
        const category = detectCategory(message);
        const localResponse = generateUniversalAIResponse(message, category);
        setMessages([...newMessages, { role: "ai", content: localResponse, category }]);
      }
    } catch (error) {
      console.error('Error al llamar a la IA:', error);
      // Fallback a respuestas locales
      const category = detectCategory(message);
      const localResponse = generateUniversalAIResponse(message, category);
      setMessages([...newMessages, { role: "ai", content: localResponse + "\n\n⚠️ *Error de conexión. Usando respuestas locales.*", category }]);
    } finally {
      setIsLoading(false);
    }

    setMessage("");
  };

  const detectCategory = (text: string): string => {
    const lower = text.toLowerCase();
    
    if (lower.match(/inglés|english|translate|traducir|grammar|gramática/)) return "Inglés";
    if (lower.match(/matemáticas|math|ecuación|resolver|suma|resta|multiplicar/)) return "Matemáticas";
    if (lower.match(/cálculo|derivada|integral|límite|diferencial/)) return "Cálculo";
    if (lower.match(/programar|código|code|javascript|python|algoritmo/)) return "Programación";
    if (lower.match(/francés|alemán|portugués|idioma|language/)) return "Idiomas";
    if (lower.match(/estudiar|study|examen|test|memorizar/)) return "Estudio";
    
    return "General";
  };

  const generateUniversalAIResponse = (userMessage: string, category: string): string => {
    const lower = userMessage.toLowerCase();

    // Detectar si es una pregunta muy general
    const isVeryGeneral = lower.match(/^(ayuda|ayudame|help|necesito|quiero|hola|hi)$/i);
    
    // INGLÉS
    if (category === "Inglés" || lower.includes("inglés") || lower.includes("english") || lower.includes("ingles")) {
      // Respuesta para solicitudes generales de ejercicios
      if (lower.includes("ejercicio") || lower.includes("tarea") || lower.includes("homework")) {
        return "📚 **Ejercicios de Inglés**\n\n¡Perfecto! Te puedo ayudar con:\n\n**1. Traducciones:**\nEspañol ↔ Inglés con contexto\n\n**2. Gramática:**\n• Presente simple/continuo\n• Pasado simple/perfecto\n• Futuro (will/going to)\n• Condicionales\n\n**3. Vocabulario:**\n• Sinónimos y antónimos\n• Phrasal verbs\n• Expresiones comunes\n\n**4. Escritura:**\n• Essays y párrafos\n• Emails formales/informales\n• Corrección de textos\n\n**¿Qué tipo de ejercicio necesitas?**\n\nEjemplo: \"Tengo que traducir 5 oraciones\" o \"Necesito practicar present perfect\"\n\n💡 *Para respuestas más detalladas, configura Groq gratis (ver CONFIGURAR-GROQ.md)*";
      }
      if (lower.includes("traducir") || lower.includes("translate") || lower.includes("traducci")) {
        return "📚 **Traducción en Inglés**\n\n¡Listo para ayudarte!\n\n**Comparte el texto que necesitas traducir**\n\nPuedo ayudarte con:\n✅ Traducción precisa español → inglés\n✅ Inglés → español con contexto\n✅ Explicación de modismos\n✅ Múltiples formas de decir lo mismo\n\nEjemplo:\n\"Traduce: 'Estoy estudiando programación'\"\n→ \"I'm studying programming\"\n\n**Ahora tú, ¿qué necesitas traducir?**";
      }
      if (lower.includes("gramática") || lower.includes("grammar") || lower.includes("gramatica")) {
        return "📖 **Gramática en Inglés**\n\n**Temas que puedo explicar:**\n\n1. **Present Simple**: I work, he works\n2. **Present Continuous**: I am working\n3. **Past Simple**: I worked\n4. **Present Perfect**: I have worked\n5. **Future**: will/going to\n6. **Conditionals**: If I were you...\n7. **Passive Voice**: was/were + past participle\n\n**Dime qué tema específico necesitas**\n\nEjemplo: \"Explícame el present perfect\" o \"¿Cuándo uso 'will' vs 'going to'?\"";
      }
      return "🌍 **Ayuda con Inglés**\n\n¡Estoy aquí para ayudarte!\n\n**Puedo ayudarte con:**\n• Traducciones (español ↔ inglés)\n• Gramática y tiempos verbales\n• Vocabulario y expresiones\n• Corrección de textos\n• Ejercicios y tareas\n• Comprensión de lectura\n\n**Sé más específico:**\n\nEn lugar de: \"ayuda con inglés\"\nDi: \"Traduce estas 3 oraciones\" o \"Explícame el past perfect\"\n\n¿Qué necesitas exactamente?";
    }

    // MATEMÁTICAS
    if (category === "Matemáticas" || lower.includes("matemáticas") || lower.includes("resolver")) {
      if (lower.includes("ecuación")) {
        return "🔢 **Resolución de Ecuaciones**\n\nPuedo ayudarte con:\n\n**Ecuaciones Lineales:**\n• 2x + 5 = 13\n• x = (13 - 5) / 2 = 4\n\n**Ecuaciones Cuadráticas:**\n• ax² + bx + c = 0\n• Fórmula: x = [-b ± √(b²-4ac)] / 2a\n\n**Sistemas de Ecuaciones:**\n• Método de sustitución\n• Método de eliminación\n\nEscribe tu ecuación y te ayudo paso a paso! 📐";
      }
      return "📊 **Ayuda con Matemáticas**\n\nTemas que domino:\n\n✓ Álgebra: ecuaciones, factorización\n✓ Geometría: áreas, volúmenes, teoremas\n✓ Trigonometría: seno, coseno, tangente\n✓ Estadística: media, mediana, desviación\n✓ Probabilidad: combinatoria, eventos\n\n¿Qué problema matemático necesitas resolver?";
    }

    // CÁLCULO
    if (category === "Cálculo" || lower.includes("cálculo") || lower.includes("derivada") || lower.includes("integral")) {
      if (lower.includes("derivada")) {
        return "📐 **Derivadas - Cálculo**\n\n**Reglas básicas:**\n\n1. Potencia: d/dx(xⁿ) = n·xⁿ⁻¹\n2. Exponencial: d/dx(eˣ) = eˣ\n3. Logaritmo: d/dx(ln x) = 1/x\n4. Seno: d/dx(sin x) = cos x\n5. Coseno: d/dx(cos x) = -sin x\n\n**Regla de la cadena:**\nd/dx[f(g(x))] = f'(g(x)) · g'(x)\n\nEjemplo: d/dx(x³) = 3x²\n\n¿Qué función necesitas derivar?";
      }
      if (lower.includes("integral")) {
        return "∫ **Integrales - Cálculo**\n\n**Reglas básicas:**\n\n1. ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C\n2. ∫ eˣ dx = eˣ + C\n3. ∫ 1/x dx = ln|x| + C\n4. ∫ sin x dx = -cos x + C\n5. ∫ cos x dx = sin x + C\n\n**Integración por partes:**\n∫ u dv = uv - ∫ v du\n\nEjemplo: ∫ x² dx = x³/3 + C\n\n¿Qué integral necesitas resolver?";
      }
      return "🎓 **Ayuda con Cálculo**\n\nPuedo ayudarte con:\n\n📈 Límites: lim x→a f(x)\n📊 Derivadas: f'(x)\n∫ Integrales: ∫ f(x) dx\n📉 Aplicaciones: máximos, mínimos\n🎯 Series y sucesiones\n\n¿Qué tema de cálculo necesitas?";
    }

    // PROGRAMACIÓN
    if (category === "Programación" || lower.includes("código") || lower.includes("programar")) {
      return "💻 **Ayuda con Programación**\n\nLenguajes y tecnologías:\n\n```javascript\n// JavaScript/TypeScript\nconst saludar = (nombre) => {\n  return `Hola ${nombre}!`;\n};\n```\n\n```python\n# Python\ndef saludar(nombre):\n    return f'Hola {nombre}!'\n```\n\nPuedo ayudarte con:\n• JavaScript, TypeScript, Python\n• Algoritmos y estructuras de datos\n• Debugging y optimización\n• React, Next.js, Node.js\n• Git y control de versiones\n\n¿Qué necesitas programar?";
    }

    // IDIOMAS
    if (category === "Idiomas") {
      return "🌍 **Aprendizaje de Idiomas**\n\nIdiomas disponibles:\n\n🇬🇧 Inglés - English\n🇫🇷 Francés - Français\n🇩🇪 Alemán - Deutsch\n🇮🇹 Italiano - Italiano\n🇵🇹 Portugués - Português\n\nMétodos de aprendizaje:\n• Vocabulario esencial\n• Frases comunes\n• Gramática básica\n• Práctica conversacional\n• Tips culturales\n\n¿Qué idioma quieres aprender?";
    }

    // TÉCNICAS DE ESTUDIO
    if (lower.includes("estudiar") || lower.includes("técnicas") || lower.includes("examen")) {
      return "📚 **Técnicas de Estudio Efectivas**\n\n**Métodos comprobados:**\n\n1. 📖 **Pomodoro**: 25 min estudio + 5 min descanso\n2. 🎯 **Feynman**: Explica el tema como a un niño\n3. 📝 **Cornell**: Sistema de notas estructurado\n4. 🔄 **Repaso espaciado**: Revisa en intervalos\n5. 🧠 **Mapas mentales**: Conecta conceptos\n\n**Para exámenes:**\n✓ Empieza 2 semanas antes\n✓ Resume cada tema\n✓ Practica con ejercicios\n✓ Duerme bien\n✓ Mantén calma\n\n¿Qué materia estás estudiando?";
    }

    // RESPUESTA GENERAL mejorada
    if (lower.includes("tarea") || lower.includes("homework") || lower.includes("ejercicio")) {
      return `📚 **Asistente para Tareas**\n\n¡Perfecto! Puedo ayudarte con tareas de:\n\n**📚 Inglés:**\n"Traduce 5 oraciones" o "Explícame present perfect"\n\n**🔢 Matemáticas:**\n"Resuelve 2x + 5 = 13" o "Ayuda con ecuaciones"\n\n**📐 Cálculo:**\n"Deriva x³ + 2x" o "Calcula integral de x²"\n\n**💻 Programación:**\n"Explica qué es una función" o "Código para...\"\n\n**Solo dime:**\n1. La materia específica\n2. El ejercicio concreto\n3. Qué necesitas (resolver, explicar, traducir, etc.)\n\n**Ejemplo bueno:**\n\"Ayúdame con inglés: traduce 'Estoy estudiando'\"\n\n**En lugar de:**\n\"ayudame con ingles\"\n\n💡 *Nota: Para respuestas mucho más detalladas, configura Groq gratis en 2 minutos (ver CONFIGURAR-GROQ.md)*`;
    }
    
    return `🤖 **Asistente IA Universal**\n\n¡Hola! Puedo ayudarte con cualquier materia.\n\n**Para que te ayude mejor, sé específico:**\n\n❌ Evita: "ayuda", "hola", "necesito ayuda"\n\n✅ Mejor:\n• "Traduce al inglés: 'Estoy feliz'"\n• "Resuelve: 2x + 5 = 13"\n• "¿Cómo derivo x²?"\n• "Explícame qué es un bucle for"\n\n**Categorías disponibles:**\n📚 Inglés | 🔢 Matemáticas | 📐 Cálculo\n💻 Programación | 🌍 Idiomas | 📖 Estudio\n\n**¿Qué necesitas resolver hoy?**\n\n💡 *Tip: Configura Groq (gratis) para respuestas 10x mejores → CONFIGURAR-GROQ.md*`;
  };

  const handleSuggestionClick = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 animate-fade-in pb-20 lg:pb-0">
      {/* Chat Area */}
      <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex flex-col h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)] lg:h-[calc(100vh-250px)]">
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-gray-100">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center animate-bounce-subtle flex-shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                  Asistente IA
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block truncate">Ayuda con cualquier materia 🎓</p>
              </div>
            </div>
            
            {/* Botones de acción */}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
              <button
                onClick={saveCurrentConversation}
                disabled={messages.length <= 1}
                className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                title="Guardar"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Guardar</span>
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-1 relative"
                title="Historial"
              >
                <History className="w-3 h-3 sm:w-4 sm:h-4" />
                {conversations.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {conversations.length}
                  </span>
                )}
              </button>
              <button
                onClick={newConversation}
                className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                title="Nueva"
              >
                ✨
              </button>
              
              {/* Selector de IA */}
              <select
                value={aiProvider}
                onChange={(e) => setAiProvider(e.target.value as any)}
                className="px-2 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs md:text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 max-w-[100px] sm:max-w-none"
              >
                <option value="groq">🚀 Groq</option>
                <option value="gemini">🌟 Gemini</option>
                <option value="openai">🧠 GPT-4</option>
                <option value="local">💻 Local</option>
              </select>
              {selectedImage && (
                <span className="text-[10px] sm:text-xs text-purple-600 font-medium flex items-center gap-1 animate-pulse">
                  📸 Gemini
                </span>
              )}
              {aiProvider !== "local" && !selectedImage && (
                <a
                  href={aiProvider === 'groq' ? 'https://console.groq.com/' : 'https://aistudio.google.com/app/apikey'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-700 underline whitespace-nowrap hidden lg:inline"
                  title="Obtén tu API key gratis"
                >
                  Get Key
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[85%] rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-white text-gray-900 border border-gray-200"
                }`}
              >
                {msg.category && msg.role === "ai" && (
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold text-purple-600">
                        {msg.category}
                      </span>
                    </div>
                    {speechEnabled && (
                      <button
                        onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.content)}
                        className="p-1 hover:bg-purple-100 rounded transition-colors"
                        title={isSpeaking ? "Detener" : "Escuchar"}
                      >
                        {isSpeaking ? (
                          <VolumeX className="w-4 h-4 text-purple-600" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-purple-600" />
                        )}
                      </button>
                    )}
                  </div>
                )}
                {msg.image && (
                  <div className="mb-3">
                    <img 
                      src={msg.image} 
                      alt="Uploaded" 
                      className="max-w-full h-auto rounded-lg border-2 border-white/20"
                    />
                  </div>
                )}
                <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                {msg.role === "ai" && !msg.category && speechEnabled && (
                  <button
                    onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.content)}
                    className="mt-2 text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3 h-3" />
                        Detener
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        Escuchar
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 md:p-6 border-t border-gray-100 bg-gray-50">
          {/* Image Preview */}
          {selectedImage && (
            <div className="mb-2 sm:mb-4 relative inline-block">
              <img 
                src={selectedImage} 
                alt="Preview" 
                className="max-h-20 sm:max-h-32 rounded-lg border-2 border-purple-300"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          )}

          <div className="flex gap-1 sm:gap-2 md:gap-3">
            {/* Hidden file input */}
            <input 
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            
            {/* Image upload button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-purple-300 text-purple-600 rounded-lg sm:rounded-xl hover:bg-purple-50 transition-all flex items-center gap-1 sm:gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              title="Subir imagen"
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Voice input button */}
            {voiceEnabled && (
              <button
                onClick={() => isListening ? stopListening() : startListening()}
                disabled={isLoading}
                className={`px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border-2 rounded-lg sm:rounded-xl transition-all flex items-center gap-1 sm:gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${
                  isListening 
                    ? 'bg-red-500 border-red-500 text-white animate-pulse' 
                    : 'bg-white border-green-400 text-green-600 hover:bg-green-50'
                }`}
                title={isListening ? "Detener" : "Grabar"}
              >
                {isListening ? <MicOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            )}

            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
              placeholder={selectedImage ? "Describe la imagen..." : "Pregunta lo que necesites..."}
              disabled={isLoading}
              className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-0"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || (!message.trim() && !selectedImage)}
              className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all flex items-center gap-1 sm:gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 text-xs sm:text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Pensando...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Enviar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions Sidebar - Hidden on mobile */}
      <div className="hidden lg:block space-y-4 xl:space-y-6">
        <div className="bg-white rounded-xl xl:rounded-2xl p-4 xl:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-bold text-gray-800">Materias Rápidas</h3>
          </div>
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(subject.prompt)}
                className="w-full p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all text-left group border border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <subject.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {subject.title}
                    </p>
                    <p className="text-sm text-gray-600">{subject.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* AI Stats */}
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5" />
            <h3 className="text-lg font-bold">Estadísticas de Ayuda</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Consultas respondidas</span>
              <span className="font-bold text-xl">{messages.length - 1}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Materias cubiertas</span>
              <span className="font-bold text-xl">6+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Disponibilidad</span>
              <span className="font-bold text-xl">24/7</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowHistory(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">Historial de Conversaciones</h3>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {conversations.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No hay conversaciones guardadas</p>
                  <p className="text-sm text-gray-400 mt-2">Usa el botón 💾 para guardar tus conversaciones</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => loadConversation(conv)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate group-hover:text-purple-600 transition-colors">
                            {conv.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {conv.messages.length} mensajes • {new Date(conv.timestamp).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('¿Eliminar esta conversación?')) {
                              deleteConversation(conv.id);
                            }
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

