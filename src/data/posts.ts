import type { Lang } from '../i18n/ui';

type PlannedPost = {
  slug: string;
  tag: string;
  readingTime: number;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
};

export const plannedPosts: PlannedPost[] = [
  {
    slug: 'arquitectura-multicapa-winforms',
    tag: 'Arquitectura',
    readingTime: 7,
    title: {
      es: 'Arquitectura multicapa en WinForms: GUI, BLL y DAL sin acoplarse',
      en: 'Layered architecture in WinForms: decoupling GUI, BLL and DAL',
    },
    description: {
      es: 'Cómo separé interfaz, lógica de negocio y acceso a datos en un sistema de biblioteca, y qué gané con eso al momento de testear y escalar.',
      en: 'How I separated UI, business logic and data access in a library system, and what that bought me when testing and scaling.',
    },
  },
  {
    slug: 'optimizar-busquedas-sql-server',
    tag: 'SQL Server',
    readingTime: 6,
    title: {
      es: 'Cómo diagnostico y optimizo búsquedas lentas en SQL Server',
      en: 'How I diagnose and optimize slow SQL Server queries',
    },
    description: {
      es: 'Procedimientos almacenados, índices y planes de ejecución: el proceso concreto que sigo para bajar los tiempos de respuesta.',
      en: 'Stored procedures, indexes and execution plans: the concrete process I follow to cut response times.',
    },
  },
  {
    slug: 'patrones-diseno-caso-real',
    tag: 'Patrones de diseño',
    readingTime: 8,
    title: {
      es: 'Singleton, Observer y Composite en un caso real',
      en: 'Singleton, Observer and Composite in a real project',
    },
    description: {
      es: 'Qué problema resolvía cada patrón en la práctica, cómo los implementé y cuándo conviene no usarlos.',
      en: 'Which problem each pattern solved in practice, how I implemented them and when not to use them.',
    },
  },
];
