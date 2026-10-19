import type { Lang } from '../i18n/ui';

export type CaseLayer = { name: string; tag: string; detail: string };
export type CaseDecision = { title: string; text: string };
export type CaseProcess = { title: string; text: string };
export type CaseRole = { name: string; text: string };

export type CaseContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  lead: string;
  meta: Array<{ label: string; value: string }>;
  context: { title: string; note: string; body: string[] };
  scope: {
    title: string;
    note: string;
    processesLabel: string;
    processes: CaseProcess[];
    rolesLabel: string;
    roles: CaseRole[];
  };
  architecture: { title: string; note: string; layers: CaseLayer[]; closing: string };
  decisions: { title: string; note: string; items: CaseDecision[] };
  result: { title: string; note: string; items: string[]; closing: string };
};

export type CaseStudy = {
  slug: string;
  repo?: string;
  content: Record<Lang, CaseContent>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'book-go',
    repo: 'https://github.com/Galla1980/Book-Go',
    content: {
      es: {
        eyebrow: 'Caso de estudio · 2025',
        title: 'Book&Go',
        subtitle: 'Sistema de préstamo de libros',
        lead: 'Aplicación de escritorio para gestionar préstamos, devoluciones, sanciones y reposición de stock en una biblioteca física. La desarrollé de punta a punta como trabajo final de la carrera de Analista en Sistemas.',
        meta: [
          { label: 'Rol', value: 'Desarrollo completo: análisis, diseño, implementación y documentación' },
          { label: 'Alcance', value: '2 procesos de negocio · 5 roles de usuario' },
          { label: 'Interfaz', value: 'WinForms sobre .NET Framework 4.8.1, con cambio de idioma sin reiniciar' },
          { label: 'Base de datos', value: 'SQL Server 2022, con dígito verificador, bitácora y backup' },
        ],
        context: {
          title: 'Contexto',
          note: 'Qué es y de dónde salió.',
          body: [
            'Book&Go digitaliza la operación diaria de una biblioteca física: quién se lleva cada ejemplar, cuándo lo devuelve, qué pasa si vuelve tarde o dañado y cómo se repone el stock cuando un título escasea.',
            'Nació como trabajo final de tercer año de la carrera de Analista en Sistemas, con un alcance cerrado: dos procesos completos con sus casos borde, en lugar de un catálogo de pantallas a medio terminar.',
            'Es una aplicación de escritorio en C# con WinForms sobre .NET Framework 4.8.1, con la base de datos en SQL Server 2022. Incluye el modelo de datos, la arquitectura por capas, la documentación técnica y los manuales de uso.',
          ],
        },
        scope: {
          title: 'Alcance',
          note: 'Los dos procesos que cubre el sistema y los roles que los ejecutan.',
          processesLabel: 'Procesos',
          processes: [
            {
              title: 'Préstamos y devoluciones',
              text: 'Alta de clientes, consulta de disponibilidad, cobro de seña en efectivo o tarjeta, registro de la devolución con el estado del ejemplar y aplicación de sanciones por atraso o daño.',
            },
            {
              title: 'Stock y reposición',
              text: 'Stock por estado (disponible, prestado, dañado, desaparecido), generación automática de la orden de compra al tocar el mínimo, registro de proveedores y alta de ejemplares al recibir el pedido.',
            },
          ],
          rolesLabel: 'Roles',
          roles: [
            { name: 'Bibliotecario', text: 'Préstamos, devoluciones, sanciones y alta de clientes.' },
            { name: 'Encargado de reposición', text: 'Consulta de stock, órdenes de compra y alta de ejemplares.' },
            { name: 'Repositor', text: 'Verificación de facturas y órdenes, y registro de la recepción.' },
            { name: 'Administrador', text: 'Usuarios, perfiles, familias y permisos.' },
            { name: 'Usuario final', text: 'Inicio de sesión y cambio de contraseña.' },
          ],
        },
        architecture: {
          title: 'Arquitectura',
          note: 'Cinco proyectos en la solución, uno por responsabilidad.',
          layers: [
            { name: 'Presentación', tag: 'GUI', detail: 'Formularios WinForms agrupados por proceso: préstamos, reposición, maestros, reportes y administración.' },
            { name: 'Negocio', tag: 'BLL', detail: 'Reglas de préstamo, sanción, reposición, dígito verificador y bitácora.' },
            { name: 'Entidades', tag: 'BE', detail: 'Objetos que viajan entre capas sin conocer la base de datos.' },
            { name: 'Datos', tag: 'DAL', detail: 'Acceso a SQL Server con Microsoft.Data.SqlClient sobre una clase base común.' },
            { name: 'Servicios', tag: 'Services', detail: 'Lo transversal: patrones de diseño, sesión, idioma, encriptación y eventos.' },
          ],
          closing: 'Los servicios transversales viven en su propio proyecto a propósito: ni la lógica de negocio ni el acceso a datos dependen de ellos, y la interfaz nunca ejecuta SQL. Las entidades viajan entre capas sin saber de dónde salen los datos.',
        },
        decisions: {
          title: 'Decisiones',
          note: 'Las cinco que definieron el sistema.',
          items: [
            {
              title: 'Permisos como árbol, no como lista',
              text: 'Perfiles, familias y permisos se modelan con el patrón Composite: un perfil contiene familias y cada familia contiene permisos. La autorización se resuelve recorriendo el árbol en lugar de mantener condiciones fijas por pantalla.',
            },
            {
              title: 'Una sola sesión, accesible desde cualquier capa',
              text: 'El usuario logueado vive en un Singleton con inicialización diferida y bloqueo, así que cualquier formulario consulta la sesión sin recibirla como parámetro. El resultado del login se modela con LoginResult y LoginException, no con códigos sueltos.',
            },
            {
              title: 'Cambio de idioma sin reiniciar',
              text: 'El patrón Observer conecta los formularios con un LanguageManager: al cambiar de idioma, el manager notifica a cada formulario suscripto y este vuelve a leer sus textos desde archivos JSON. La aplicación quedó en español e inglés, incluida la ayuda en línea.',
            },
            {
              title: 'La cadena de conexión no vive en el código',
              text: 'La clase base de la capa de datos lee la cadena de conexión de un archivo JSON externo y falla con un mensaje explícito si falta o está incompleta. El build no arrastra credenciales.',
            },
            {
              title: 'Detección de alteraciones en la base',
              text: 'Cada registro sensible guarda dígitos verificadores horizontal y vertical, calculados al persistir. Un formulario dedicado recalcula y repara la tabla cuando el control detecta una diferencia.',
            },
          ],
        },
        result: {
          title: 'Resultado',
          note: 'Qué quedó entregado y funcionando.',
          items: [
            'Los dos procesos completos sobre SQL Server 2022: préstamos con seña, devoluciones con estado del ejemplar, sanciones, stock por estado y órdenes de compra automáticas.',
            'Control de acceso por rol con perfiles, familias y permisos, y contraseñas guardadas con SHA-256.',
            'Bitácora de eventos y backup y restore de la base desde la propia aplicación.',
            'Documentación de entrega: diagramas UML en Enterprise Architect, manual de instalación y ayuda en línea por pantalla, en español e inglés.',
            'Repositorio público con el código de las cinco capas.',
          ],
          closing: 'El proyecto completo, con su código, sus diagramas y sus manuales, está en el repositorio.',
        },
      },
      en: {
        eyebrow: 'Case study · 2025',
        title: 'Book&Go',
        subtitle: 'Library lending system',
        lead: 'Desktop application to manage loans, returns, penalties and stock replenishment in a physical library. I built it end to end as the final project of my Systems Analyst degree.',
        meta: [
          { label: 'Role', value: 'End-to-end development: analysis, design, implementation and documentation' },
          { label: 'Scope', value: '2 business processes · 5 user roles' },
          { label: 'Interface', value: 'WinForms on .NET Framework 4.8.1, with language switching without restarting' },
          { label: 'Database', value: 'SQL Server 2022, with check digits, event log and backup' },
        ],
        context: {
          title: 'Context',
          note: 'What it is and where it came from.',
          body: [
            'Book&Go digitises the daily operation of a physical library: who takes each copy, when it comes back, what happens if it is late or damaged, and how stock is replenished when a title runs low.',
            'It began as the final project of the third year of my Systems Analyst degree, with a closed scope: two complete processes including their edge cases, instead of a catalogue of half-finished screens.',
            'It is a desktop application in C# with WinForms on .NET Framework 4.8.1, backed by SQL Server 2022. It includes the data model, the layered architecture, the technical documentation and the user manuals.',
          ],
        },
        scope: {
          title: 'Scope',
          note: 'The two processes the system covers and the roles that run them.',
          processesLabel: 'Processes',
          processes: [
            {
              title: 'Loans and returns',
              text: 'Customer registration, availability checks, deposit collection in cash or by card, return registration with the state of the copy, and penalties for late or damaged returns.',
            },
            {
              title: 'Stock and replenishment',
              text: 'Stock by state (available, on loan, damaged, missing), automatic purchase orders when stock hits the minimum, supplier records and registering new copies on delivery.',
            },
          ],
          rolesLabel: 'Roles',
          roles: [
            { name: 'Librarian', text: 'Loans, returns, penalties and customer registration.' },
            { name: 'Replenishment manager', text: 'Stock queries, purchase orders and registering new copies.' },
            { name: 'Stock clerk', text: 'Checking invoices and orders, and registering incoming deliveries.' },
            { name: 'Administrator', text: 'Users, profiles, families and permissions.' },
            { name: 'End user', text: 'Sign in and change password.' },
          ],
        },
        architecture: {
          title: 'Architecture',
          note: 'Five projects in the solution, one responsibility each.',
          layers: [
            { name: 'Presentation', tag: 'GUI', detail: 'WinForms forms grouped by process: loans, replenishment, master data, reports and administration.' },
            { name: 'Business', tag: 'BLL', detail: 'Loan, penalty, replenishment, check-digit and event-log rules.' },
            { name: 'Entities', tag: 'BE', detail: 'Objects that travel between layers and know nothing about the database.' },
            { name: 'Data', tag: 'DAL', detail: 'SQL Server access through Microsoft.Data.SqlClient over a shared base class.' },
            { name: 'Services', tag: 'Services', detail: 'Cross-cutting: design patterns, session, language, encryption and events.' },
          ],
          closing: 'The cross-cutting services live in their own project on purpose: neither business logic nor data access depend on them, and the interface never runs SQL. Entities travel between layers without knowing where the data comes from.',
        },
        decisions: {
          title: 'Decisions',
          note: 'The five that shaped the system.',
          items: [
            {
              title: 'Permissions as a tree, not a list',
              text: 'Profiles, families and permissions are modelled with the Composite pattern: a profile holds families and each family holds permissions. Authorisation walks the tree instead of keeping hard-coded conditions per screen.',
            },
            {
              title: 'A single session, reachable from any layer',
              text: 'The logged-in user lives in a thread-safe lazy Singleton, so any form can query the session without receiving it as a parameter. The login result is modelled with LoginResult and LoginException rather than loose codes.',
            },
            {
              title: 'Language switching without restarting',
              text: 'The Observer pattern connects the forms to a LanguageManager: when the language changes, the manager notifies every subscribed form and each one reloads its texts from JSON files. The application runs in Spanish and English, online help included.',
            },
            {
              title: 'The connection string is not in the code',
              text: 'The data layer base class reads the connection string from an external JSON file and fails with an explicit message when it is missing or incomplete. No credentials travel inside the build.',
            },
            {
              title: 'Detecting changes in the database',
              text: 'Every sensitive record stores horizontal and vertical check digits, computed on save. A dedicated form recalculates and repairs the table when the control finds a mismatch.',
            },
          ],
        },
        result: {
          title: 'Outcome',
          note: 'What was delivered and working.',
          items: [
            'Both processes complete on SQL Server 2022: loans with deposit, returns with the state of the copy, penalties, stock by state and automatic purchase orders.',
            'Role-based access control with profiles, families and permissions, and passwords stored with SHA-256.',
            'Event log, plus database backup and restore from inside the application.',
            'Delivery documentation: UML diagrams in Enterprise Architect, an installation manual and per-screen online help, in Spanish and English.',
            'Public repository with the code of all five layers.',
          ],
          closing: 'The whole project, with its code, diagrams and manuals, is in the repository.',
        },
      },
    },
  },
];

export function hasCaseStudy(slug: string) {
  return caseStudies.some((study) => study.slug === slug);
}

export function caseStudyPaths(lang: Lang) {
  return caseStudies.map((study) => ({
    params: { lang, slug: study.slug },
    props: { study, lang },
  }));
}
