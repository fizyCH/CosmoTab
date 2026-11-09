const api = globalThis.browser || globalThis.chrome;
const pageUrl = api.runtime.getURL('index.html');

function queryTabs(query) {
  if (globalThis.browser) return api.tabs.query(query);

  return new Promise((resolve, reject) => {
    api.tabs.query(query, (tabs) => {
      const error = api.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(tabs);
    });
  });
}

function createTab(options) {
  if (globalThis.browser) return api.tabs.create(options);

  return new Promise((resolve, reject) => {
    api.tabs.create(options, (tab) => {
      const error = api.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(tab);
    });
  });
}

function updateTab(tabId, options) {
  if (globalThis.browser) return api.tabs.update(tabId, options);

  return new Promise((resolve, reject) => {
    api.tabs.update(tabId, options, (tab) => {
      const error = api.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(tab);
    });
  });
}

function getPlatformInfo() {
  if (globalThis.browser) return api.runtime.getPlatformInfo();

  return new Promise((resolve, reject) => {
    api.runtime.getPlatformInfo((info) => {
      const error = api.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(info);
    });
  });
}

async function openPage() {
  const tabs = await queryTabs({});
  const existing = tabs.find((tab) => tab.url === pageUrl);

  if (existing && typeof existing.id === 'number') {
    await updateTab(existing.id, { active: true });
    return;
  }

  await createTab({ url: pageUrl });
}

async function openPageOnAndroid() {
  try {
    const info = await getPlatformInfo();
    if (info && info.os === 'android') await openPage();
  } catch {
     
  }
}

let pendingImageSearch = null;

api.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== 'cosmotab:image-search') return;

  pendingImageSearch = {
    mode: message.mode === 'ai' ? 'ai' : 'lens',
    query: typeof message.query === 'string' ? message.query.trim().slice(0, 300) : '',
    expires: Date.now() + 20000
  };

  if (typeof sendResponse === 'function') sendResponse({ ok: true });
});

api.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!pendingImageSearch) return;

  if (Date.now() > pendingImageSearch.expires) {
    pendingImageSearch = null;
    return;
  }

  const url = changeInfo.url;
  if (!url) return;

  let candidate = '';

  if (url.startsWith('https://www.google.com/search?')) {
    candidate = url;
  } else if (url.startsWith('https://www.google.com/sorry/')) {
    try {
      const sorryUrl = new URL(url);
      candidate = sorryUrl.searchParams.get('continue') || '';
    } catch {
      candidate = '';
    }
  }

  if (!candidate || !candidate.includes('vsrid=') ||
      (!candidate.includes('udm=26') && !candidate.includes('udm=24'))) {
    return;
  }

  const pending = pendingImageSearch;
  pendingImageSearch = null;

  if (pending.mode !== 'ai') return;

  try {
    const next = new URL(candidate);
    next.searchParams.set('udm', '50');
    next.searchParams.set('lns_mode', 'mu');

    if (pending.query) {
      next.searchParams.set('q', pending.query);
    }

    setTimeout(() => {
      updateTab(tabId, { url: next.toString() }).catch(() => {});
    }, 900);
  } catch {
     
  }
});

api.action.onClicked.addListener(() => {
  void openPage();
});

api.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') void openPageOnAndroid();
});
