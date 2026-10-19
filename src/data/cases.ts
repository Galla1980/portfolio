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
    slug: 'vitalpet',
    content: {
      es: {
        eyebrow: 'Caso de estudio · 2026',
        title: 'VitalPet',
        subtitle: 'Plataforma de gestión veterinaria',
        lead: 'Plataforma web para centralizar la operación de una veterinaria: clientes, mascotas, historia clínica, turnos, inventario y ventas. Proyecto académico en equipo de tres, con arquitectura de cinco capas y el acceso resuelto en el servidor.',
        meta: [
          { label: 'Rol', value: 'Desarrollo .NET en equipo de tres: capas, seguridad, auditoría y dígitos verificadores' },
          { label: 'Alcance', value: '5 capas · 3 roles · 9 pantallas implementadas' },
          { label: 'Interfaz', value: 'ASP.NET Web Forms sobre .NET Framework 4.8.1' },
          { label: 'Base de datos', value: 'SQL Server con ADO.NET conectado y desconectado, bitácora y backup' },
        ],
        context: {
          title: 'Contexto',
          note: 'Qué es y de dónde salió.',
          body: [
            'VitalPet concentra en un solo sistema lo que en la veterinaria vivía repartido entre planillas y registros manuales: el alta de clientes y mascotas, la historia clínica, la agenda de turnos, el stock de medicamentos y productos, y la facturación de las ventas.',
            'Fue el trabajo final de la materia Desarrollo y Arquitecturas Web, en un equipo de tres. El diseño cubrió la plataforma completa —pantallas, modelo de datos, casos de uso, un modelo de permisos por patente, familia y perfil, y las políticas de seguridad—; la entrega implementada se concentró en el núcleo de acceso y administración: autenticación, usuarios, mascotas, auditoría, backup y control de integridad.',
            'Se construyó con ASP.NET Web Forms sobre .NET Framework 4.8.1, C#, ADO.NET y SQL Server, y se versionó con Git bajo el modelo Git Flow.',
          ],
        },
        scope: {
          title: 'Alcance',
          note: 'Los procesos que cubre el sistema y los roles que los ejecutan.',
          processesLabel: 'Procesos',
          processes: [
            {
              title: 'Acceso y administración de usuarios',
              text: 'Registro con validación de DNI y contraseña fuerte, bloqueo de la cuenta a los tres intentos fallidos, alta y edición de usuarios por rol, y cambio de contraseña.',
            },
            {
              title: 'Gestión de mascotas',
              text: 'Alta de mascotas con especie, raza y fecha de nacimiento, asociadas al cliente que las registra.',
            },
            {
              title: 'Integridad de los datos',
              text: 'Dígitos verificadores horizontales por registro y verticales por tabla. Si la verificación falla, el sistema entra en modo mantenimiento hasta que se repare.',
            },
            {
              title: 'Auditoría y continuidad',
              text: 'Bitácora de eventos con módulo, evento y criticidad; backup y restore de la base desde la propia aplicación; verificación y reparación de los dígitos.',
            },
          ],
          rolesLabel: 'Roles',
          roles: [
            { name: 'Cliente', text: 'Registra sus mascotas y cambia su contraseña.' },
            { name: 'Administrador', text: 'Gestiona usuarios y consulta la bitácora de eventos.' },
            { name: 'Web Master', text: 'Ejecuta backup y restore, y administra los dígitos verificadores.' },
          ],
        },
        architecture: {
          title: 'Arquitectura',
          note: 'Cinco capas, una responsabilidad cada una.',
          layers: [
            { name: 'Interfaz', tag: 'GUI', detail: 'Páginas ASP.NET Web Forms sobre un Master Page común. Capturan datos, muestran resultados y navegan; nunca ejecutan SQL.' },
            { name: 'Entidades', tag: 'BE', detail: 'Objetos del negocio (usuario, mascota, evento) que viajan entre capas y se construyen desde un DataRow.' },
            { name: 'Negocio', tag: 'BLL', detail: 'Validaciones, reglas de acceso, bloqueo por intentos, dígitos verificadores y registro de eventos.' },
            { name: 'Datos', tag: 'DAL', detail: 'ADO.NET contra SQL Server, con una clase base que toma la cadena de conexión de Web.config.' },
            { name: 'Servicios', tag: 'Servicios', detail: 'Lo transversal: sesión, hash y encriptación, y utilidades compartidas.' },
          ],
          closing: 'La interfaz no conoce SQL y la capa de datos no conoce reglas de negocio: cada capa recibe y devuelve entidades. Esa separación permitió escribir la seguridad una sola vez —en el login, el ticket y Web.config— y aplicarla en todas las pantallas.',
        },
        decisions: {
          title: 'Decisiones',
          note: 'Las cinco que definieron el sistema.',
          items: [
            {
              title: 'Un rol en el ticket, la autorización en Web.config',
              text: 'El login valida el hash, bloquea la cuenta a los tres intentos y, ya dentro, el sistema emite un ticket de Forms Authentication con el rol del usuario. En cada petición, Global.asax reconstruye el principal con ese rol y Web.config decide qué páginas lo admiten. Forzar la URL devuelve acceso denegado antes de que la página se cargue.',
            },
            {
              title: 'Dos cifrados para dos problemas distintos',
              text: 'Las contraseñas se guardan con SHA-256, un hash irreversible. Los datos personales —nombre, apellido, usuario y mail— se cifran con AES reversible, porque la aplicación necesita mostrarlos. La capa de datos descifra al leer y cifra al escribir, así que el resto del sistema trabaja con texto plano.',
            },
            {
              title: 'Dígitos verificadores en dos direcciones',
              text: 'Cada fila guarda un dígito horizontal calculado a partir de sus campos; cada tabla guarda uno vertical en una tabla de control. Si un registro se altera por fuera de la aplicación, el recálculo lo detecta, identifica la tabla y el sistema queda en mantenimiento hasta que un Web Master lo repare desde DV_Form.',
            },
            {
              title: 'Conectado o desconectado, según la operación',
              text: 'Las lecturas cortas y las validaciones usan SqlCommand y lectores con la conexión abierta; los listados y los ABM usan SqlDataAdapter y DataTable para trabajar en memoria y liberar la conexión temprano. La misma capa de datos combina los dos modelos de ADO.NET.',
            },
            {
              title: 'La auditoría como parte del flujo',
              text: 'Iniciar sesión o registrar un usuario deja un evento con módulo, fecha, usuario y criticidad. La bitácora se consulta desde la aplicación, con filtros por usuario, fecha, módulo, evento y criticidad.',
            },
          ],
        },
        result: {
          title: 'Resultado',
          note: 'Qué quedó entregado y funcionando.',
          items: [
            'Autenticación con hash SHA-256, bloqueo a los tres intentos y contraseñas validadas por longitud, mayúsculas, números y símbolos.',
            'Autorización por rol a nivel de página con Forms Authentication, Global.asax y Web.config.',
            'Alta de mascotas y administración de usuarios, con los datos personales cifrados en AES.',
            'Dígitos verificadores horizontales y verticales, con pantalla de verificación y reparación para el Web Master.',
            'Bitácora de eventos y backup y restore de la base desde la propia aplicación.',
          ],
          closing: 'La entrega reúne las cinco capas y las nueve pantallas del sistema. Lo que haría distinto hoy: mover la clave de cifrado fuera del código y agregar sal al hash de las contraseñas.',
        },
      },
      en: {
        eyebrow: 'Case study · 2026',
        title: 'VitalPet',
        subtitle: 'Veterinary clinic management platform',
        lead: 'Web platform to centralise a veterinary clinic operation: clients, pets, clinical history, appointments, inventory and sales. A three-person academic project with a five-layer architecture and access control enforced on the server.',
        meta: [
          { label: 'Role', value: '.NET development in a three-person team: layers, security, auditing and check digits' },
          { label: 'Scope', value: '5 layers · 3 roles · 9 implemented screens' },
          { label: 'Interface', value: 'ASP.NET Web Forms on .NET Framework 4.8.1' },
          { label: 'Database', value: 'SQL Server with connected and disconnected ADO.NET, event log and backup' },
        ],
        context: {
          title: 'Context',
          note: 'What it is and where it came from.',
          body: [
            'VitalPet brings into one system what used to live across spreadsheets and paper records: client and pet registration, clinical history, the appointment schedule, stock of medicines and products, and sales invoicing.',
            'It was the final project for the Web Development and Architectures course, in a team of three. The design covered the whole platform —screens, data model, use cases, a permission model based on patente, familia and perfil, and the security policies—; the delivered build focused on the access and administration core: authentication, users, pets, auditing, backup and integrity control.',
            'It was built with ASP.NET Web Forms on .NET Framework 4.8.1, C#, ADO.NET and SQL Server, and versioned with Git following Git Flow.',
          ],
        },
        scope: {
          title: 'Scope',
          note: 'The processes the system covers and the roles that run them.',
          processesLabel: 'Processes',
          processes: [
            {
              title: 'Access and user management',
              text: 'Registration with DNI validation and strong-password rules, account lockout after three failed attempts, user creation and editing by role, and password change.',
            },
            {
              title: 'Pet management',
              text: 'Pet registration with species, breed and date of birth, linked to the client who registers it.',
            },
            {
              title: 'Data integrity',
              text: 'Horizontal check digits per record and vertical ones per table. If verification fails, the system enters maintenance mode until it is repaired.',
            },
            {
              title: 'Auditing and continuity',
              text: 'Event log with module, event and criticality; database backup and restore from inside the application; check-digit verification and repair.',
            },
          ],
          rolesLabel: 'Roles',
          roles: [
            { name: 'Client', text: 'Registers their pets and changes their password.' },
            { name: 'Administrator', text: 'Manages users and reads the event log.' },
            { name: 'Web Master', text: 'Runs backup and restore, and manages the check digits.' },
          ],
        },
        architecture: {
          title: 'Architecture',
          note: 'Five layers, one responsibility each.',
          layers: [
            { name: 'Presentation', tag: 'GUI', detail: 'ASP.NET Web Forms pages over a shared Master Page. They capture input, render results and navigate; they never run SQL.' },
            { name: 'Entities', tag: 'BE', detail: 'Business objects (user, pet, event) that travel between layers and are built from a DataRow.' },
            { name: 'Business', tag: 'BLL', detail: 'Validation, access rules, attempt lockout, check digits and event logging.' },
            { name: 'Data', tag: 'DAL', detail: 'ADO.NET against SQL Server, with a base class that reads the connection string from Web.config.' },
            { name: 'Services', tag: 'Services', detail: 'Cross-cutting concerns: session, hashing and encryption, and shared helpers.' },
          ],
          closing: 'The interface knows nothing about SQL and the data layer knows nothing about business rules: each layer takes and returns entities. That separation let us write security once —in the login, the ticket and Web.config— and apply it to every screen.',
        },
        decisions: {
          title: 'Decisions',
          note: 'The five that shaped the system.',
          items: [
            {
              title: 'A role in the ticket, authorisation in Web.config',
              text: 'The login checks the hash, locks the account after three failed attempts and, once inside, the system issues a Forms Authentication ticket carrying the user role. On every request, Global.asax rebuilds the principal with that role and Web.config decides which pages accept it. Forcing a URL returns access denied before the page ever loads.',
            },
            {
              title: 'Two ciphers for two different problems',
              text: 'Passwords are stored with SHA-256, an irreversible hash. Personal data —first name, last name, username and email— is encrypted with reversible AES, because the application needs to display it. The data layer decrypts on read and encrypts on write, so the rest of the system works with plain text.',
            },
            {
              title: 'Check digits in two directions',
              text: 'Every row stores a horizontal check digit computed from its fields; every table stores a vertical one in a control table. If a record is changed outside the application, recomputation detects it, identifies the table and leaves the system in maintenance mode until a Web Master repairs it from DV_Form.',
            },
            {
              title: 'Connected or disconnected, depending on the operation',
              text: 'Short reads and validations use SqlCommand and readers with the connection open; listings and CRUD operations use SqlDataAdapter and DataTable to work in memory and release the connection early. The same data layer combines both ADO.NET models.',
            },
            {
              title: 'Auditing as part of the flow',
              text: 'Signing in or registering a user leaves an event with module, date, user and criticality. The log is queried from the application itself, filtered by user, date, module, event and criticality.',
            },
          ],
        },
        result: {
          title: 'Outcome',
          note: 'What was delivered and working.',
          items: [
            'Authentication with SHA-256 hashing, lockout after three attempts, and passwords validated for length, upper case, numbers and symbols.',
            'Page-level role authorisation with Forms Authentication, Global.asax and Web.config.',
            'Pet registration and user administration, with personal data encrypted in AES.',
            'Horizontal and vertical check digits, with a verification and repair screen for the Web Master.',
            'Event log and database backup and restore from inside the application.',
          ],
          closing: 'The delivery brings together the five layers and the nine screens of the system. What I would do differently today: move the encryption key out of the code and add a salt to the password hash.',
        },
      },
    },
  },
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
