export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';

const es = {
  'meta.title': 'Desarrollador .NET',
  'meta.description':
    'Portfolio de Lucas Gallardo: Analista de Sistemas y desarrollador .NET. Aplicaciones en C# con arquitectura multicapa, patrones de diseño y SQL Server optimizado.',

  'a11y.skip': 'Saltar al contenido',
  'a11y.theme': 'Cambiar el tema de color',
  'a11y.theme.dark': 'Activar el modo claro',
  'a11y.theme.light': 'Activar el modo oscuro',
  'a11y.lang': 'Cambiar a inglés',
  'a11y.menu': 'Abrir menú de navegación',
  'a11y.toTop': 'Volver arriba',

  'nav.main': 'Navegación principal',
  'nav.profile': 'Perfil',
  'nav.track': 'Trayectoria',
  'nav.projects': 'Proyectos',
  'nav.blog': 'Blog',
  'nav.contact': 'Contacto',
  'nav.cv': 'Descargar CV',
  'nav.menu': 'Menú',

  'work.eyebrow': 'Trabajo seleccionado',
  'work.title': 'Proyectos',
  'work.lead':
    'Tres proyectos donde el análisis del problema pesó tanto como el código: arquitectura definida antes de programar, decisiones técnicas justificadas y resultados medibles.',
  'work.stack': 'Stack',
  'work.year': 'Año',
  'work.more': 'Ver el detalle',
  'work.repo': 'Ver repositorio',

  'blog.eyebrow': 'Blog',
  'blog.title': 'Notas de ingeniería',
  'blog.lead':
    'Escribo sobre lo que aprendo construyendo: arquitectura, patrones de diseño y rendimiento en SQL Server.',
  'blog.empty': 'En preparación',
  'blog.back': 'Volver al inicio',
  'blog.readingTime': 'min de lectura',

  'contact.eyebrow': 'Contacto',
  'contact.title': 'Hablemos',
  'contact.lead':
    'Busco mi primera posición como desarrollador .NET. Si tu equipo necesita a alguien que entienda el problema antes de escribir la primera línea, escribime.',
  'contact.email': 'Escribirme un correo',
  'contact.form.title': 'O dejame un mensaje',
  'contact.form.name': 'Nombre',
  'contact.form.email': 'Correo',
  'contact.form.message': 'Mensaje',
  'contact.form.submit': 'Enviar mensaje',
  'contact.form.sending': 'Enviando…',
  'contact.form.success': '¡Gracias! Te respondo a la brevedad.',
  'contact.form.error': 'No se pudo enviar. Probá de nuevo o escribime directo por correo.',
  'contact.channels': 'Otros canales',

  'footer.tagline': 'Analista de Sistemas · Desarrollador .NET',
  'footer.nav': 'Navegación',
  'footer.channels': 'Canales',
  'footer.built': 'Diseñado y construido por Lucas Gallardo',
  'footer.stack': 'Astro · Tailwind CSS',
  'footer.rights': 'Todos los derechos reservados',
  'footer.location': 'Agronomía, Buenos Aires',

  'notfound.title': 'Página no encontrada',
  'notfound.lead': 'La dirección que buscás no existe o cambió de lugar.',
  'notfound.home': 'Ir al inicio',
  'notfound.lang': 'This page is available in English.',
} as const;

const en: Record<keyof typeof es, string> = {
  'meta.title': '.NET Developer',
  'meta.description':
    'Portfolio of Lucas Gallardo: Systems Analyst and .NET developer. C# applications with layered architecture, design patterns and optimized SQL Server.',

  'a11y.skip': 'Skip to content',
  'a11y.theme': 'Switch color theme',
  'a11y.theme.dark': 'Switch to light mode',
  'a11y.theme.light': 'Switch to dark mode',
  'a11y.lang': 'Switch to Spanish',
  'a11y.menu': 'Open navigation menu',
  'a11y.toTop': 'Back to top',

  'nav.main': 'Main navigation',
  'nav.profile': 'Profile',
  'nav.track': 'Background',
  'nav.projects': 'Projects',
  'nav.blog': 'Blog',
  'nav.contact': 'Contact',
  'nav.cv': 'Download CV',
  'nav.menu': 'Menu',

  'work.eyebrow': 'Selected work',
  'work.title': 'Projects',
  'work.lead':
    'Three projects where analyzing the problem mattered as much as the code: architecture defined up front, justified technical decisions and measurable results.',
  'work.stack': 'Stack',
  'work.year': 'Year',
  'work.more': 'Read the case study',
  'work.repo': 'View repository',

  'blog.eyebrow': 'Blog',
  'blog.title': 'Engineering notes',
  'blog.lead':
    'I write about what I learn while building: architecture, design patterns and SQL Server performance.',
  'blog.empty': 'In progress',
  'blog.back': 'Back to home',
  'blog.readingTime': 'min read',

  'contact.eyebrow': 'Contact',
  'contact.title': "Let's talk",
  'contact.lead':
    'I am looking for my first role as a .NET developer. If your team needs someone who understands the problem before writing the first line, get in touch.',
  'contact.email': 'Send me an email',
  'contact.form.title': 'Or leave me a message',
  'contact.form.name': 'Name',
  'contact.form.email': 'Email',
  'contact.form.message': 'Message',
  'contact.form.submit': 'Send message',
  'contact.form.sending': 'Sending…',
  'contact.form.success': 'Thanks! I will get back to you shortly.',
  'contact.form.error': 'The message could not be sent. Please try again or email me directly.',
  'contact.channels': 'Other channels',

  'footer.tagline': 'Systems Analyst · .NET Developer',
  'footer.nav': 'Navigation',
  'footer.channels': 'Channels',
  'footer.built': 'Designed and built by Lucas Gallardo',
  'footer.stack': 'Astro · Tailwind CSS',
  'footer.rights': 'All rights reserved',
  'footer.location': 'Agronomía, Buenos Aires',

  'notfound.title': 'Page not found',
  'notfound.lead': 'The address you requested does not exist or has moved.',
  'notfound.home': 'Go home',
  'notfound.lang': 'Esta página está disponible en español.',
};

export const ui = { es, en };
