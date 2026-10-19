import { defaultLang, languages, ui, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first && first in languages) return first as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui['es'], vars?: Record<string, string | number>) {
    let value: string = ui[lang][key] ?? ui[defaultLang][key];
    if (vars) {
      for (const [name, replacement] of Object.entries(vars)) {
        value = value.replaceAll(`{${name}}`, String(replacement));
      }
    }
    return value;
  };
}

export const routes = {
  home: { es: '/es/', en: '/en/' },
  blog: { es: '/es/blog', en: '/en/blog' },
  contact: { es: '/es/#contacto', en: '/en/#contacto' },
  caseStudies: { es: '/es/proyectos', en: '/en/projects' },
} as const;

const segmentMap: Record<string, string> = {
  proyectos: 'projects',
  projects: 'proyectos',
  'sobre-mi': 'about',
  about: 'sobre-mi',
};

export function getAlternatePath(url: URL): { lang: Lang; path: string } {
  const current = getLangFromUrl(url);
  const target: Lang = current === 'es' ? 'en' : 'es';
  const segments = url.pathname.split('/').filter(Boolean);

  if (!(segments[0] in languages)) {
    return { lang: target, path: routes.home[target] };
  }

  const rest = segments.slice(1).map((segment) => segmentMap[segment] ?? segment);
  const path = `/${[target, ...rest].join('/')}`;
  return { lang: target, path: path === `/${target}` ? routes.home[target] : path };
}
