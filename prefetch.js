import { fetchUndangan, checkGuestRegistration } from './wp-api';

const invitationPromises = new Map();
const guestPromises = new Map();

export function getInvitation(slug) {
  const key = slug || 'danu-fifi';
  if (invitationPromises.has(key)) {
    return invitationPromises.get(key);
  }

  const promise = fetchUndangan(key).catch((err) => {
    invitationPromises.delete(key);
    throw err;
  });

  invitationPromises.set(key, promise);
  return promise;
}

export function getGuest(slug, to) {
  const targetSlug = slug || 'danu-fifi';
  const cleanTo = (to || '').trim();
  const key = `${targetSlug}|${cleanTo}`;

  if (guestPromises.has(key)) {
    return guestPromises.get(key);
  }

  const promise = checkGuestRegistration(targetSlug, cleanTo).catch((err) => {
    guestPromises.delete(key);
    throw err;
  });

  guestPromises.set(key, promise);
  return promise;
}

export function startPrefetch() {
  if (typeof window === 'undefined') return;

  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const segments = pathname.split('/');
  const slug = segments[0] || 'danu-fifi';

  const searchParams = new URLSearchParams(window.location.search);
  const to = (searchParams.get('to') || '').trim();

  getInvitation(slug);
  if (to) {
    getGuest(slug, to);
  }
}
