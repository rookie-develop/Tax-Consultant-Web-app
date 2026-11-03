import { ServiceCategory, SubService } from '../types';
import { SERVICE_CATEGORIES } from '../data/servicesData';

export type AppScreen =
  | 'home'
  | 'category'
  | 'subservice'
  | 'login'
  | 'complaint'
  | 'channels'
  | 'privacy-policy'
  | 'data-safety'
  | 'delete-account';

export type AppOverlay =
  | 'mobileMenu'
  | 'cloudAccess'
  | 'comingSoon'
  | 'notifications';

export interface NavigationHistoryState {
  screen: AppScreen;
  categoryId?: string | null;
  subServiceId?: string | null;
  overlay?: AppOverlay | null;
  cloudType?: 'unauthenticated' | 'not-found' | null;
  comingSoonFeature?: string | null;
  depth: number;
  timestamp?: number;
}

/**
 * Builds the canonical URL for a given screen and optional category/sub-service.
 */
export function buildUrlForScreen(
  screen: AppScreen,
  categoryId?: string | null,
  subServiceId?: string | null
): string {
  switch (screen) {
    case 'privacy-policy':
      return '/privacy-policy';
    case 'data-safety':
      return '/data-safety';
    case 'delete-account':
      return '/delete-account';
    case 'login':
      return '/#login';
    case 'complaint':
      return '/#complaint';
    case 'channels':
      return '/#channels';
    case 'subservice':
      return categoryId && subServiceId
        ? `/#services/${encodeURIComponent(categoryId)}/${encodeURIComponent(subServiceId)}`
        : '/#services';
    case 'category':
      return categoryId
        ? `/#services/${encodeURIComponent(categoryId)}`
        : '/#services';
    case 'home':
    default:
      return '/';
  }
}

/**
 * Parses the current browser location (pathname, hash) and history.state
 * into a typed, validated NavigationHistoryState.
 */
export function parseLocationToState(
  pathname: string,
  hash: string,
  rawState?: any
): NavigationHistoryState {
  const cleanPath = (pathname || '').replace(/\/$/, '') || '/';
  const cleanHash = hash || '';

  // 1. If history.state already has a valid structured state from this app, trust it
  if (
    rawState &&
    typeof rawState === 'object' &&
    typeof rawState.screen === 'string'
  ) {
    return {
      screen: rawState.screen as AppScreen,
      categoryId: rawState.categoryId || null,
      subServiceId: rawState.subServiceId || null,
      overlay: rawState.overlay || null,
      cloudType: rawState.cloudType || null,
      comingSoonFeature: rawState.comingSoonFeature || null,
      depth: typeof rawState.depth === 'number' ? rawState.depth : 0,
    };
  }

  // 2. Hash-based screen matches (checked first if hash exists)
  if (cleanHash === '#login') {
    return { screen: 'login', depth: 0 };
  }
  if (cleanHash === '#complaint') {
    return { screen: 'complaint', depth: 0 };
  }
  if (cleanHash === '#channels') {
    return { screen: 'channels', depth: 0 };
  }

  // Subservice hash pattern: #services/:categoryId/:subServiceId
  const subMatch = cleanHash.match(/^#services\/([^/]+)\/([^/]+)$/);
  if (subMatch) {
    const catId = decodeURIComponent(subMatch[1]);
    const subId = decodeURIComponent(subMatch[2]);
    return {
      screen: 'subservice',
      categoryId: catId,
      subServiceId: subId,
      depth: 0,
    };
  }

  // Category hash pattern: #services/:categoryId
  const catMatch = cleanHash.match(/^#services\/([^/]+)$/);
  if (catMatch) {
    const catId = decodeURIComponent(catMatch[1]);
    return {
      screen: 'category',
      categoryId: catId,
      depth: 0,
    };
  }

  // 3. Direct URL path matches (for cold starts, page refreshes, direct links)
  if (cleanPath === '/privacy-policy' || cleanHash === '#privacy-policy') {
    return { screen: 'privacy-policy', depth: 0 };
  }
  if (cleanPath === '/data-safety' || cleanHash === '#data-safety') {
    return { screen: 'data-safety', depth: 0 };
  }
  if (cleanPath === '/delete-account' || cleanHash === '#delete-account') {
    return { screen: 'delete-account', depth: 0 };
  }

  // 4. Default to home
  return { screen: 'home', depth: 0 };
}

/**
 * Finds a ServiceCategory by ID from the default service dataset.
 */
export function findCategoryById(categoryId?: string | null): ServiceCategory | null {
  if (!categoryId) return null;
  return SERVICE_CATEGORIES.find((c) => c.id === categoryId) || null;
}

/**
 * Finds a SubService inside a Category by ID.
 */
export function findSubServiceById(
  category?: ServiceCategory | null,
  subServiceId?: string | null
): SubService | null {
  if (!category || !subServiceId) return null;
  return category.subServices.find((s) => s.id === subServiceId) || null;
}
