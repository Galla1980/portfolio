# Portfolio · Lucas Gallardo

Sitio personal bilingüe (ES/EN) construido con Astro y Tailwind CSS. Estático, sin frameworks de UI.

## Comandos

| Comando | Acción |
| --- | --- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `http://localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Previsualiza el build de `dist/` |

## Rutas

| Ruta | Contenido |
| --- | --- |
| `/` | Redirección a `/es/` |
| `/es/`, `/en/` | Inicio: dossier numerado (Perfil, Método, Proyectos, Trayectoria, Contacto) |
| `/es/proyectos/vitalpet`, `/en/projects/vitalpet` | Caso de estudio de VitalPet |
| `/es/proyectos/book-go`, `/en/projects/book-go` | Caso de estudio de Book&Go |
| `/thanks` | Confirmación del formulario (no indexada); lee `?language=en` para mostrar la versión en inglés |
| `/styleguide` | Referencia interna del sistema de diseño (no indexada) |
| `/404.html` | Página de error |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Secciones de la home

`01 Perfil` · `02 Método` · `03 Proyectos` · `04 Trayectoria` · `05 Contacto`, más el hero con el diagrama de arquitectura por capas. Los anchos de ancla son `#perfil`, `#metodo`, `#proyectos`, `#trayectoria`, `#contacto`.

## Diseño

- Paleta base **Cobre** (ámbar → coral sobre carbón cálido), definida en `src/styles/global.css`.
- Para comparar otras identidades sin tocar código: `?palette=emerald` o `?palette=plum`.
- Tema claro con el botón del header o con `?theme=light`. El tema sí persiste; la paleta no.
- El estado inicial de las animaciones depende de la clase `js` en `<html>`: sin JavaScript el contenido se ve igual.

## Casos de estudio

El contenido vive en `src/data/cases.ts` (ES y EN completos por caso) y se renderiza con `src/components/CaseStudy.astro`. Cada idioma tiene su ruta: `src/pages/[lang]/proyectos/[slug].astro` y `src/pages/[lang]/projects/[slug].astro`; las dos se generan con `caseStudyPaths(lang)`.

La tarjeta de la home muestra el link "Ver el caso" automáticamente cuando el `slug` del proyecto existe en `cases.ts`: no hay que marcar nada en `projects.ts`. La captura y el stack de la página se toman del proyecto, así que no se duplican. El proyecto que ocupa la tarjeta grande se marca con `featured: true` en `projects.ts`.

## Estructura

```
src/
├─ data/        contenido del sitio (site, profile, projects, cases)
├─ i18n/        traducciones, detección de idioma y rutas
├─ layouts/     BaseLayout con SEO, hreflang, JSON-LD y tema
├─ components/  Header, Footer, SectionHead, ProjectCard, CaseStudy, ContactForm, toggles
├─ pages/       rutas por idioma ([lang]) + 404 + styleguide
├─ scripts/     comportamiento del cliente (tema, menú, formulario, reveals)
└─ styles/      global.css con los tokens de diseño
```

## Publicación

Se publica en GitHub Pages con dominio propio (`https://lucasgallardo.dev`). El repo todavía no incluye un workflow de despliegue porque la publicación quedó para después: cuando toque, hay que compilar `dist/` con GitHub Actions, sumar `public/CNAME` con el dominio y apuntar los DNS a GitHub.

El dominio está fijado en cuatro lugares (`astro.config.mjs`, `public/robots.txt`, `public/sitemap.xml` y `src/data/site.ts`) y la imagen de Open Graph lo toma de `Astro.site`: si se publica en otro dominio hay que actualizar esos cuatro.

## Contacto

El formulario envía a Formspree (`src/data/site.ts` → `formspree.endpoint`). Plan gratuito: 50 mensajes por mes. Si el endpoint se deja vacío el formulario abre el cliente de correo con el mensaje ya redactado, y si el envío falla la página lo avisa en pantalla: el correo directo está a un costado del formulario.
