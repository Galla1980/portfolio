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
| `/es/`, `/en/` | Inicio: dossier numerado (Perfil, Método, Evidencia, Trayectoria, Contacto) |
| `/es/blog`, `/en/blog` | Índice del blog |
| `/thanks` | Confirmación del formulario (no indexada); lee `?language=en` para mostrar la versión en inglés |
| `/styleguide` | Referencia interna del sistema de diseño (no indexada) |
| `/404.html` | Página de error |
| `/sitemap.xml`, `/robots.txt` | SEO |

## Secciones de la home

`01 Perfil` · `02 Método` · `03 Evidencia` · `04 Trayectoria` · `05 Contacto`, más el hero con el diagrama de arquitectura por capas. Los anchos de ancla son `#perfil`, `#metodo`, `#evidencia`, `#trayectoria`, `#contacto`.

## Diseño

- Paleta base **Cobre** (ámbar → coral sobre carbón cálido), definida en `src/styles/global.css`.
- Para comparar otras identidades sin tocar código: `?palette=emerald` o `?palette=plum`.
- Tema claro con el botón del header o con `?theme=light`. El tema sí persiste; la paleta no.
- El estado inicial de las animaciones depende de la clase `js` en `<html>`: sin JavaScript el contenido se ve igual.

## Estructura

```
src/
├─ data/        contenido del sitio (site, profile, projects, posts)
├─ i18n/        traducciones, detección de idioma y rutas
├─ layouts/     BaseLayout con SEO, hreflang, JSON-LD y tema
├─ components/  Header, Footer, SectionHead, ProjectCard, ContactForm, toggles
├─ pages/       rutas por idioma ([lang]) + 404 + styleguide
├─ scripts/     comportamiento del cliente (tema, menú, formulario, reveals)
└─ styles/      global.css con los tokens de diseño
```

## Pendientes

- Fase 3: páginas de caso de estudio para los 3 proyectos (problemática, arquitectura, decisiones, resultado).
- Fase 4: los 3 artículos del blog (hoy listados como "En preparación") con MDX y RSS.
- Fase 6: capturas y GIFs reales del resto de los proyectos y decidir hosting y dominio.
  - `public/img/book-go.png` es la única captura real por ahora (512×307, se muestra a ~480 px: conviene volver a capturarla más grande).
  - VitalPet todavía no tiene captura ni repositorio público: cuando el repo se renombre, sumar el link en `src/data/projects.ts`.
- El dominio está fijado en tres lugares (`astro.config.mjs`, `public/robots.txt` y `public/sitemap.xml`): si se publica en otro dominio hay que actualizar los tres.

## Contacto

El formulario envía a Formspree (`src/data/site.ts` → `formspree.endpoint`). Plan gratuito: 50 mensajes por mes. Si el endpoint se deja vacío el formulario abre el cliente de correo con el mensaje ya redactado, y si el envío falla la página lo avisa en pantalla: el correo directo está a un costado del formulario.
