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

export function getGuest(slug, kode) {
  const targetSlug = slug || 'danu-fifi';
  const cleanKode = (kode || '').trim();
  if (!cleanKode) {
    return Promise.resolve({ registered: false, reason: 'tanpa_kode' });
  }
  const key = `${targetSlug}|${cleanKode}`;

  if (guestPromises.has(key)) {
    return guestPromises.get(key);
  }

  const promise = checkGuestRegistration(targetSlug, cleanKode).catch((err) => {
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
  const k = (searchParams.get('k') || '').trim();

  getInvitation(slug);
  if (k) {
    getGuest(slug, k);
  }
}
