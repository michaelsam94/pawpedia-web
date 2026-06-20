const STORAGE_KEY = 'pawpedia.deviceId';
let memoryDeviceId: string | null = null;

export function getDeviceId() {
  if (memoryDeviceId) {
    return memoryDeviceId;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      memoryDeviceId = stored;
      return stored;
    }

    const created = createDeviceId();
    window.localStorage.setItem(STORAGE_KEY, created);
    memoryDeviceId = created;
    return created;
  } catch {
    memoryDeviceId = createDeviceId();
    return memoryDeviceId;
  }
}

function createDeviceId() {
  const random = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
  return `pawpedia-${random}`;
}
