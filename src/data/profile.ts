import type { Lang } from '../i18n/ui';

type Copy = {
  role: string;
  availability: string;
  h1a: string;
  h1b: string;
  lead: string;
  architecture: { title: string; note: string; layers: Array<{ name: string; detail: string }> };
  profile: { title: string; body: string[]; specs: Array<{ label: string; value: string }> };
  stackTitle: string;
  stack: Array<{ label: string; items: string[] }>;
  method: { title: string; note: string; steps: Array<{ title: string; text: string }> };
  evidence: { title: string; note: string };
  track: {
    title: string;
    note: string;
    education: Array<{ period: string; title: string; place: string }>;
    certificates: Array<{ period: string; title: string; place: string }>;
    languages: Array<{ label: string; value: string }>;
  };
  contact: { title: string; note: string; lead: string };
};

export const copy: Record<Lang, Copy> = {
  es: {
    role: 'Analista de Sistemas · Desarrollador .NET',
    availability: 'Disponible para incorporarme a un equipo',
    h1a: 'Desarrollador .NET',
    h1b: 'con mirada de analista.',
    lead: 'Analista de Sistemas e Ingeniero en Sistemas en formación. Construyo aplicaciones en C# y .NET con arquitectura multicapa, patrones de diseño y persistencia optimizada en SQL Server.',
    architecture: {
      title: 'Arquitectura que aplico',
      note: 'Así estructuré el gestor de biblioteca en .NET Framework: capas separadas, cada una con una responsabilidad.',
      layers: [
        { name: 'Presentación', detail: 'WinForms · validación · estados de UI' },
        { name: 'Lógica de negocio', detail: 'reglas · Singleton · Observer · Composite' },
        { name: 'Acceso a datos', detail: 'ADO.NET · procedimientos almacenados · índices' },
      ],
    },
    profile: {
      title: 'Perfil',
      body: [
        'Me formé como Analista de Sistemas y sigo Ingeniería en Sistemas. Eso me dejó un sesgo que me sirve: antes de programar, entiendo el problema. Modelo el sistema, defino la arquitectura por capas y recién ahí escribo código.',
        'Trabajo cómodo en C# y .NET, con SQL Server como base de datos principal. También construí una app móvil en React Native con su API y, en equipo, una plataforma de gestión veterinaria en ASP.NET donde me ocupé del módulo de mascotas y de los dígitos verificadores.',
      ],
      specs: [
        { label: 'Ubicación', value: 'Agronomía, Buenos Aires' },
        { label: 'Formación', value: 'Analista de Sistemas · Ingeniería en curso' },
        { label: 'Promedio', value: '8,9 / 10' },
        { label: 'Inglés', value: 'Intermedio alto (B2)' },
        { label: 'Certificaciones', value: 'Google Cloud · Huawei ICT Academy' },
      ],
    },
    stackTitle: 'Tecnologías',
    stack: [
      { label: 'Lenguajes', items: ['C#', 'SQL (T-SQL)', 'Python', 'Java', 'C'] },
      {
        label: 'Frameworks',
        items: ['.NET Framework', 'WinForms', 'ASP.NET', 'ADO.NET', 'Entity Framework', 'React Native'],
      },
      { label: 'Datos', items: ['SQL Server', 'Stored Procedures', 'Triggers', 'Optimización de consultas'] },
      { label: 'Cloud', items: ['Google Cloud Platform', 'Compute Engine', 'VPC', 'Load Balancing'] },
      { label: 'Herramientas', items: ['Git', 'GitHub', 'Visual Studio'] },
      { label: 'Métodos', items: ['Agile', 'UML', 'SOLID', 'Arquitectura multicapa', 'Patrones de diseño'] },
    ],
    method: {
      title: 'Método',
      note: 'Cuatro pasos que aplico siempre, en ese orden.',
      steps: [
        {
          title: 'Relevar',
          text: 'Hablo con quien va a usar el sistema antes de proponer soluciones. En el sitio escolar entrevisté a personal académico y directivo para definir las secciones reales.',
        },
        {
          title: 'Modelar',
          text: 'Casos de uso, diagramas de secuencia y arquitectura por capas antes de la primera línea de código. Decidir acá es gratis; decidir después cuesta refactor.',
        },
        {
          title: 'Construir',
          text: 'C# y .NET con patrones donde aportan valor concreto, no por catálogo. Priorizo que el próximo que lea el código entienda la intención.',
        },
        {
          title: 'Medir',
          text: 'Mido antes y después de cada cambio en consultas, índices y procedimientos almacenados. Una optimización sin medición es solo una suposición.',
        },
      ],
    },
    evidence: {
      title: 'Evidencia',
      note: 'Tres sistemas construidos de punta a punta, cada uno con su stack y sus decisiones técnicas.',
    },
    track: {
      title: 'Trayectoria',
      note: 'Formación, certificaciones e idiomas.',
      education: [
        { period: '2023 — 2027', title: 'Ingeniería en Sistemas Informáticos', place: 'Universidad Abierta Interamericana' },
        { period: '2023 — 2025', title: 'Analista de Sistemas Informáticos · Promedio 8,9', place: 'Universidad Abierta Interamericana' },
        { period: '2017 — 2022', title: 'Técnico en Computación', place: 'Escuela Técnica N°36 D.E. 15 "Almirante Guillermo Brown"' },
      ],
      certificates: [
        { period: '2025', title: 'Data Communication and Network Technology', place: 'Huawei ICT Academy' },
        { period: '2023', title: 'Google Cloud Computing Foundations', place: 'Google Academy' },
      ],
      languages: [
        { label: 'Español', value: 'Nativo' },
        { label: 'Inglés', value: 'Intermedio alto (B2)' },
      ],
    },
    contact: {
      title: 'Hablemos',
      note: 'Contacto',
      lead: 'Estoy buscando mi primera posición como desarrollador .NET. Si tu equipo necesita a alguien que entienda el problema antes de escribir la primera línea, escribime.',
    },
  },
  en: {
    role: 'Systems Analyst · .NET Developer',
    availability: 'Open to joining a development team',
    h1a: '.NET Developer',
    h1b: 'with an analyst mindset.',
    lead: 'Systems Analyst and Systems Engineering student. I build C# and .NET applications with layered architecture, design patterns and optimized SQL Server persistence.',
    architecture: {
      title: 'The architecture I apply',
      note: 'This is how I structured the library manager in .NET Framework: separate layers, each with a single responsibility.',
      layers: [
        { name: 'Presentation', detail: 'WinForms · validation · UI state' },
        { name: 'Business logic', detail: 'rules · Singleton · Observer · Composite' },
        { name: 'Data access', detail: 'ADO.NET · stored procedures · indexes' },
      ],
    },
    profile: {
      title: 'Profile',
      body: [
        'I trained as a Systems Analyst and I am still studying Systems Engineering. That left me with a bias I find useful: before writing code, I understand the problem. I model the system, define the layered architecture and only then start implementing.',
        'I work comfortably in C# and .NET, with SQL Server as my main database. I have also built a React Native mobile app with its own API and, as part of a team, a veterinary management platform in ASP.NET where I owned the pets module and the check digits.',
      ],
      specs: [
        { label: 'Location', value: 'Agronomía, Buenos Aires' },
        { label: 'Education', value: 'Systems Analyst · Engineering in progress' },
        { label: 'GPA', value: '8.9 / 10' },
        { label: 'English', value: 'Upper intermediate (B2)' },
        { label: 'Certifications', value: 'Google Cloud · Huawei ICT Academy' },
      ],
    },
    stackTitle: 'Technologies',
    stack: [
      { label: 'Languages', items: ['C#', 'SQL (T-SQL)', 'Python', 'Java', 'C'] },
      {
        label: 'Frameworks',
        items: ['.NET Framework', 'WinForms', 'ASP.NET', 'ADO.NET', 'Entity Framework', 'React Native'],
      },
      { label: 'Data', items: ['SQL Server', 'Stored procedures', 'Triggers', 'Query optimization'] },
      { label: 'Cloud', items: ['Google Cloud Platform', 'Compute Engine', 'VPC', 'Load Balancing'] },
      { label: 'Tools', items: ['Git', 'GitHub', 'Visual Studio'] },
      { label: 'Methods', items: ['Agile', 'UML', 'SOLID', 'Layered architecture', 'Design patterns'] },
    ],
    method: {
      title: 'Method',
      note: 'Four steps I always follow, in this order.',
      steps: [
        {
          title: 'Gather',
          text: 'I talk to the people who will use the system before proposing solutions. At the school site I interviewed academic and management staff to define the real sections.',
        },
        {
          title: 'Model',
          text: 'Use cases, sequence diagrams and layered architecture before the first line of code. Deciding here is free; deciding later costs a refactor.',
        },
        {
          title: 'Build',
          text: 'C# and .NET with patterns where they add concrete value, not for the sake of it. I prioritize that the next person reading the code understands the intent.',
        },
        {
          title: 'Measure',
          text: 'I measure before and after every change to queries, indexes and stored procedures. An optimization without measurement is just a guess.',
        },
      ],
    },
    evidence: {
      title: 'Evidence',
      note: 'Three systems built end to end, each with its own stack and technical decisions.',
    },
    track: {
      title: 'Background',
      note: 'Education, certifications and languages.',
      education: [
        { period: '2023 — 2027', title: 'Systems Engineering', place: 'Universidad Abierta Interamericana' },
        { period: '2023 — 2025', title: 'Systems Analyst · GPA 8.9', place: 'Universidad Abierta Interamericana' },
        { period: '2017 — 2022', title: 'Computer Technician', place: 'Technical School No. 36 "Almirante Guillermo Brown"' },
      ],
      certificates: [
        { period: '2025', title: 'Data Communication and Network Technology', place: 'Huawei ICT Academy' },
        { period: '2023', title: 'Google Cloud Computing Foundations', place: 'Google Academy' },
      ],
      languages: [
        { label: 'Spanish', value: 'Native' },
        { label: 'English', value: 'Upper intermediate (B2)' },
      ],
    },
    contact: {
      title: "Let's talk",
      note: 'Contact',
      lead: 'I am looking for my first role as a .NET developer. If your team needs someone who understands the problem before writing the first line, get in touch.',
    },
  },
};
