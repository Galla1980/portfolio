import type { Lang } from '../i18n/ui';

export type Project = {
  slug: string;
  year: string;
  title: Record<Lang, string>;
  context: Record<Lang, string>;
  summary: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  stack: string[];
  repo?: string;
  image?: { src: string; alt: Record<Lang, string> };
};

export const projects: Project[] = [
  {
    slug: 'vitalpet',
    year: '2026',
    title: {
      es: 'VitalPet — plataforma de gestión veterinaria',
      en: 'VitalPet — veterinary clinic management platform',
    },
    context: {
      es: 'Desarrollador .NET · Proyecto académico grupal',
      en: '.NET Developer · Academic team project',
    },
    summary: {
      es: 'Plataforma web en ASP.NET y C# con arquitectura de cinco capas (GUI, BE, BLL, DAL y Servicios) para la gestión integral de una veterinaria: clientes, mascotas, historial clínico, turnos, inventario y ventas.',
      en: 'Web platform in ASP.NET and C# on a five-layer architecture (GUI, BE, BLL, DAL and Services) for the end-to-end management of a veterinary clinic: clients, pets, clinical history, appointments, inventory and sales.',
    },
    highlights: {
      es: [
        'Cinco capas separadas: GUI, BE, BLL, DAL y Servicios',
        'Control de acceso por patente, familia y perfil con los filtros nativos de ASP.NET',
        'Módulo de mascotas y dígitos verificadores que detectan alteraciones en la base',
        'Hash SHA-256 y cifrado AES sobre credenciales y datos sensibles',
      ],
      en: [
        'Five separate layers: GUI, BE, BLL, DAL and Services',
        'Access control by patente, familia and perfil with ASP.NET native filters',
        'Pets module and check digits that detect tampering in the database',
        'SHA-256 hashing and AES encryption for credentials and sensitive data',
      ],
    },
    stack: ['ASP.NET', 'C#', 'SQL Server', 'ADO.NET', '.NET Framework', 'Git'],
  },
  {
    slug: 'book-go',
    year: '2025',
    title: {
      es: 'Book&Go — sistema de gestión de biblioteca',
      en: 'Book&Go — library management system',
    },
    context: {
      es: 'Desarrollador .NET · Proyecto académico',
      en: '.NET Developer · Academic project',
    },
    summary: {
      es: 'Aplicación de escritorio en C# WinForms bajo arquitectura multicapa GUI-BLL-DAL, con patrones Singleton, Observer y Composite para automatizar la gestión de una biblioteca.',
      en: 'Desktop application in C# WinForms built on a GUI-BLL-DAL layered architecture, using Singleton, Observer and Composite patterns to automate library management.',
    },
    highlights: {
      es: [
        'Arquitectura multicapa GUI-BLL-DAL',
        'Singleton, Observer y Composite aplicados con criterio',
        'Ciclo completo: análisis, diseño, implementación y pruebas',
        'Persistencia optimizada con procedimientos almacenados e índices',
      ],
      en: [
        'GUI-BLL-DAL layered architecture',
        'Singleton, Observer and Composite applied with judgement',
        'Full cycle: analysis, design, implementation and testing',
        'Persistence optimized with stored procedures and indexes',
      ],
    },
    stack: ['C#', '.NET Framework 4.8.1', 'WinForms', 'SQL Server', 'UML'],
    repo: 'https://github.com/Galla1980/Book-Go',
    image: {
      src: '/img/book-go.png',
      alt: {
        es: 'Pantalla de inicio de Book&Go, el sistema de gestión de biblioteca desarrollado en C# WinForms',
        en: 'Book&Go start screen, the library management system built in C# WinForms',
      },
    },
  },
  {
    slug: 'escaneo-productos',
    year: '2022',
    title: {
      es: 'App móvil de escaneo de productos',
      en: 'Mobile product scanning app',
    },
    context: {
      es: 'Desarrollador Mobile & Backend · Proyecto grupal',
      en: 'Mobile & Backend Developer · Team project',
    },
    summary: {
      es: 'Aplicación en React Native para escanear productos envasados, con API y base de datos propias para sincronizar un catálogo de más de 1.000 productos en tiempo real.',
      en: 'React Native application to scan packaged products, with its own API and database layer syncing a catalogue of over 1,000 products in real time.',
    },
    highlights: {
      es: [
        'API y capa de acceso a datos propias',
        'Catálogo de más de 1.000 productos',
        'Sincronización y renderizado en tiempo real',
        'Diagramas de arquitectura y documentación técnica',
      ],
      en: [
        'Own API and data access layer',
        'Catalogue of more than 1,000 products',
        'Real-time synchronization and rendering',
        'Architecture diagrams and technical documentation',
      ],
    },
    stack: ['React Native', 'API REST', 'SQL', 'Git', 'Agile'],
  },
];
