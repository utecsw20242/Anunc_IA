export const menuData = [
    { text: "Inicio", link: "/app" },
    {
        text: "Plantillas",
        link: "#",
        label: "2",
        sub: [
            {
                text: "Escritor Ai",
                link: "#",
                label: "3",
                sub: [
                    { text: "Plantilla 1", link: "/app/templates/1" },
                    { text: "Plantilla 2", link: "/app/templates/2" },
                ],
            },
            {
                text: "Imagen Ai",
                link: "#",
                label: "3",
                sub: [
                    { text: "Generador de Imágenes", link: "/app/templates/image" },
                    { text: "Generador de Imágenes S2", link: "/app/templates/image-s2" }
                ]
            },
            {
                text: "Chatbot Ai",
                link: "#",
                label: "3",
                sub: [
                    { text: "Chatbot S1", link: "/app/templates/chatbot" },
                    { text: "Chatbot S2", link: "/app/templates/chatbot-s2", tag: "Nuevo" }
                ]
            },
            { text: "Código Ai", link: "/app/templates/code" },
            { text: "Texto a Voz Ai", link: "/app/templates/speech-to-text" },
            { divider: true },
            { text: `Todas las Plantillas`, link: "/app/templates" }
        ]
    },
    { text: "Documentos", link: "/app/documents" },
    {
        text: "Páginas",
        link: "#",
        label: "2",
        sub: [
            { text: "Perfil", link: "/app/profile" },
            { text: "Paquetes", link: "/app/packages" },
            { text: "Preguntas Frecuentes", link: "/app/faq" },
            { text: "Iniciar Sesión", link: "/login" },
            { text: "Crear Cuenta", link: "/create-account" },
            { text: "Verificación en Dos Pasos", link: "/two-step" },
            { text: "Error 404", link: "/404" },
            { divider: true },
            { text: "Sitio Web", link: "/" },
            { text: "Panel de Control", link: "/admin" }
        ]
    }
];
