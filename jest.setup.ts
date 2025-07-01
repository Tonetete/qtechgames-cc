import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Mocking intersection observer...
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        const translations: { [key: string]: string } = {
          noFavorites: 'There are no favorite games yet.',
          'loading.games': 'Loading games...',
          'loading.more': 'Loading more...',
          'search.placeholder': 'Search by title or studio...',
          'navigation.seeFavorites': 'See favorites',
          'navigation.back': '← Back to catalogue',
          'navigation.play': 'Play',
        };
        return translations[key] || key;
      },
      i18n: {
        changeLanguage: () => Promise.resolve(),
        language: 'en',
      },
    };
  },
}));
