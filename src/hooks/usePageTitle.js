import { useEffect } from 'react';
import { useI18n } from '../i18n/LanguageContext';

export default function usePageTitle(sectionKey) {
  const { content } = useI18n();

  useEffect(() => {
    document.title = sectionKey
      ? `${content.nav[sectionKey]} — ${content.meta.title.split('—')[0].trim()}`
      : content.meta.title;
  }, [content, sectionKey]);
}
