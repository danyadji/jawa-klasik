// Helper koneksi ke WordPress REST API.
// Base URL bisa dioverride via file .env:
//   VITE_WP_API_URL=http://localhost/diamora/wordpress/wp-json/wp/v2
export const WP_API_BASE =
  import.meta.env.VITE_WP_API_URL ||
  'http://localhost/diamora/wordpress/wp-json/wp/v2';

export const DIAMORA_API_BASE =
  import.meta.env.VITE_DIAMORA_API_URL ||
  WP_API_BASE.replace(/\/wp\/v2\/?$/, '/diamora/v1');

export async function submitRsvp({ invitationId, name, kehadiran, jumlah }) {
  const res = await fetch(`${DIAMORA_API_BASE}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      undangan_id: invitationId,
      nama: name,
      kehadiran: kehadiran,
      jumlah: jumlah || 1,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengirim RSVP');
  return data;
}

export async function fetchRsvp(invitationId) {
  const res = await fetch(`${DIAMORA_API_BASE}/rsvp?undangan_id=${invitationId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal memuat RSVP');
  return data;
}

export async function submitUcapan({ invitationId, name, pesan }) {
  const res = await fetch(`${DIAMORA_API_BASE}/ucapan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      undangan_id: invitationId,
      nama: name,
      pesan: pesan,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal mengirim ucapan');
  return data;
}

export async function fetchUcapan(invitationId) {
  const res = await fetch(`${DIAMORA_API_BASE}/ucapan?undangan_id=${invitationId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal memuat ucapan');
  return data;
}

export async function deleteUcapan(ucapanId) {
  const res = await fetch(`${DIAMORA_API_BASE}/ucapan/${ucapanId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menghapus ucapan');
  return data;
}

export async function deleteRsvp(rsvpId) {
  const res = await fetch(`${DIAMORA_API_BASE}/rsvp/${rsvpId}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Gagal menghapus RSVP');
  return data;
}

export async function fetchUndangan(slug) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const url = slug
      ? `${WP_API_BASE}/undangan?slug=${encodeURIComponent(slug)}&_t=${Date.now()}`
      : `${WP_API_BASE}/undangan?per_page=1&orderby=modified&order=desc&_t=${Date.now()}`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('WP API error: ' + res.status);
    const json = await res.json();
    if (!json.length) throw new Error('Undangan tidak ditemukan' + (slug ? ': ' + slug : ''));
    return await mapAcfToInvitation(json[0]);
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// Cache ID media -> URL biar tidak fetch berulang
const mediaCache = new Map();

async function resolveMediaUrl(id) {
  if (!id) return '';
  if (mediaCache.has(id)) return mediaCache.get(id);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(`${WP_API_BASE}/media/${id}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return '';
    const json = await res.json();
    const url = json.source_url || json.guid?.rendered || '';
    if (url) mediaCache.set(id, url);
    return url;
  } catch {
    clearTimeout(timeoutId);
    return '';
  }
}

// Nilai field foto dari ACF bisa berupa: URL string, object {url/id}, atau angka ID.
// Semua di-resolve jadi URL string.
async function resolveImage(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return resolveMediaUrl(value);
  if (typeof value === 'object') {
    if (typeof value.url === 'string' && value.url) return value.url;
    if (value.id) return resolveMediaUrl(value.id);
    if (value.ID) return resolveMediaUrl(value.ID);
  }
  return '';
}

function parseDresscodeColors(val) {
  if (!val) return null;
  if (Array.isArray(val)) {
    const cleaned = val
      .map(c => (typeof c === 'string' ? c.trim() : (c?.color || c?.hex || '')))
      .filter(c => /^#?[0-9a-fA-F]{3,8}$/.test(c))
      .map(c => (c.startsWith('#') ? c : `#${c}`));
    return cleaned.length > 0 ? cleaned : null;
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseDresscodeColors(parsed);
      } catch {}
    }
    const list = trimmed
      .split(/[,;\s]+/)
      .map(c => c.trim())
      .filter(c => /^#?[0-9a-fA-F]{3,8}$/.test(c))
      .map(c => (c.startsWith('#') ? c : `#${c}`));
    return list.length > 0 ? list : null;
  }
  return null;
}

async function mapAcfToInvitation(post) {
  const a = post.acf || {};

  // Prioritaskan URL gambar langsung dari WP backend jika sudah di-resolve
  const [
    groomPhoto,
    bridePhoto,
    couplePhoto,
    galeri1, galeri2, galeri3, galeri4, galeri5,
    story1Photo,
    story2Photo,
  ] = await Promise.all([
    post.groom_photo_url || resolveImage(a.mempelai_pria_foto),
    post.bride_photo_url || resolveImage(a.mempelai_wanita_foto),
    post.couple_photo_url || resolveImage(a.couple_foto),
    resolveImage(a.galeri_1),
    resolveImage(a.galeri_2),
    resolveImage(a.galeri_3),
    resolveImage(a.galeri_4),
    resolveImage(a.galeri_5),
    resolveImage(a.story_1_foto),
    resolveImage(a.story_2_foto),
  ]);

  const events = [
    {
      title: a.akad_title || 'Akad Nikah',
      date: a.akad_date,
      time: a.akad_time,
      location: a.akad_location,
      address: a.akad_address,
      url: a.akad_maps_url,
    },
    {
      title: a.resepsi_title || 'Resepsi',
      date: a.resepsi_date,
      time: a.resepsi_time,
      location: a.resepsi_location,
      address: a.resepsi_address,
      url: a.resepsi_maps_url,
    },
    {
      title: a.ngunduh_mantu_title || 'Ngunduh Mantu',
      date: a.ngunduh_mantu_date,
      time: a.ngunduh_mantu_time,
      location: a.ngunduh_mantu_location,
      address: a.ngunduh_mantu_address,
      url: a.ngunduh_mantu_maps_url,
    },
  ].filter((e) => e.title && (e.date || e.location || e.address || e.time));

  // Gallery: prioritaskan gallery_urls dari backend (array URL bersih)
  const gallery = (Array.isArray(post.gallery_urls) && post.gallery_urls.length > 0)
    ? post.gallery_urls.filter(Boolean)
    : [galeri1, galeri2, galeri3, galeri4, galeri5].filter(Boolean);

  // Stories: dukung multiple stories (> 2) secara dinamis
  let stories = [];
  if (Array.isArray(post.stories) && post.stories.length > 0) {
    stories = post.stories.map(s => ({
      title: s.title || '',
      description: s.description || s.desc || '',
      photo: s.photo || s.photo_url || '',
      date: s.date || '',
    })).filter(s => s.title || s.description || s.photo);
  } else {
    stories = [
      { title: a.story_1_title, description: a.story_1_desc, photo: story1Photo },
      { title: a.story_2_title, description: a.story_2_desc, photo: story2Photo },
    ].filter((s) => s.title || s.description || s.photo);
  }

  const bankAccounts = [
    { bank: a.bank_1_name, number: a.bank_1_number, holder: a.bank_1_holder },
    { bank: a.bank_2_name, number: a.bank_2_number, holder: a.bank_2_holder },
  ].filter((b) => b.number || b.bank);

  const rawColors = post.dresscode_colors || post.meta?.dresscode_colors || a.dresscode_colors || null;
  const parsedColors = parseDresscodeColors(rawColors);
  const dresscodeColors = parsedColors || ['#6b492b', '#ba7845', '#f3caa7', '#fcf6e8'];
  const dresscodeInfo = post.dresscode_info || post.meta?.dresscode_info || a.dresscode_info || '';

  return {
    id: post.id,
    slug: post.slug,
    template: a.pilihan_template || 'jawa-klasik',
    groom: {
      nickname: a.mempelai_pria_nickname || 'Danu',
      fullName: a.mempelai_pria_fullname || '',
      parents: a.mempelai_pria_ortu || '',
      photo: groomPhoto,
      ig: a.mempelai_pria_ig || '',
    },
    bride: {
      nickname: a.mempelai_wanita_nickname || 'Fifi',
      fullName: a.mempelai_wanita_fullname || '',
      parents: a.mempelai_wanita_ortu || '',
      photo: bridePhoto,
      ig: a.mempelai_wanita_ig || '',
    },
    couplePhoto,
    eventDate: a.event_date || null,
    events,
    gallery,
    videoUrl: post.video_url || a.video_url || post.meta?.video_url || '',
    stories,
    bankAccounts,
    giftAddress: a.gift_address || '',
    musicUrl: post.music_url || a.music_url || post.meta?.music_url || '',
    quote: a.quote_text || '',
    dresscodeColors,
    dresscodeInfo,
  };
}
