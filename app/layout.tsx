import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Task Manager - Gestión Inteligente de Tareas",
  description: "Sistema de gestión de tareas con IA, colaboración en tiempo real y analytics avanzados",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}


