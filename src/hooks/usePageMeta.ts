import { useEffect } from 'react';

type PageMeta = {
  title: string;
  description: string;
  canonicalPath?: string;
};

export function usePageMeta({ title, description, canonicalPath = '/' }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setCanonical(`https://pawpediaa.pages.dev${canonicalPath}`);
  }, [canonicalPath, description, title]);
}

function setMeta(name: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.append(element);
  }
  element.content = content;
}

function setCanonical(href: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.append(element);
  }
  element.href = href;
}
