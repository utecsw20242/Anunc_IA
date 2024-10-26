import {
    Layers as Robot,
    Message as AIChatBot,
    Sort as WriteTitle,
    LeftAlign as WriteDescription,
    Tag as AudienceIdentifier,
    DonutChart as BudgetRecommendation,
    ColorPalette as AIPromptImage,
    Rocket as AdPublisher,
    Internet as FacebookAds,
    Grid as GoogleAds,
    Film as TikTokAds,
    Clipboard as CreatedDocuments,
    Promotion as AdAccountLink,
    Settings as SettingsManager
} from "../components/icons";

const data = [
    {
        id: "01",
        icon: <Robot />,  // Puedes usar el ícono que prefieras o tengas disponible
        link: "/app/templates/ai-strategy-suggestions",
        slug: "ai-strategy-suggestions",
        name: "Sugerencias Estratégicas de IA",
        status: "active",
        prompt: "Genera estrategias de IA para campañas",
        api: "Strategy",
        aimodel: "davinci",
        description: "Ofrece recomendaciones de IA para optimizar las estrategias publicitarias, mejorando el targeting y los mensajes."
    },    
    {
        id: "02",
        icon: <AIChatBot />,
        link: "/app/templates/chatbot",
        slug: "ai-chatbot",
        name: "Asistente de IA",
        status: "active",
        prompt: "Interactúa con la IA",
        api: "Chat",
        aimodel: "gpt-4",
        description: "Asistente de IA para consultas y asistencia en la creación de campañas publicitarias."
    },
    {
        id: "03",
        icon: <WriteTitle />,
        link: "/app/templates/ad-title",
        slug: "ad-title",
        name: "Headline para Anuncio",
        status: "active",
        prompt: "Genera títulos para anuncios",
        api: "Text",
        aimodel: "davinci",
        description: "Genera títulos atractivos y efectivos para tus anuncios en diferentes plataformas."
    },
    {
        id: "04",
        icon: <WriteDescription />,
        link: "/app/templates/ad-description",
        slug: "ad-description",
        name: "Descripción para Anuncio",
        status: "active",
        prompt: "Genera descripciones para anuncios",
        api: "Text",
        aimodel: "davinci",
        description: "Crea descripciones detalladas y llamativas para captar la atención de los usuarios."
    },
    {
        id: "05",
        icon: <AudienceIdentifier />,
        link: "/app/templates/audience-identifier",
        slug: "audience-identifier",
        name: "Identificador de Público",
        status: "active",
        prompt: "Identifica el público objetivo",
        api: "Text",
        aimodel: "davinci",
        description: "Herramienta para identificar el público objetivo ideal para tus anuncios."
    },
    {
        id: "06",
        icon: <BudgetRecommendation />,
        link: "/app/templates/budget-recommendation",
        slug: "budget-recommendation",
        name: "Recomendación de Presupuesto y Duración",
        status: "active",
        prompt: "Recomienda presupuesto y duración",
        api: "Text",
        aimodel: "davinci",
        description: "Ofrece recomendaciones para optimizar el presupuesto y duración de campañas."
    },
    {
        id: "07",
        icon: <AIPromptImage />,
        link: "/app/templates/ai-image-prompt",
        slug: "ai-image-prompt",
        name: "Prompt para Imagen AI",
        status: "active",
        prompt: "Genera prompts para imágenes",
        api: "Image",
        aimodel: "dall-e",
        description: "Genera prompts para imágenes creativas y personalizadas usando IA."
    },
    {
        id: "08",
        icon: <AdPublisher />,
        link: "/app/templates/ad-publisher",
        slug: "ad-publisher",
        name: "Publica Anuncios",
        status: "active",
        prompt: "Automatiza la publicación de anuncios",
        api: "Publish",
        aimodel: "automation",
        description: "Automatiza el proceso de publicación de anuncios en múltiples plataformas."
    },
    {
        id: "09",
        icon: <FacebookAds />,
        link: "/app/templates/facebook-ads",
        slug: "facebook-ads",
        name: "Facebook Ads",
        status: "active",
        prompt: "Publica en Facebook",
        api: "Publish",
        aimodel: "automation",
        description: "Publica y gestiona anuncios en Facebook de forma automática."
    },
    {
        id: "10",
        icon: <GoogleAds />,
        link: "/app/templates/google-ads",
        slug: "google-ads",
        name: "Google Ads",
        status: "active",
        prompt: "Publica en Google",
        api: "Publish",
        aimodel: "automation",
        description: "Automatiza la publicación y administración de anuncios en Google."
    },
    {
        id: "11",
        icon: <TikTokAds />,
        link: "/app/templates/tiktok-ads",
        slug: "tiktok-ads",
        name: "TikTok Ads",
        status: "active",
        prompt: "Publica en TikTok",
        api: "Publish",
        aimodel: "automation",
        description: "Gestiona y publica anuncios de video en TikTok."
    },
    {
        id: "12",
        icon: <CreatedDocuments />,
        link: "/app/templates/documents",
        slug: "created-documents",
        name: "Documentos Creados",
        status: "active",
        prompt: "Visualiza documentos creados",
        api: "Docs",
        aimodel: "N/A",
        description: "Acceso a todos los documentos generados por las herramientas de IA."
    },
    {
        id: "13",
        icon: <AdAccountLink />,
        link: "/app/templates/ad-account-link",
        slug: "ad-account-link",
        name: "Vincular Cuenta Publicitaria",
        status: "active",
        prompt: "Vincula cuentas publicitarias",
        api: "Account",
        aimodel: "N/A",
        description: "Permite vincular cuentas publicitarias de distintas plataformas para una gestión centralizada."
    },
    {
        id: "14",
        icon: <SettingsManager />,
        link: "/app/templates/settings",
        slug: "settings",
        name: "Configuraciones",
        status: "active",
        prompt: "Configura la aplicación",
        api: "Settings",
        aimodel: "N/A",
        description: "Ajusta las configuraciones de la plataforma para personalizar la experiencia de usuario."
    },
];

export default data;
