'use strict';

 
const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    url: 'https://www.google.com/search?q={q}'
  },
  yandex: {
    name: 'Яндекс',
    url: 'https://yandex.ru/search/?text={q}'
  },
  bing: {
    name: 'Bing',
    url: 'https://www.bing.com/search?q={q}'
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    url: 'https://duckduckgo.com/?q={q}'
  }
};

const CITIES = [
  { id: 'moscow', ru: 'Москва', en: 'Moscow', lat: 55.7558, lon: 37.6173 },
  { id: 'spb', ru: 'Санкт-Петербург', en: 'Saint Petersburg', lat: 59.9343, lon: 30.3351 },
  { id: 'novosibirsk', ru: 'Новосибирск', en: 'Novosibirsk', lat: 55.0084, lon: 82.9357 },
  { id: 'yekaterinburg', ru: 'Екатеринбург', en: 'Yekaterinburg', lat: 56.8389, lon: 60.6057 },
  { id: 'kazan', ru: 'Казань', en: 'Kazan', lat: 55.7961, lon: 49.1064 },
  { id: 'minsk', ru: 'Минск', en: 'Minsk', lat: 53.9006, lon: 27.5590 },
  { id: 'kyiv', ru: 'Киев', en: 'Kyiv', lat: 50.4501, lon: 30.5234 },
  { id: 'almaty', ru: 'Алматы', en: 'Almaty', lat: 43.2220, lon: 76.8512 },
  { id: 'tbilisi', ru: 'Тбилиси', en: 'Tbilisi', lat: 41.7151, lon: 44.8271 },
  { id: 'london', ru: 'Лондон', en: 'London', lat: 51.5074, lon: -0.1278 },
  { id: 'paris', ru: 'Париж', en: 'Paris', lat: 48.8566, lon: 2.3522 },
  { id: 'berlin', ru: 'Берлин', en: 'Berlin', lat: 52.5200, lon: 13.4050 },
  { id: 'madrid', ru: 'Мадрид', en: 'Madrid', lat: 40.4168, lon: -3.7038 },
  { id: 'rome', ru: 'Рим', en: 'Rome', lat: 41.9028, lon: 12.4964 },
  { id: 'amsterdam', ru: 'Амстердам', en: 'Amsterdam', lat: 52.3676, lon: 4.9041 },
  { id: 'warsaw', ru: 'Варшава', en: 'Warsaw', lat: 52.2297, lon: 21.0122 },
  { id: 'prague', ru: 'Прага', en: 'Prague', lat: 50.0755, lon: 14.4378 },
  { id: 'vienna', ru: 'Вена', en: 'Vienna', lat: 48.2082, lon: 16.3738 },
  { id: 'istanbul', ru: 'Стамбул', en: 'Istanbul', lat: 41.0082, lon: 28.9784 },
  { id: 'dubai', ru: 'Дубай', en: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { id: 'new-york', ru: 'Нью-Йорк', en: 'New York', lat: 40.7128, lon: -74.0060 },
  { id: 'los-angeles', ru: 'Лос-Анджелес', en: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  { id: 'toronto', ru: 'Торонто', en: 'Toronto', lat: 43.6532, lon: -79.3832 },
  { id: 'sao-paulo', ru: 'Сан-Паулу', en: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { id: 'tokyo', ru: 'Токио', en: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { id: 'seoul', ru: 'Сеул', en: 'Seoul', lat: 37.5665, lon: 126.9780 },
  { id: 'beijing', ru: 'Пекин', en: 'Beijing', lat: 39.9042, lon: 116.4074 },
  { id: 'shanghai', ru: 'Шанхай', en: 'Shanghai', lat: 31.2304, lon: 121.4737 },
  { id: 'singapore', ru: 'Сингапур', en: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { id: 'sydney', ru: 'Сидней', en: 'Sydney', lat: -33.8688, lon: 151.2093 }
];

const DEFAULT_CITY_ID = 'moscow';

const DEFAULT_SETTINGS = {
  language: 'en',
  languageExplicit: false,
  searchEngine: 'google',
  planetMode: 'auto',
  layout: 'top',
  weather: {
    enabled: true,
    cityId: DEFAULT_CITY_ID,
    unit: 'celsius'
  }
};

const I18N = {
  ru: {
    'page.title': 'Новая вкладка',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.add': 'Добавить',
    'clock.label': 'Текущее время',
    'scene.error': 'WebGL недоступен в этом браузере — 3D-сцена не может быть показана.',
    'player.label': 'Медиаплеер',
    'player.progress': 'Позиция воспроизведения',
    'player.noSeek': 'Точный прогресс недоступен',
    'player.untitled': 'Без названия',
    'player.browser': 'Браузер',
    'player.thisBrowser': 'Этот браузер',
    'player.playing': 'Воспроизведение в браузере',
    'player.of': 'из',
    'player.controls': 'Управление плеером',
    'player.prev': 'Предыдущий трек',
    'player.next': 'Следующий трек',
    'player.pauseAction': 'Пауза',
    'player.playAction': 'Играть',
    'weather.label': 'Погода',
    'weather.loading': 'Загрузка…',
    'weather.unavailable': 'Погода недоступна',
    'weather.unavailableRetry': 'Нет данных · обновить',
    'weather.refresh': 'Нажмите, чтобы обновить',
    'weather.updated': 'обновлено в {time}',
    'weather.cond.clear': 'Ясно',
    'weather.cond.mostlyClear': 'Преимущественно ясно',
    'weather.cond.partlyCloudy': 'Переменная облачность',
    'weather.cond.overcast': 'Пасмурно',
    'weather.cond.fog': 'Туман',
    'weather.cond.drizzle': 'Морось',
    'weather.cond.freezingDrizzle': 'Ледяная морось',
    'weather.cond.rain': 'Дождь',
    'weather.cond.freezingRain': 'Ледяной дождь',
    'weather.cond.snow': 'Снег',
    'weather.cond.snowGrains': 'Снежные зёрна',
    'weather.cond.showers': 'Ливни',
    'weather.cond.snowShowers': 'Снегопады',
    'weather.cond.thunderstorm': 'Гроза',
    'weather.cond.cloudy': 'Облачно',
    'settings.open': 'Настройки',
    'settings.title': 'Настройки',
    'settings.interfaceSection': 'Интерфейс',
    'settings.language': 'Язык интерфейса',
    'settings.layout': 'Расположение',
    'settings.layoutTop': 'Поиск внизу, плеер сверху',
    'settings.layoutBottom': 'Поиск вверху, плеер внизу',
    'settings.searchSection': 'Поисковик',
    'settings.searchEngine': 'Поисковая система',
    'settings.weatherSection': 'Погода справа от плеера',
    'settings.weatherToggle': 'Показывать виджет погоды',
    'settings.city': 'Город',
    'settings.units': 'Единицы температуры',
    'settings.planetSection': 'Планета',
    'settings.planetLighting': 'Освещение Земли',
    'settings.planetNote': 'Авто — по сезонному закату. Ручной режим не зависит от времени.',
    'lighting.auto': 'Авто (по времени)',
    'lighting.day': 'День',
    'lighting.dusk': '50 / 50',
    'lighting.night': 'Ночь',
    'settings.exportBookmarks': 'Экспорт закладок',
    'settings.importBookmarks': 'Импорт закладок',
    'settings.exported': 'Экспортировано закладок: {count}',
    'settings.imported': 'Добавлено закладок: {count}',
    'settings.importNone': 'Новых закладок нет',
    'settings.importError': 'Не удалось прочитать файл закладок',
    'settings.bookmarksSection': 'Закладки',
    'settings.bookmarksNote': 'По 9 закладок на странице. Папки открываются сеткой 3×3. Точки под сеткой переключают страницы.',
    'settings.restore': 'Вернуть стандартные закладки',
    'settings.restoreDone': 'Стандартные закладки возвращены',
    'settings.invalidCity': 'Выберите город из списка.',
    'units.celsius': 'Цельсий (°C)',
    'units.fahrenheit': 'Фаренгейт (°F)',
    'tiles.label': 'Закладки',
    'tiles.prev': 'Предыдущая страница закладок',
    'tiles.next': 'Следующая страница закладок',
    'tiles.pages': 'Страницы закладок',
    'tiles.page': 'Страница {n}',
    'search.history': 'История ИИ-поиска Google',
    'search.aiShort': 'ИИ',
    'search.placeholder': 'Поиск в {engine}',
    'search.aiPlaceholder': 'Спросить Google ИИ…',
    'search.aiOffTitle': 'ИИ-поиск Google',
    'search.aiOnTitle': 'Обычный поиск',
    'imageSearch.lens': 'Искать в Объективе',
    'imageSearch.ai': 'Спросить Google ИИ',
    'imageSearch.error': 'Не удалось подготовить картинку',
    'imageSearch.promptPlaceholder': 'Спросите об изображении…',
    'imageSearch.lensReady': 'Enter — поиск в Объективе',
    'imageSearch.readyAi': 'Google ИИ',
    'imageSearch.readyLens': 'Объектив',
    'imageSearch.send': 'Отправить изображение',
    'imageSearch.remove': 'Убрать изображение',
    'searchEngine.google': 'Google',
    'searchEngine.yandex': 'Яндекс',
    'searchEngine.bing': 'Bing',
    'searchEngine.duckduckgo': 'DuckDuckGo',
    'bookmarks.new': 'Новая закладка',
    'bookmarks.newFolder': 'Новая папка',
    'bookmarks.bookmarkType': 'Закладка',
    'bookmarks.folderType': 'Папка',
    'folders.label': 'Папка',
    'folders.renameHint': 'Нажмите, чтобы переименовать',
    'folders.delete': 'Удалить папку',
    'folders.deleteConfirm': 'Удалить папку и всё её содержимое?',
    'folders.defaultName': 'Папка',
    'folders.open': 'Открыть папку {title}',
    'folders.dropHint': 'Перетащите сюда, чтобы вынести из папки',
    'bookmarks.name': 'Название',
    'bookmarks.namePlaceholder': 'Например, Хабр',
    'bookmarks.url': 'Адрес сайта',
    'bookmarks.add': 'Добавить',
    'bookmarks.remove': 'Удалить закладку {title}',
    'bookmarks.limit': 'Достигнут лимит закладок.',
    'bookmarks.invalidUrl': 'Укажите корректный адрес, например example.com',
    'bookmarks.mail': 'Почта'
  },
  en: {
    'page.title': 'New Tab',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.add': 'Add',
    'clock.label': 'Current time',
    'scene.error': 'WebGL is unavailable in this browser — the 3D scene cannot be shown.',
    'player.label': 'Media player',
    'player.progress': 'Playback position',
    'player.noSeek': 'Precise progress is unavailable',
    'player.untitled': 'Untitled',
    'player.browser': 'Browser',
    'player.thisBrowser': 'This browser',
    'player.playing': 'Playing in browser',
    'player.of': 'of',
    'player.controls': 'Player controls',
    'player.prev': 'Previous track',
    'player.next': 'Next track',
    'player.pauseAction': 'Pause',
    'player.playAction': 'Play',
    'weather.label': 'Weather',
    'weather.loading': 'Loading…',
    'weather.unavailable': 'Weather unavailable',
    'weather.unavailableRetry': 'Unavailable · retry',
    'weather.refresh': 'Click to refresh',
    'weather.updated': 'updated at {time}',
    'weather.cond.clear': 'Clear',
    'weather.cond.mostlyClear': 'Mostly clear',
    'weather.cond.partlyCloudy': 'Partly cloudy',
    'weather.cond.overcast': 'Overcast',
    'weather.cond.fog': 'Fog',
    'weather.cond.drizzle': 'Drizzle',
    'weather.cond.freezingDrizzle': 'Freezing drizzle',
    'weather.cond.rain': 'Rain',
    'weather.cond.freezingRain': 'Freezing rain',
    'weather.cond.snow': 'Snow',
    'weather.cond.snowGrains': 'Snow grains',
    'weather.cond.showers': 'Showers',
    'weather.cond.snowShowers': 'Snow showers',
    'weather.cond.thunderstorm': 'Thunderstorm',
    'weather.cond.cloudy': 'Cloudy',
    'settings.open': 'Settings',
    'settings.title': 'Settings',
    'settings.interfaceSection': 'Interface',
    'settings.language': 'Interface language',
    'settings.layout': 'Layout',
    'settings.layoutTop': 'Search at bottom, player on top',
    'settings.layoutBottom': 'Search at top, player at bottom',
    'settings.searchSection': 'Search engine',
    'settings.searchEngine': 'Search provider',
    'settings.weatherSection': 'Weather next to the player',
    'settings.weatherToggle': 'Show the weather widget',
    'settings.city': 'City',
    'settings.units': 'Temperature units',
    'settings.planetSection': 'Planet',
    'settings.planetLighting': 'Earth lighting',
    'settings.planetNote': 'Auto uses the seasonal sunset. Manual mode ignores the clock.',
    'lighting.auto': 'Auto (time-based)',
    'lighting.day': 'Day',
    'lighting.dusk': '50 / 50',
    'lighting.night': 'Night',
    'settings.exportBookmarks': 'Export bookmarks',
    'settings.importBookmarks': 'Import bookmarks',
    'settings.exported': 'Exported bookmarks: {count}',
    'settings.imported': 'Bookmarks added: {count}',
    'settings.importNone': 'No new bookmarks',
    'settings.importError': 'Could not read the bookmarks file',
    'settings.bookmarksSection': 'Bookmarks',
    'settings.bookmarksNote': '9 bookmarks per page. Folders open as a 3×3 panel. Use the dots below the grid to switch pages.',
    'settings.restore': 'Restore default bookmarks',
    'settings.restoreDone': 'Default bookmarks restored',
    'settings.invalidCity': 'Choose a city from the list.',
    'units.celsius': 'Celsius (°C)',
    'units.fahrenheit': 'Fahrenheit (°F)',
    'tiles.label': 'Bookmarks',
    'tiles.prev': 'Previous bookmarks page',
    'tiles.next': 'Next bookmarks page',
    'tiles.pages': 'Bookmark pages',
    'tiles.page': 'Page {n}',
    'search.history': 'Google AI search history',
    'search.aiShort': 'AI',
    'search.placeholder': 'Search with {engine}',
    'search.aiPlaceholder': 'Ask Google AI…',
    'search.aiOffTitle': 'Google AI search',
    'search.aiOnTitle': 'Regular search',
    'imageSearch.lens': 'Search with Lens',
    'imageSearch.ai': 'Ask Google AI',
    'imageSearch.error': 'Could not prepare the image',
    'imageSearch.promptPlaceholder': 'Ask about this image…',
    'imageSearch.lensReady': 'Enter — search with Lens',
    'imageSearch.readyAi': 'Google AI',
    'imageSearch.readyLens': 'Lens',
    'imageSearch.send': 'Send image',
    'imageSearch.remove': 'Remove image',
    'searchEngine.google': 'Google',
    'searchEngine.yandex': 'Yandex',
    'searchEngine.bing': 'Bing',
    'searchEngine.duckduckgo': 'DuckDuckGo',
    'bookmarks.new': 'New bookmark',
    'bookmarks.newFolder': 'New folder',
    'bookmarks.bookmarkType': 'Bookmark',
    'bookmarks.folderType': 'Folder',
    'folders.label': 'Folder',
    'folders.renameHint': 'Click to rename',
    'folders.delete': 'Delete folder',
    'folders.deleteConfirm': 'Delete the folder and everything inside it?',
    'folders.defaultName': 'Folder',
    'folders.open': 'Open folder {title}',
    'folders.dropHint': 'Drop here to move out of the folder',
    'bookmarks.name': 'Name',
    'bookmarks.namePlaceholder': 'For example, GitHub',
    'bookmarks.url': 'Website address',
    'bookmarks.add': 'Add',
    'bookmarks.remove': 'Delete bookmark {title}',
    'bookmarks.limit': 'Bookmark limit reached.',
    'bookmarks.invalidUrl': 'Enter a valid address, for example example.com',
    'bookmarks.mail': 'Mail'
  }
};

function t(key, vars) {
  const language = Settings.data.language === 'en' ? 'en' : 'ru';
  let value = (I18N[language] && I18N[language][key]) ||
    (I18N.ru && I18N.ru[key]) ||
    key;

  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.split(`{${name}}`).join(String(replacement));
    }
  }

  return value;
}

function applyI18n() {
  const language = Settings.data.language === 'en' ? 'en' : 'ru';
  document.documentElement.lang = language;
  document.title = t('page.title');

  for (const element of document.querySelectorAll('[data-i18n]')) {
    element.textContent = t(element.getAttribute('data-i18n'));
  }

  for (const element of document.querySelectorAll('[data-i18n-placeholder]')) {
    element.placeholder = t(element.getAttribute('data-i18n-placeholder'));
  }

  for (const element of document.querySelectorAll('[data-i18n-title]')) {
    element.title = t(element.getAttribute('data-i18n-title'));
  }

  for (const element of document.querySelectorAll('[data-i18n-aria]')) {
    element.setAttribute('aria-label', t(element.getAttribute('data-i18n-aria')));
  }

  window.dispatchEvent(new CustomEvent('cosmic:locale'));
}

function cityById(id) {
  return CITIES.find((city) => city.id === id) || null;
}

function cityLabel(city, language) {
  if (!city) return '';
  return language === 'en' ? city.en : city.ru;
}

function resolveCityId(value) {
  if (!value) return DEFAULT_CITY_ID;
  const normalized = String(value).trim().toLowerCase();
  const found = CITIES.find((city) =>
    city.id === normalized ||
    city.ru.toLowerCase() === normalized ||
    city.en.toLowerCase() === normalized
  );
  return found ? found.id : DEFAULT_CITY_ID;
}

const Settings = (() => {
  const KEY = 'cosmic.settings.v1';

  function sanitize(raw) {
    const source = raw && typeof raw === 'object' ? raw : {};
    const engine = Object.prototype.hasOwnProperty.call(SEARCH_ENGINES, source.searchEngine)
      ? source.searchEngine
      : DEFAULT_SETTINGS.searchEngine;

    const weather = source.weather && typeof source.weather === 'object'
      ? source.weather
      : {};

    const cityId = CITIES.some((city) => city.id === weather.cityId)
      ? weather.cityId
      : resolveCityId(weather.city);

    const languageExplicit = source.languageExplicit === true;
    const language = languageExplicit
      ? (source.language === 'ru' ? 'ru' : 'en')
      : 'en';

    return {
      language,
      languageExplicit,
      searchEngine: engine,
      planetMode: ['auto', 'day', 'dusk', 'night'].includes(source.planetMode)
        ? source.planetMode
        : 'auto',
      layout: source.layout === 'bottom' ? 'bottom' : 'top',
      weather: {
        enabled: weather.enabled === undefined
          ? DEFAULT_SETTINGS.weather.enabled
          : Boolean(weather.enabled),
        cityId,
        unit: weather.unit === 'fahrenheit' ? 'fahrenheit' : 'celsius'
      }
    };
  }

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || 'null');
      return sanitize(parsed);
    } catch {
      return sanitize(DEFAULT_SETTINGS);
    }
  }

  let data = load();
  const listeners = [];

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
       
    }
  }

  return {
    get data() {
      return data;
    },

    update(partial) {
      const nextWeather = partial && partial.weather
        ? { ...data.weather, ...partial.weather }
        : data.weather;
      data = sanitize({ ...data, ...partial, weather: nextWeather });
      persist();
      for (const listener of listeners) {
        try {
          listener(data);
        } catch {
           
        }
      }
    },

    subscribe(listener) {
      listeners.push(listener);
      try {
        listener(data);
      } catch {
         
      }
    }
  };
})();

(function initLayout() {
  const searchBar = document.querySelector('.search-bar');
  let shiftFrame = 0;

  function updateStageShift() {
    if (!searchBar) return;
    if (!document.body.classList.contains('layout-bottom')) return;

    document.body.classList.remove('layout-bottom');
    const bottomHeight = searchBar.offsetHeight;
    document.body.classList.add('layout-bottom');
    const topHeight = searchBar.offsetHeight;
    const shift = (bottomHeight + topHeight) / 2;

    document.body.style.setProperty('--stage-shift', `${shift}px`);
  }

  function applyLayout(settings) {
    document.body.classList.toggle('layout-bottom', settings.layout === 'bottom');
    updateStageShift();
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(shiftFrame);
    shiftFrame = requestAnimationFrame(updateStageShift);
  });

  window.addEventListener('load', updateStageShift);

  Settings.subscribe(applyLayout);
})();

 
(function initStars() {
  const sky = document.getElementById('stars');
  if (!sky) return;

  let resizeTimer = null;

  function createStars() {
    sky.textContent = '';

    const area = window.innerWidth * window.innerHeight;
    const count = Math.min(260, Math.max(90, Math.round(area / 6200)));
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i += 1) {
      const star = document.createElement('span');
      const size = 0.7 + Math.random() * 2.1;        
      const duration = 2.5 + Math.random() * 4.5;    
      const delay = -Math.random() * duration;       

      star.className = size > 2.1 ? 'star star--bright' : 'star';
      star.style.left = `${(Math.random() * 100).toFixed(2)}%`;
      star.style.top = `${(Math.random() * 100).toFixed(2)}%`;
      star.style.width = `${size.toFixed(2)}px`;
      star.style.height = `${size.toFixed(2)}px`;
      star.style.setProperty('--dur', `${duration.toFixed(2)}s`);
      star.style.setProperty('--delay', `${delay.toFixed(2)}s`);

      fragment.appendChild(star);
    }

    sky.appendChild(fragment);
  }

  createStars();

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createStars, 250);
  });
})();

 
(function initClock() {
  const hoursEl = document.getElementById('clock-hours');
  const minutesEl = document.getElementById('clock-minutes');
  const secondsEl = document.getElementById('clock-seconds');
  if (!hoursEl || !minutesEl || !secondsEl) return;

  const pad = (value) => String(value).padStart(2, '0');
  let timer = null;

  function render() {
    const now = new Date();
    hoursEl.textContent = pad(now.getHours());
    minutesEl.textContent = pad(now.getMinutes());
    secondsEl.textContent = `:${pad(now.getSeconds())}`;
  }

  function schedule() {
    timer = setTimeout(() => {
      render();
      schedule();
    }, 1000 - (Date.now() % 1000));
  }

  render();
  schedule();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    clearTimeout(timer);
    render();
    schedule();
  });
})();

 
(function initBookmarks() {
  const grid = document.getElementById('tiles');
  const bookmarksWidget = grid ? grid.closest('.bookmarks-widget') : null;
  const nav = document.getElementById('tiles-nav');
  const prevButton = document.getElementById('tiles-prev');
  const nextButton = document.getElementById('tiles-next');
  const dots = document.getElementById('tiles-dots');
  const importInput = document.getElementById('bookmark-import');
  const dialog = document.getElementById('bookmark-dialog');
  const form = document.getElementById('bookmark-form');
  const nameInput = document.getElementById('bm-name');
  const urlInput = document.getElementById('bm-url');
  const urlField = document.getElementById('bm-url-field');
  const dialogTitle = document.getElementById('bm-dialog-title');
  const typeGroup = document.getElementById('bm-type');
  const errorEl = document.getElementById('bm-error');
  const cancelButton = document.getElementById('bm-cancel');
  const folderBackdrop = document.getElementById('folder-backdrop');
  const folderPanel = document.getElementById('folder-panel');
  const folderGrid = document.getElementById('folder-grid');
  const folderTitle = document.getElementById('folder-title');

  if (!grid || !dialog || !form) return;

  const STORAGE_KEY = 'cosmic.bookmarks.v2';
  const LEGACY_KEY = 'cosmic.bookmarks.v1';
  const PER_PAGE = 9;
  const MAX_BOOKMARKS = 36;
  const MAX_FOLDER_ITEMS = 9;

  const DEFAULT_BOOKMARKS = [
    { id: 'default-google', type: 'bookmark', title: 'Google', url: 'https://www.google.com/', icon: 'icons/google.png' },
    { id: 'default-youtube', type: 'bookmark', title: 'YouTube', url: 'https://www.youtube.com/', icon: 'icons/youtube.png' },
    { id: 'default-github', type: 'bookmark', title: 'GitHub', url: 'https://github.com/', icon: 'icons/github.svg' },
    { id: 'default-gmail', type: 'bookmark', title: '?????', url: 'https://mail.google.com/', icon: 'icons/gmail.svg' },
    { id: 'default-telegram', type: 'bookmark', title: 'Telegram', url: 'https://web.telegram.org/', icon: 'icons/telegram.svg' }
  ];

  const ICON_PALETTES = [
    ['#5b8cff', '#3a5bd9'],
    ['#ff9a5c', '#e0552f'],
    ['#57d0a0', '#1f9d74'],
    ['#c084fc', '#7c3aed'],
    ['#f472b6', '#db2777'],
    ['#38bdf8', '#0284c7']
  ];

  let currentPage = 0;
  let dialogParentId = null;
  let dialogType = 'bookmark';
  let draggedItem = null;
  let folderStack = [];

  function newId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  }

  function normalizeUrl(value) {
    const raw = String(value || '').trim();
    if (!raw) return null;

    const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

    try {
      const parsed = new URL(withScheme);
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
      if (!parsed.hostname || !parsed.hostname.includes('.')) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function faviconCandidates(url) {
    try {
      const hostname = new URL(url).hostname;
      return [
        `https://${hostname}/favicon.ico`,
        `https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname)}&sz=64`
      ];
    } catch {
      return [];
    }
  }

  function initialOf(title) {
    const chars = Array.from(String(title || '').trim());
    return chars.length ? chars[0].toUpperCase() : '?';
  }

  function paletteFor(title) {
    let hash = 0;
    const text = String(title || '');
    for (let index = 0; index < text.length; index += 1) {
      hash = (hash * 31 + text.charCodeAt(index)) | 0;
    }
    return ICON_PALETTES[Math.abs(hash) % ICON_PALETTES.length];
  }

  function sanitizeItem(item) {
    if (!item || typeof item.title !== 'string') return null;

    const rawTitle = item.title.trim().slice(0, 40);

    if (item.type === 'folder' || Array.isArray(item.children)) {
      const children = Array.isArray(item.children)
        ? item.children.map(sanitizeItem).filter(Boolean).slice(0, MAX_FOLDER_ITEMS)
        : [];

      return {
        id: String(item.id || newId('folder')),
        type: 'folder',
        title: rawTitle || t('folders.defaultName'),
        children
      };
    }

    const url = normalizeUrl(item.url);
    if (!url) return null;

    const defaultBookmark = DEFAULT_BOOKMARKS.find((bookmark) => bookmark.id === item.id);

    return {
      id: String(item.id || newId('bm')),
      type: 'bookmark',
      title: rawTitle || url.hostname.replace(/^www\./, ''),
      url: url.href,
      icon: defaultBookmark
        ? defaultBookmark.icon
        : (typeof item.icon === 'string' ? item.icon : '')
    };
  }

  function sanitizeList(list) {
    return (Array.isArray(list) ? list : [])
      .map(sanitizeItem)
      .filter(Boolean);
  }

  function loadBookmarks() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return sanitizeList(parsed).slice(0, MAX_BOOKMARKS);
        }
      }

      let legacy = [];
      try {
        const oldRaw = JSON.parse(localStorage.getItem(LEGACY_KEY) || '[]');
        if (Array.isArray(oldRaw)) legacy = sanitizeList(oldRaw);
      } catch {
        legacy = [];
      }

      const seeded = [...DEFAULT_BOOKMARKS, ...legacy]
        .filter(Boolean)
        .slice(0, MAX_BOOKMARKS);

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      } catch {
         
      }

      return seeded;
    } catch {
      return DEFAULT_BOOKMARKS.map((bookmark) => ({ ...bookmark }));
    }
  }

  let bookmarks = loadBookmarks();

  function saveBookmarks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch {
       
    }
  }

  function listFor(parentId) {
    if (!parentId) return bookmarks;
    const folder = findFolder(parentId);
    return folder ? folder.children : bookmarks;
  }

  function findFolder(id) {
    if (!id) return null;

    function walk(list) {
      for (const item of list) {
        if (item.type !== 'folder') continue;
        if (item.id === id) return item;
        const nested = walk(item.children);
        if (nested) return nested;
      }
      return null;
    }

    return walk(bookmarks);
  }

  function currentFolder() {
    if (!folderStack.length) return null;
    return findFolder(folderStack[folderStack.length - 1]);
  }

  function canAddTo(parentId) {
    if (!parentId) return bookmarks.length < MAX_BOOKMARKS;
    const folder = findFolder(parentId);
    return Boolean(folder && folder.children.length < MAX_FOLDER_ITEMS);
  }

  function totalItems() {
    return bookmarks.length + (canAddTo(null) ? 1 : 0);
  }

  function pageCount() {
    return Math.max(1, Math.ceil(totalItems() / PER_PAGE));
  }

  function clampPage() {
    currentPage = Math.max(0, Math.min(currentPage, pageCount() - 1));
  }

  function applyLetterIcon(icon, title) {
    const [c1, c2] = paletteFor(title);
    icon.classList.remove('tile-icon--img');
    icon.classList.add('tile-icon--letter');
    icon.style.setProperty('--c1', c1);
    icon.style.setProperty('--c2', c2);
    icon.textContent = initialOf(title);
  }

  function createIcon(bookmark) {
    const icon = document.createElement('span');
    icon.className = 'tile-icon';

    const sources = bookmark.icon ? [bookmark.icon] : faviconCandidates(bookmark.url);
    if (!sources.length) {
      applyLetterIcon(icon, bookmark.title);
      return icon;
    }

    icon.classList.add('tile-icon--img');

    if (bookmark.id === 'default-github') {
      icon.classList.add('tile-icon--invert');
    }

    const img = document.createElement('img');
    img.alt = '';
    img.width = 22;
    img.height = 22;
    img.loading = 'lazy';
    img.referrerPolicy = 'no-referrer';

    let sourceIndex = 0;

    img.addEventListener('error', () => {
      sourceIndex += 1;
      if (sourceIndex < sources.length) {
        img.src = sources[sourceIndex];
        return;
      }

      icon.textContent = '';
      applyLetterIcon(icon, bookmark.title);
    });

    img.src = sources[0];
    icon.appendChild(img);
    return icon;
  }

  function createFolderIcon() {
    const icon = document.createElement('span');
    icon.className = 'tile-icon tile-icon--folder';
    icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z"/></svg>';
    return icon;
  }

  function bookmarkDisplayTitle(bookmark) {
    if (bookmark.id === 'default-gmail') return t('bookmarks.mail');
    return bookmark.title;
  }

  function removeItemFrom(parentId, itemId) {
    const list = listFor(parentId);
    const index = list.findIndex((item) => item.id === itemId);
    if (index === -1) return false;
    list.splice(index, 1);
    return true;
  }

  function moveItemToFolder(itemId, sourceParentId, folderId) {
    if (sourceParentId === folderId) return;

    const target = findFolder(folderId);
    const source = listFor(sourceParentId);
    if (!target || source === target.children) return;

    const index = source.findIndex((item) => item.id === itemId && item.type === 'bookmark');
    if (index === -1) return;

    const [item] = source.splice(index, 1);
    target.children.push(item);
    saveBookmarks();
    render();
    if (folderStack.length) renderFolder();
  }

  function moveItemToRoot(itemId, sourceParentId) {
    if (!sourceParentId) return;

    const source = listFor(sourceParentId);
    const index = source.findIndex((item) => item.id === itemId && item.type === 'bookmark');
    if (index === -1) return;

    const [item] = source.splice(index, 1);
    bookmarks.push(item);
    saveBookmarks();
    render();
    if (folderStack.length) renderFolder();
  }

  function createFolderFromDrop(targetBookmark, targetParentId, draggedId) {
    const list = listFor(targetParentId);
    const targetIndex = list.findIndex((item) => item.id === targetBookmark.id);
    const sourceIndex = list.findIndex((item) => item.id === draggedId);

    if (targetIndex === -1 || sourceIndex === -1 || targetIndex === sourceIndex) return;

    const targetItem = list[targetIndex];
    const sourceItem = list[sourceIndex];

    if (targetItem.type !== 'bookmark' || sourceItem.type !== 'bookmark') return;

    const insertAt = Math.min(targetIndex, sourceIndex);
    list.splice(Math.max(targetIndex, sourceIndex), 1);
    list.splice(Math.min(targetIndex, sourceIndex), 1);

    const folder = {
      id: newId('folder'),
      type: 'folder',
      title: t('folders.defaultName'),
      children: [targetItem, sourceItem]
    };

    list.splice(insertAt, 0, folder);
    saveBookmarks();
    render();
    if (folderStack.length) renderFolder();
    openFolder(folder.id);
  }

  function makeDropTarget(element, handler) {
    element.addEventListener('dragover', (event) => {
      if (!draggedItem) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
      element.classList.add('is-drop-target');
    });

    element.addEventListener('dragleave', () => {
      element.classList.remove('is-drop-target');
    });

    element.addEventListener('drop', (event) => {
      if (!draggedItem) return;
      event.preventDefault();
      event.stopPropagation();
      element.classList.remove('is-drop-target');
      handler(draggedItem);
      draggedItem = null;
    });
  }

  function createBookmarkTile(bookmark, parentId) {
    const wrap = document.createElement('div');
    wrap.className = 'tile-wrap';
    wrap.draggable = true;

    const link = document.createElement('a');
    link.className = 'tile';
    link.href = bookmark.url;
    link.title = bookmark.url;
    link.draggable = false;

    const displayTitle = bookmarkDisplayTitle(bookmark);

    const name = document.createElement('span');
    name.className = 'tile-name';
    name.textContent = displayTitle;

    link.append(createIcon(bookmark), name);
    wrap.appendChild(link);

    const remove = document.createElement('button');
    remove.className = 'tile-remove';
    remove.type = 'button';
    remove.textContent = '×';
    remove.title = t('bookmarks.remove', { title: displayTitle });
    remove.setAttribute('aria-label', t('bookmarks.remove', { title: displayTitle }));

    remove.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      removeItemFrom(parentId, bookmark.id);
      saveBookmarks();
      if (!parentId) clampPage();
      render();
      if (folderStack.length) renderFolder();
    });

    wrap.appendChild(remove);

    wrap.addEventListener('dragstart', (event) => {
      draggedItem = { id: bookmark.id, parentId };
      wrap.classList.add('is-dragging');
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', bookmark.id);
      }
    });

    wrap.addEventListener('dragend', () => {
      wrap.classList.remove('is-dragging');
      draggedItem = null;
    });

    wrap.addEventListener('dragover', (event) => {
      if (!draggedItem ||
          draggedItem.id === bookmark.id ||
          draggedItem.parentId !== parentId) {
        return;
      }

      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
      wrap.classList.add('is-folder-drop');
    });

    wrap.addEventListener('dragleave', () => {
      wrap.classList.remove('is-folder-drop');
    });

    wrap.addEventListener('drop', (event) => {
      if (!draggedItem ||
          draggedItem.id === bookmark.id ||
          draggedItem.parentId !== parentId) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      wrap.classList.remove('is-folder-drop');

      const dragged = draggedItem;
      draggedItem = null;
      createFolderFromDrop(bookmark, parentId, dragged.id);
    });

    return wrap;
  }

  function deleteFolderById(folderId, parentId) {
    if (!window.confirm(t('folders.deleteConfirm'))) return;

    const list = listFor(parentId);
    const index = list.findIndex((item) => item.id === folderId && item.type === 'folder');
    if (index === -1) return;

    list.splice(index, 1);

    const openIndex = folderStack.indexOf(folderId);
    if (openIndex !== -1) folderStack = folderStack.slice(0, openIndex);

    saveBookmarks();
    render();

    if (folderStack.length) {
      renderFolder();
    } else {
      closeFolder();
    }
  }

  function createFolderTile(folder, parentId) {
    const wrap = document.createElement('div');
    wrap.className = 'tile-wrap tile-wrap--folder';

    const button = document.createElement('button');
    button.className = 'tile tile--folder';
    button.type = 'button';
    button.title = t('folders.open', { title: folder.title });
    button.setAttribute('aria-label', button.title);

    const name = document.createElement('span');
    name.className = 'tile-name';
    name.textContent = folder.title;

    button.append(createFolderIcon(), name);
    wrap.appendChild(button);

    const count = document.createElement('span');
    count.className = 'tile-folder-count';
    count.textContent = String(folder.children.length);
    wrap.appendChild(count);

    const remove = document.createElement('button');
    remove.className = 'tile-remove';
    remove.type = 'button';
    remove.textContent = '×';
    remove.title = t('folders.delete');
    remove.setAttribute('aria-label', t('folders.delete'));

    remove.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      deleteFolderById(folder.id, parentId);
    });

    wrap.appendChild(remove);

    button.addEventListener('click', () => openFolder(folder.id));

    makeDropTarget(wrap, (dragged) => {
      moveItemToFolder(dragged.id, dragged.parentId, folder.id);
    });

    return wrap;
  }

  function createAddTile(parentId) {
    const button = document.createElement('button');
    button.className = 'tile tile--add';
    button.type = 'button';
    button.setAttribute('aria-label', t('bookmarks.add'));

    const icon = document.createElement('span');
    icon.className = 'tile-icon tile-icon--add';
    icon.textContent = '+';

    const label = document.createElement('span');
    label.className = 'tile-name';
    label.textContent = t('bookmarks.add');

    button.append(icon, label);
    button.addEventListener('click', () => openDialog(parentId));
    return button;
  }

  function goToPage(page) {
    const target = Math.max(0, Math.min(page, pageCount() - 1));
    if (target === currentPage) return;
    currentPage = target;
    render();
  }

  let gridHeightFrame = 0;

  function syncGridHeight(pages) {
    cancelAnimationFrame(gridHeightFrame);

    gridHeightFrame = requestAnimationFrame(() => {
      if (pages <= 1 || !grid.firstElementChild) {
        grid.style.minHeight = '';
        if (bookmarksWidget) bookmarksWidget.style.minHeight = '';
        return;
      }

      grid.style.minHeight = '';
      if (bookmarksWidget) bookmarksWidget.style.minHeight = '';

      const tileHeight = grid.firstElementChild.getBoundingClientRect().height;
      const rowGap = parseFloat(getComputedStyle(grid).rowGap) || 0;
      const navHeight = nav && !nav.hidden ? nav.getBoundingClientRect().height : 0;
      const widgetGap = bookmarksWidget
        ? (parseFloat(getComputedStyle(bookmarksWidget).rowGap) || 0)
        : 0;

      if (tileHeight > 0 && bookmarksWidget) {
        bookmarksWidget.style.minHeight = `${Math.round(
          tileHeight * 3 + rowGap * 2 + (navHeight ? widgetGap + navHeight : 0)
        )}px`;
      }
    });
  }

  function updateNavigation() {
    const pages = pageCount();

    if (nav) nav.hidden = pages <= 1;
    if (prevButton) prevButton.disabled = currentPage === 0;
    if (nextButton) nextButton.disabled = currentPage >= pages - 1;

    syncGridHeight(pages);

    if (!dots) return;
    dots.textContent = '';

    for (let index = 0; index < pages; index += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = index === currentPage ? 'tiles-dot is-active' : 'tiles-dot';
      dot.setAttribute('aria-label', t('tiles.page', { n: index + 1 }));
      if (index === currentPage) dot.setAttribute('aria-current', 'page');
      dot.addEventListener('click', () => goToPage(index));
      dots.appendChild(dot);
    }
  }

  function render() {
    clampPage();

    const items = bookmarks.map((item) => ({ kind: item.type === 'folder' ? 'folder' : 'bookmark', item }));
    if (canAddTo(null)) items.push({ kind: 'add' });

    const start = currentPage * PER_PAGE;
    const pageItems = items.slice(start, start + PER_PAGE);

    grid.textContent = '';
    const fragment = document.createDocumentFragment();

    for (const entry of pageItems) {
      if (entry.kind === 'bookmark') fragment.appendChild(createBookmarkTile(entry.item, null));
      else if (entry.kind === 'folder') fragment.appendChild(createFolderTile(entry.item, null));
      else fragment.appendChild(createAddTile(null));
    }

    grid.appendChild(fragment);
    updateNavigation();
  }

  let folderCloseTimer = 0;

  function positionFolderPanel() {
    if (!folderPanel || folderPanel.hidden) return;

    const rect = grid.getBoundingClientRect();
    const rowGap = parseFloat(getComputedStyle(grid).rowGap) || 0;
    const firstTile = grid.firstElementChild;
    const tileHeight = firstTile ? firstTile.getBoundingClientRect().height : 0;
    const availableHeight = Math.max(120, window.innerHeight - 24);

    let height = tileHeight > 0
      ? Math.round(tileHeight * 3 + rowGap * 2)
      : Math.round(rect.height);

    height = Math.min(height, Math.round(availableHeight));

    const width = Math.round(rect.width);
    const left = Math.round(rect.left);
    let top = Math.round(rect.top);

    if (top + height > window.innerHeight - 12 || top < 12) {
      top = Math.max(12, Math.round((window.innerHeight - height) / 2));
    }

    folderPanel.style.left = `${left}px`;
    folderPanel.style.top = `${top}px`;
    folderPanel.style.width = `${width}px`;
    folderPanel.style.height = `${height}px`;
    folderPanel.classList.toggle('is-title-below', top < 54);
  }

  function syncFolderTitle() {
    const folder = currentFolder();
    if (folderTitle) folderTitle.textContent = folder ? folder.title : '';
  }

  function renderFolder() {
    if (!folderPanel || !folderGrid) return;

    const folder = currentFolder();
    if (!folder) {
      closeFolder();
      return;
    }

    syncFolderTitle();
    folderGrid.textContent = '';
    const fragment = document.createDocumentFragment();

    for (const item of folder.children) {
      if (item.type === 'folder') fragment.appendChild(createFolderTile(item, folder.id));
      else fragment.appendChild(createBookmarkTile(item, folder.id));
    }

    if (folder.children.length < MAX_FOLDER_ITEMS) {
      fragment.appendChild(createAddTile(folder.id));
    }

    folderGrid.appendChild(fragment);
    positionFolderPanel();
  }

  function openFolder(folderId) {
    if (!folderPanel || !folderBackdrop || !folderGrid) return;
    if (folderStack[folderStack.length - 1] !== folderId) folderStack.push(folderId);

    if (folderCloseTimer) {
      clearTimeout(folderCloseTimer);
      folderCloseTimer = 0;
    }

    folderPanel.classList.remove('is-closing', 'is-open');
    folderBackdrop.classList.remove('is-closing', 'is-open');
    folderPanel.hidden = false;
    folderBackdrop.hidden = false;
    document.body.classList.add('folder-open');
    renderFolder();

    requestAnimationFrame(() => {
      positionFolderPanel();
      folderPanel.classList.add('is-open');
      folderBackdrop.classList.add('is-open');
    });
  }

  function closeFolder() {
    if (!folderPanel || !folderBackdrop || folderPanel.hidden) return;

    if (folderTitle) {
      folderTitle.contentEditable = 'false';
      folderTitle.classList.remove('is-editing');
    }

    folderPanel.classList.remove('is-open');
    folderBackdrop.classList.remove('is-open');
    folderPanel.classList.add('is-closing');
    folderBackdrop.classList.add('is-closing');

    clearTimeout(folderCloseTimer);
    folderCloseTimer = window.setTimeout(() => {
      folderPanel.hidden = true;
      folderBackdrop.hidden = true;
      folderPanel.classList.remove('is-closing');
      folderBackdrop.classList.remove('is-closing');
      folderStack = [];
      draggedItem = null;
      document.body.classList.remove('folder-open');
      folderCloseTimer = 0;
    }, 220);
  }

  function startRenameFolder() {
    const folder = currentFolder();
    if (!folder || !folderTitle) return;

    folderTitle.dataset.original = folder.title;
    folderTitle.contentEditable = 'true';
    folderTitle.classList.add('is-editing');
    folderTitle.focus();

    const range = document.createRange();
    range.selectNodeContents(folderTitle);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  function finishRenameFolder(save) {
    if (!folderTitle || folderTitle.contentEditable !== 'true') return;

    const folder = currentFolder();
    const nextTitle = folderTitle.textContent.trim().slice(0, 40);
    folderTitle.contentEditable = 'false';
    folderTitle.classList.remove('is-editing');

    if (!save || !folder) {
      syncFolderTitle();
      return;
    }

    folder.title = nextTitle || t('folders.defaultName');
    saveBookmarks();
    syncFolderTitle();
    render();
  }

  if (folderBackdrop) {
    folderBackdrop.addEventListener('click', closeFolder);
    makeDropTarget(folderBackdrop, (dragged) => {
      moveItemToRoot(dragged.id, dragged.parentId);
    });
  }

  if (folderPanel && folderGrid) {
    folderPanel.tabIndex = -1;
    folderPanel.addEventListener('click', (event) => {
      if (event.target === folderPanel || event.target === folderGrid) closeFolder();
    });
  }

  if (folderTitle) {
    folderTitle.addEventListener('click', () => {
      if (folderTitle.contentEditable !== 'true') startRenameFolder();
    });

    folderTitle.addEventListener('keydown', (event) => {
      if (folderTitle.contentEditable === 'true') {
        if (event.key === 'Enter') {
          event.preventDefault();
          folderTitle.blur();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          finishRenameFolder(false);
        }
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startRenameFolder();
      }
    });

    folderTitle.addEventListener('blur', () => finishRenameFolder(true));
  }

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (folderTitle && folderTitle.contentEditable === 'true') {
      finishRenameFolder(false);
      return;
    }
    if (folderPanel && !folderPanel.hidden) closeFolder();
  });

  window.addEventListener('resize', positionFolderPanel);
  window.addEventListener('scroll', positionFolderPanel, { passive: true });

  if (prevButton) {
    prevButton.addEventListener('click', () => goToPage(currentPage - 1));
  }
  if (nextButton) {
    nextButton.addEventListener('click', () => goToPage(currentPage + 1));
  }

  window.addEventListener('resize', () => syncGridHeight(pageCount()));

  function clearError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.remove('is-visible');
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.classList.add('is-visible');
  }

  function setDialogType(type) {
    dialogType = type === 'folder' ? 'folder' : 'bookmark';

    if (typeGroup) {
      for (const button of typeGroup.querySelectorAll('[data-type]')) {
        button.classList.toggle('is-active', button.dataset.type === dialogType);
      }
    }

    if (urlField) urlField.hidden = dialogType === 'folder';
    if (dialogTitle) {
      dialogTitle.textContent = dialogType === 'folder'
        ? t('bookmarks.newFolder')
        : t('bookmarks.new');
    }

    clearError();
  }

  function openDialog(parentId = null) {
    if (!canAddTo(parentId)) return;

    dialogParentId = parentId;
    setDialogType('bookmark');

    if (nameInput) nameInput.value = '';
    if (urlInput) urlInput.value = '';

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }

    setTimeout(() => nameInput && nameInput.focus(), 40);
  }

  function closeDialog() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  if (typeGroup) {
    for (const button of typeGroup.querySelectorAll('[data-type]')) {
      button.addEventListener('click', () => setDialogType(button.dataset.type));
    }
  }

  if (cancelButton) cancelButton.addEventListener('click', closeDialog);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    if (!canAddTo(dialogParentId)) {
      showError(t('bookmarks.limit'));
      return;
    }

    const titleFromInput = nameInput ? nameInput.value.trim() : '';
    const targetList = listFor(dialogParentId);

    if (dialogType === 'folder') {
      const folder = {
        id: newId('folder'),
        type: 'folder',
        title: (titleFromInput || t('folders.defaultName')).slice(0, 40),
        children: []
      };

      targetList.push(folder);
      saveBookmarks();
      render();
      if (folderStack.length) renderFolder();
      closeDialog();
      return;
    }

    const parsedUrl = normalizeUrl(urlInput ? urlInput.value : '');
    if (!parsedUrl) {
      showError(t('bookmarks.invalidUrl'));
      if (urlInput) urlInput.focus();
      return;
    }

    const title = (titleFromInput || parsedUrl.hostname.replace(/^www\./, '')).slice(0, 40);

    targetList.push({
      id: newId('bm'),
      type: 'bookmark',
      title,
      url: parsedUrl.href,
      icon: ''
    });

    saveBookmarks();

    if (!dialogParentId) {
      currentPage = Math.floor((bookmarks.length - 1) / PER_PAGE);
      render();
    } else {
      render();
      if (folderStack.length) renderFolder();
    }

    closeDialog();
  });

  function collectIds(list, ids) {
    for (const item of list) {
      ids.add(item.id);
      if (item.type === 'folder') collectIds(item.children, ids);
    }
  }

  window.addEventListener('cosmic:restore-bookmarks', () => {
    const existingIds = new Set();
    collectIds(bookmarks, existingIds);

    for (const bookmark of DEFAULT_BOOKMARKS) {
      if (bookmarks.length >= MAX_BOOKMARKS) break;
      if (!existingIds.has(bookmark.id)) {
        bookmarks.push({ ...bookmark });
        existingIds.add(bookmark.id);
      }
    }

    saveBookmarks();
    currentPage = 0;
    render();
  });

  function serializeItem(item) {
    if (item.type === 'folder') {
      return {
        type: 'folder',
        title: item.title,
        children: item.children.map(serializeItem)
      };
    }

    return {
      type: 'bookmark',
      title: item.title,
      url: item.url,
      icon: item.icon || ''
    };
  }

  function exportBookmarks() {
    const payload = {
      app: 'cosmic-new-tab',
      version: 2,
      exportedAt: new Date().toISOString(),
      bookmarks: bookmarks.map(serializeItem)
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = objectUrl;
    link.download = 'cosmic-bookmarks.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);

    window.dispatchEvent(new CustomEvent('cosmic:bookmarks-exported', {
      detail: { count: bookmarks.length }
    }));
  }

  function collectUrls(list, urls) {
    for (const item of list) {
      if (item.type === 'folder') collectUrls(item.children, urls);
      else urls.add(item.url);
    }
  }

  function regenerateIds(list) {
    for (const item of list) {
      item.id = newId(item.type === 'folder' ? 'folder' : 'bm');
      if (item.type === 'folder') regenerateIds(item.children);
    }
  }

  async function importBookmarks(file) {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const list = Array.isArray(parsed)
      ? parsed
      : (parsed && Array.isArray(parsed.bookmarks) ? parsed.bookmarks : null);

    if (!list) throw new Error('invalid-import');

    const existingUrls = new Set();
    collectUrls(bookmarks, existingUrls);
    let added = 0;

    for (const raw of sanitizeList(list)) {
      if (bookmarks.length >= MAX_BOOKMARKS) break;

      if (raw.type === 'bookmark' && existingUrls.has(raw.url)) continue;

      regenerateIds([raw]);
      bookmarks.push(raw);
      collectUrls([raw], existingUrls);
      added += 1;
    }

    if (added > 0) {
      saveBookmarks();
      currentPage = Math.floor((bookmarks.length - 1) / PER_PAGE);
      render();
    }

    return added;
  }

  window.addEventListener('cosmic:export-bookmarks', exportBookmarks);

  if (importInput) {
    importInput.addEventListener('change', async () => {
      const file = importInput.files && importInput.files[0];
      if (!file) return;

      try {
        const added = await importBookmarks(file);
        window.dispatchEvent(new CustomEvent('cosmic:bookmarks-imported', {
          detail: { added }
        }));
      } catch {
        window.dispatchEvent(new CustomEvent('cosmic:bookmarks-import-error'));
      } finally {
        importInput.value = '';
      }
    });
  }

  window.addEventListener('cosmic:locale', () => {
    render();
    if (folderStack.length) renderFolder();
  });

  render();
})();

(function initWeather() {
  const widget = document.getElementById('weather-widget');
  const iconEl = document.getElementById('weather-icon');
  const tempEl = document.getElementById('weather-temp');
  const rangeEl = document.getElementById('weather-range');
  const cityEl = document.getElementById('weather-city');
  const conditionEl = document.getElementById('weather-condition');

  if (!widget || !iconEl || !tempEl || !rangeEl || !cityEl || !conditionEl) return;

  const REFRESH_INTERVAL = 15 * 60 * 1000;

  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>',
    partly: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8.5" r="3.1"/><path d="M9 2.3v1.7M2.3 8.5h1.7M3.8 3.3l1.2 1.2M14.2 3.3l-1.2 1.2"/><path d="M8.4 20h9.1a3.8 3.8 0 0 0 .5-7.57 5.7 5.7 0 0 0-10.9 1.1A3.1 3.1 0 0 0 8.4 20Z"/></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 11.5 3.25 3.25 0 0 0 7 18Z"/></svg>',
    fog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 8h11M7 12h13M4 16h12"/></svg>',
    rain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16h10a3.8 3.8 0 0 0 .5-7.57A5.7 5.7 0 0 0 6.1 9.5 3.1 3.1 0 0 0 7 16Z"/><path d="M8 19v2M12 18v3M16 19v2"/></svg>',
    snow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16h10a3.8 3.8 0 0 0 .5-7.57A5.7 5.7 0 0 0 6.1 9.5 3.1 3.1 0 0 0 7 16Z"/><path d="M8.5 19.5h.01M12 21h.01M15.5 19.5h.01"/></svg>',
    storm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 15h10a3.8 3.8 0 0 0 .5-7.57A5.7 5.7 0 0 0 6.1 8.5 3.1 3.1 0 0 0 7 15Z"/><path d="m13 15-2.2 4h3.2l-1.8 3.5"/></svg>'
  };

  const CONDITIONS = [
    [[0], 'clear'],
    [[1], 'mostlyClear'],
    [[2], 'partlyCloudy'],
    [[3], 'overcast'],
    [[45, 48], 'fog'],
    [[51, 53, 55], 'drizzle'],
    [[56, 57], 'freezingDrizzle'],
    [[61, 63, 65], 'rain'],
    [[66, 67], 'freezingRain'],
    [[71, 73, 75], 'snow'],
    [[77], 'snowGrains'],
    [[80, 81, 82], 'showers'],
    [[85, 86], 'snowShowers'],
    [[95, 96, 99], 'thunderstorm']
  ];

  let lastSnapshot = null;
  let weatherStatus = 'idle';
  let currentCityId = '';
  let currentUnit = '';
  let lastFetch = 0;
  let requestToken = 0;
  let hideTimer = 0;
  let refreshTimer = 0;

  function conditionKey(code) {
    for (const [codes, key] of CONDITIONS) {
      if (codes.includes(code)) return key;
    }
    return 'cloudy';
  }

  function wwConditionKey(code) {
    if (code === 113) return 'clear';
    if (code === 116) return 'partlyCloudy';
    if (code === 119) return 'cloudy';
    if (code === 122) return 'overcast';
    if ([143, 248, 260].includes(code)) return 'fog';
    if ([200, 386, 389, 392, 395].includes(code)) return 'thunderstorm';
    if ([227, 230, 323, 326, 329, 332, 335, 338, 350, 371, 374, 377].includes(code)) return 'snow';
    if ([179, 362, 365, 368].includes(code)) return 'snowShowers';
    if ([176, 353, 356, 359].includes(code)) return 'showers';
    if ([263, 266].includes(code)) return 'drizzle';
    if ([185, 281, 284].includes(code)) return 'freezingDrizzle';
    if ([311, 314, 317, 320].includes(code)) return 'freezingRain';
    if ([293, 296, 299, 302, 305, 308].includes(code)) return 'rain';
    return 'cloudy';
  }

  function iconForCondition(condition, isDay) {
    if (condition === 'clear') return isDay ? ICONS.sun : ICONS.moon;
    if (condition === 'mostlyClear' || condition === 'partlyCloudy') return ICONS.partly;
    if (condition === 'overcast' || condition === 'cloudy') return ICONS.cloud;
    if (condition === 'fog') return ICONS.fog;
    if (condition === 'snow' || condition === 'snowGrains' || condition === 'snowShowers') return ICONS.snow;
    if (condition === 'thunderstorm') return ICONS.storm;
    if (
      condition === 'drizzle' ||
      condition === 'freezingDrizzle' ||
      condition === 'rain' ||
      condition === 'freezingRain' ||
      condition === 'showers'
    ) return ICONS.rain;
    return ICONS.cloud;
  }

  function setWeatherIcon(markup) {
    try {
      const source = markup.includes('xmlns=')
        ? markup
        : markup.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');

      const parsed = new DOMParser().parseFromString(source, 'image/svg+xml');
      const svg = parsed.documentElement;
      if (svg && svg.nodeName.toLowerCase() === 'svg') {
        iconEl.replaceChildren(document.importNode(svg, true));
        return;
      }
    } catch {
       
    }
    iconEl.textContent = '';
  }

  function showWidget() {
    clearTimeout(hideTimer);

    if (widget.hidden) {
      widget.hidden = false;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => widget.classList.add('is-visible'));
      });
    } else {
      widget.classList.add('is-visible');
    }
  }

  function hideWidget() {
    widget.classList.remove('is-visible');
    clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      if (!Settings.data.weather.enabled) widget.hidden = true;
    }, 450);
  }

  function widgetCityName(cityId) {
    return cityLabel(cityById(cityId), Settings.data.language);
  }

  function setLoading(cityId) {
    weatherStatus = 'loading';
    cityEl.textContent = widgetCityName(cityId);
    conditionEl.textContent = t('weather.loading');
    tempEl.textContent = '—';
    rangeEl.textContent = '';
    iconEl.classList.remove('is-sunny', 'is-snow');
    setWeatherIcon(ICONS.cloud);
    widget.title = `${widgetCityName(cityId)} · ${t('weather.loading')}`;
  }

  function setError(cityId) {
    weatherStatus = 'error';
    lastSnapshot = null;
    cityEl.textContent = widgetCityName(cityId);
    conditionEl.textContent = t('weather.unavailableRetry');
    tempEl.textContent = '—';
    rangeEl.textContent = '';
    iconEl.classList.remove('is-sunny', 'is-snow');
    setWeatherIcon(ICONS.cloud);
    widget.title = `${widgetCityName(cityId)} · ${t('weather.refresh')}`;
  }

  function renderSnapshot(snapshot) {
    lastSnapshot = snapshot;
    weatherStatus = 'ready';

    const language = Settings.data.language;
    const cityName = cityLabel(cityById(snapshot.cityId), language);
    const unitLabel = snapshot.unit === 'fahrenheit' ? 'F' : 'C';

    cityEl.textContent = cityName;
    tempEl.textContent = `${Math.round(snapshot.temperature)}°${unitLabel}`;

    if (Number.isFinite(snapshot.max) && Number.isFinite(snapshot.min)) {
      rangeEl.textContent = `${Math.round(snapshot.max)}° / ${Math.round(snapshot.min)}°`;
    } else {
      rangeEl.textContent = '';
    }

    const condition = snapshot.condition;
    conditionEl.textContent = t(`weather.cond.${condition}`);
    iconEl.classList.toggle('is-sunny', condition === 'clear' && snapshot.isDay);
    iconEl.classList.toggle(
      'is-snow',
      condition === 'snow' || condition === 'snowGrains' || condition === 'snowShowers'
    );
    setWeatherIcon(iconForCondition(condition, snapshot.isDay));

    widget.title = `${cityName} · ${t('weather.updated', { time: snapshot.time })} · ${t('weather.refresh')}`;
  }

  function nowTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  async function fetchJson(url, timeoutMs) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal, cache: 'no-store' });
      if (!response.ok) throw new Error('provider-http');
      return await response.json();
    } finally {
      clearTimeout(timeout);
    }
  }

  async function snapshotFromWttr(city, unit) {
    const data = await fetchJson(`https://wttr.in/${city.lat},${city.lon}?format=j1`, 7000);
    const current = data && Array.isArray(data.current_condition)
      ? data.current_condition[0]
      : null;

    if (!current) throw new Error('provider-empty');

    const temperature = unit === 'fahrenheit'
      ? Number(current.temp_F)
      : Number(current.temp_C);

    if (!Number.isFinite(temperature)) throw new Error('provider-empty');

    const day = data.weather && data.weather[0] ? data.weather[0] : {};
    const max = unit === 'fahrenheit' ? Number(day.maxtempF) : Number(day.maxtempC);
    const min = unit === 'fahrenheit' ? Number(day.mintempF) : Number(day.mintempC);
    const code = Number(current.weatherCode) || 0;
    const hour = new Date().getHours();

    return {
      cityId: city.id,
      unit,
      condition: wwConditionKey(code),
      temperature,
      max: Number.isFinite(max) ? max : null,
      min: Number.isFinite(min) ? min : null,
      isDay: hour >= 6 && hour < 18,
      time: nowTime()
    };
  }

  async function snapshotFromOpenMeteo(city, unit) {
    const unitParam = unit === 'fahrenheit' ? '&temperature_unit=fahrenheit' : '';
    const data = await fetchJson(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}` +
      `&current=temperature_2m,weather_code,is_day` +
      `&daily=temperature_2m_max,temperature_2m_min` +
      `&timezone=auto&forecast_days=1${unitParam}`,
      8000
    );

    const current = data && data.current;
    if (!current || !Number.isFinite(current.temperature_2m)) {
      throw new Error('provider-empty');
    }

    const daily = data.daily || {};
    const code = Number(current.weather_code) || 0;

    return {
      cityId: city.id,
      unit,
      condition: conditionKey(code),
      temperature: current.temperature_2m,
      max: Array.isArray(daily.temperature_2m_max) ? daily.temperature_2m_max[0] : null,
      min: Array.isArray(daily.temperature_2m_min) ? daily.temperature_2m_min[0] : null,
      isDay: current.is_day !== 0,
      time: nowTime()
    };
  }

  async function loadWeather() {
    const settings = Settings.data.weather;

    if (!settings.enabled) {
      hideWidget();
      return;
    }

    showWidget();

    const token = ++requestToken;
    const city = cityById(settings.cityId) || cityById(DEFAULT_CITY_ID);
    const unit = settings.unit === 'fahrenheit' ? 'fahrenheit' : 'celsius';

    setLoading(city.id);

    let snapshot = null;

    try {
      snapshot = await snapshotFromWttr(city, unit);
    } catch {
      snapshot = null;
    }

    if (token !== requestToken) return;

    if (!snapshot) {
      try {
        snapshot = await snapshotFromOpenMeteo(city, unit);
      } catch {
        snapshot = null;
      }
    }

    if (token !== requestToken) return;

    if (!snapshot) {
      setError(city.id);
      return;
    }

    currentCityId = city.id;
    currentUnit = unit;
    lastFetch = Date.now();
    renderSnapshot(snapshot);
  }

  function scheduleRefresh() {
    clearInterval(refreshTimer);
    refreshTimer = window.setInterval(() => {
      if (!document.hidden && Settings.data.weather.enabled) loadWeather();
    }, REFRESH_INTERVAL);
  }

  Settings.subscribe((settings) => {
    const weather = settings.weather;

    if (!weather.enabled) {
      hideWidget();
      return;
    }

    showWidget();

    if (
      weather.cityId !== currentCityId ||
      weather.unit !== currentUnit ||
      Date.now() - lastFetch > REFRESH_INTERVAL
    ) {
      loadWeather();
    }
  });

  window.addEventListener('cosmic:locale', () => {
    if (!Settings.data.weather.enabled) return;

    const city = cityById(Settings.data.weather.cityId) || cityById(DEFAULT_CITY_ID);

    if (weatherStatus === 'ready' && lastSnapshot) {
      renderSnapshot(lastSnapshot);
    } else if (weatherStatus === 'error') {
      setError(city.id);
    } else {
      setLoading(city.id);
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (
      !document.hidden &&
      Settings.data.weather.enabled &&
      Date.now() - lastFetch > REFRESH_INTERVAL
    ) {
      loadWeather();
    }
  });

  function retryWeather() {
    if (!Settings.data.weather.enabled) return;
    loadWeather();
  }

  widget.addEventListener('click', retryWeather);
  widget.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      retryWeather();
    }
  });

  scheduleRefresh();
})();

 
(function initMediaPlayer() {
  const player = document.getElementById('media-player');
  const cover = document.getElementById('player-cover');
  const art = document.getElementById('player-art');
  const titleEl = document.getElementById('player-title');
  const sourceEl = document.getElementById('player-source');
  const artistEl = document.getElementById('player-artist');
  const currentEl = document.getElementById('player-current');
  const durationEl = document.getElementById('player-duration');
  const progressEl = document.getElementById('player-progress');
  const prevButton = document.getElementById('player-prev');
  const playButton = document.getElementById('player-play');
  const nextButton = document.getElementById('player-next');

  if (!player || !cover || !art || !titleEl || !sourceEl || !artistEl ||
      !currentEl || !durationEl || !progressEl) {
    return;
  }

   
  const extensionApi = typeof browser !== 'undefined'
    ? browser
    : (typeof chrome !== 'undefined' ? chrome : null);
  const isFirefoxExtension = typeof browser !== 'undefined';
  const tabsApi = extensionApi && extensionApi.tabs ? extensionApi.tabs : null;
  const scriptingApi = extensionApi && extensionApi.scripting ? extensionApi.scripting : null;

  function callExtensionApi(api, method, ...args) {
    if (!api || typeof api[method] !== 'function') {
      return Promise.reject(new Error('API unavailable'));
    }

    if (isFirefoxExtension) {
      return api[method](...args);
    }

    return new Promise((resolve, reject) => {
      try {
        api[method](...args, (result) => {
          const error = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.lastError;
          if (error) reject(new Error(error.message || String(error)));
          else resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  const SOURCE_NAMES = {
    'youtube.com': 'YouTube',
    'music.youtube.com': 'YouTube Music',
    'soundcloud.com': 'SoundCloud',
    'open.spotify.com': 'Spotify',
    'music.yandex.ru': 'Yandex Music',
    'music.yandex.com': 'Yandex Music',
    'music.yandex.kz': 'Yandex Music',
    'deezer.com': 'Deezer',
    'tidal.com': 'TIDAL',
    'bandcamp.com': 'Bandcamp',
    'vk.com': 'VK',
    'vkvideo.ru': 'VK Видео',
    'rutube.ru': 'RUTUBE'
  };

  const TITLE_SUFFIXES = [
    ' - YouTube Music', ' - YouTube', ' | Spotify', ' - Spotify',
    ' on SoundCloud', ' - SoundCloud', ' — Yandex Music', ' - Yandex Music',
    ' | Yandex Music', ' - Deezer', ' | TIDAL', ' - Bandcamp', ' - VK'
  ];

  const state = {
    title: '',
    source: '',
    artist: '',
    artwork: '',
    isFavicon: false,
    mode: '',         
    tabId: null,
    position: null,
    duration: null,
    playing: true
  };

  let visible = false;
  let hideTimer = 0;
  let progressTimer = 0;
  let refreshTimer = 0;
  let requestToken = 0;
  let artworkToken = 0;
  let seeking = false;
  let tabSyncBusy = false;
  let lastTabSync = 0;

   

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '--:--';

    const total = Math.floor(seconds);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;

    const mm = String(minutes).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');

    return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  function sourceFor(url) {
    let host = '';
    try {
      host = new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return t('player.browser');
    }

    if (SOURCE_NAMES[host]) return SOURCE_NAMES[host];

    for (const domain of Object.keys(SOURCE_NAMES)) {
      if (host.endsWith(`.${domain}`)) return SOURCE_NAMES[domain];
    }

    return host;
  }

  function cleanTitle(rawTitle, source) {
    let title = String(rawTitle || '').trim();
    if (!title) return source;

    let lower = title.toLowerCase();
    for (const rawSuffix of TITLE_SUFFIXES) {
      const suffix = rawSuffix.toLowerCase();
      if (lower.endsWith(suffix)) {
        title = title.slice(0, -rawSuffix.length).trim();
        lower = title.toLowerCase();
        break;
      }
    }

    return title || source;
  }

   

   
  function readPlayingMediaInTab() {
    let metadata = null;
    let media = null;
    let title = '';
    let artist = '';
    let artwork = '';
    let position = null;
    let duration = null;
    let playbackState = 'none';

    try {
      playbackState = navigator.mediaSession
        ? (navigator.mediaSession.playbackState || 'none')
        : 'none';
    } catch {
      playbackState = 'none';
    }

    try {
      metadata = (navigator.mediaSession && navigator.mediaSession.metadata) || null;
    } catch {
      metadata = null;
    }

    try {
      const mediaList = Array.from(document.querySelectorAll('video, audio'));
      media = mediaList.find((element) => !element.paused && !element.ended) ||
        mediaList.find((element) =>
          element.readyState >= 2 && Number.isFinite(element.duration) && element.duration > 0) ||
        mediaList[0] ||
        null;
    } catch {
      media = null;
    }

    try {
      title = document.title || '';
    } catch {
      title = '';
    }

    try {
      if (metadata) {
        title = metadata.title || title;
        artist = metadata.artist || '';

        const artworkList = metadata.artwork || [];
        if (artworkList.length) {
          const lastArtwork = artworkList[artworkList.length - 1];
          artwork = lastArtwork && typeof lastArtwork.src === 'string'
            ? lastArtwork.src
            : '';
        }
      }
    } catch {
       
       
    }

    try {
      if (media) {
        if (Number.isFinite(media.currentTime)) position = media.currentTime;
        if (Number.isFinite(media.duration)) duration = media.duration;
      }
    } catch {
      position = null;
      duration = null;
    }

    return {
      title,
      artist,
      artwork,
      position,
      duration,
      playing: media ? (!media.paused && !media.ended) : playbackState === 'playing'
    };
  }

   
  function pickMediaResult(results) {
    if (!Array.isArray(results)) return null;

    let best = null;
    let bestScore = -1;

    for (const entry of results) {
      if (!entry || entry.error || !entry.result) continue;

      const media = entry.result;
      let score = 0;
      if (media.playing) score += 6;
      if (Number.isFinite(media.duration)) score += 8;
      if (Number.isFinite(media.position)) score += 4;
      if (media.title) score += 2;
      if (media.artist) score += 1;

      if (score > bestScore) {
        bestScore = score;
        best = media;
      }
    }

    return best;
  }

  async function readTabMedia(tabId) {
    if (!scriptingApi || tabId === undefined || tabId === null) return null;

    try {
      const results = await callExtensionApi(scriptingApi, 'executeScript', {
        target: { tabId },
        func: readPlayingMediaInTab
      });

      let media = pickMediaResult(results);

       
       
      if (!media || !Number.isFinite(media.duration)) {
        try {
          const allFramesResults = await callExtensionApi(scriptingApi, 'executeScript', {
            target: { tabId, allFrames: true },
            func: readPlayingMediaInTab
          });
          const candidate = pickMediaResult(allFramesResults);
          if (candidate && Number.isFinite(candidate.duration)) media = candidate;
          else if (!media) media = candidate;
        } catch {
           
        }
      }

      return media;
    } catch {
       
      return null;
    }
  }

  function dataFromTab(tab, media) {
    const source = sourceFor(tab.url);
    const tabTitle = cleanTitle(tab.title, source);

     
     
    if (media) {
       
      const rawArtwork = typeof media.artwork === 'string' ? media.artwork : '';
      const usableArtwork = rawArtwork && !rawArtwork.startsWith('blob:');
      const mediaTitle = media.title ? cleanTitle(media.title, source) : '';

      return {
        title: mediaTitle || tabTitle,
        source,
        artist: media.artist || '',
        artwork: usableArtwork ? rawArtwork : (tab.favIconUrl || ''),
        isFavicon: !usableArtwork,
        mode: 'tab',
        tabId: tab.id,
        position: Number.isFinite(media.position) ? media.position : null,
        duration: Number.isFinite(media.duration) ? media.duration : null,
        playing: media.playing !== false
      };
    }

    return {
      title: tabTitle,
      source,
      artist: '',
      artwork: tab.favIconUrl || '',
      isFavicon: true,
      mode: 'tab',
      tabId: tab.id,
      position: null,
      duration: null,
      playing: true
    };
  }

   

  function getPageMediaElement() {
    return Array.from(document.querySelectorAll('audio, video'))
      .find((element) => !element.paused && !element.ended && element.readyState >= 2) || null;
  }

  function readPageMedia() {
    if (!('mediaSession' in navigator)) return null;

    const session = navigator.mediaSession;
    const metadata = session.metadata || null;
    const mediaElement = getPageMediaElement() ||
      document.querySelector('audio, video') ||
      null;

    if (!mediaElement && !metadata) return null;

    const isPlaying = Boolean(mediaElement) && !mediaElement.paused && !mediaElement.ended;

    const artworkEntry = metadata && Array.isArray(metadata.artwork) && metadata.artwork.length
      ? metadata.artwork[metadata.artwork.length - 1]
      : null;

    return {
      title: (metadata && metadata.title) || document.title || t('player.untitled'),
      artist: (metadata && metadata.artist) || '',
      source: (metadata && metadata.album) || t('player.thisBrowser'),
      artwork: artworkEntry ? artworkEntry.src : '',
      isFavicon: false,
      mode: 'page',
      tabId: null,
      position: mediaElement && Number.isFinite(mediaElement.currentTime)
        ? mediaElement.currentTime
        : null,
      duration: mediaElement && Number.isFinite(mediaElement.duration)
        ? mediaElement.duration
        : null,
      playing: isPlaying
    };
  }

   

  function setArtwork(url, isFavicon) {
    const token = ++artworkToken;

    if (!url) {
      cover.classList.remove('has-art', 'is-favicon');
      art.removeAttribute('src');
      return;
    }

    art.onload = () => {
      if (token !== artworkToken) return;
      cover.classList.add('has-art');
      cover.classList.toggle('is-favicon', Boolean(isFavicon));
    };

    art.onerror = () => {
      if (token !== artworkToken) return;
      cover.classList.remove('has-art', 'is-favicon');
      art.removeAttribute('src');
    };

    art.src = url;

     
    if (art.complete && art.naturalWidth > 0) {
      cover.classList.add('has-art');
      cover.classList.toggle('is-favicon', Boolean(isFavicon));
    }
  }

  function renderTimeline(position, duration, canSeek) {
    const hasDuration = Number.isFinite(duration) && duration > 0;
    const seekable = hasDuration && Boolean(canSeek);

    progressEl.classList.toggle('is-seekable', seekable);
    progressEl.setAttribute('aria-disabled', String(!seekable));
    progressEl.setAttribute('tabindex', seekable ? '0' : '-1');

    if (hasDuration) {
      const safePosition = Number.isFinite(position) ? position : 0;
      const ratio = Math.max(0, Math.min(1, safePosition / duration));

      progressEl.style.setProperty('--p', ratio.toFixed(4));
      progressEl.classList.remove('is-indeterminate');
      currentEl.textContent = formatTime(safePosition);
      durationEl.textContent = formatTime(duration);
      progressEl.setAttribute('aria-valuenow', String(Math.round(ratio * 100)));
      progressEl.setAttribute('aria-valuetext',
        `${currentEl.textContent} ${t('player.of')} ${durationEl.textContent}`);
      return;
    }

    progressEl.classList.remove('is-seekable');
    progressEl.classList.add('is-indeterminate');
    progressEl.style.setProperty('--p', '0');
    currentEl.textContent = Number.isFinite(position) && position >= 0
      ? formatTime(position)
      : '00:00';
    durationEl.textContent = '--:--';
    progressEl.setAttribute('aria-valuenow', '0');
    progressEl.setAttribute('aria-valuetext', t('player.noSeek'));
  }

  function updatePlayLabel() {
    if (!playButton) return;

    const label = state.playing ? t('player.pauseAction') : t('player.playAction');
    playButton.title = label;
    playButton.setAttribute('aria-label', label);
  }

  function setPlaying(playing) {
    state.playing = playing !== false;
    player.classList.toggle('is-paused', !state.playing);
    updatePlayLabel();
  }

  function apply(data) {
    if (!data) return;

    const title = data.title || t('player.untitled');
    const source = data.source || t('player.browser');
    const artist = data.artist || t('player.playing');
    const canSeek = Number.isFinite(data.duration) && data.duration > 0 &&
      (data.mode === 'page' || (data.tabId !== undefined && data.tabId !== null));

    if (state.title !== title) {
      titleEl.textContent = title;
      titleEl.title = title;
    }
    if (state.source !== source) sourceEl.textContent = source;
    if (state.artist !== artist) artistEl.textContent = artist;

    if (state.artwork !== data.artwork || state.isFavicon !== data.isFavicon) {
      setArtwork(data.artwork, data.isFavicon);
    }

    renderTimeline(data.position, data.duration, canSeek);
    setPlaying(data.playing !== false);

    state.title = title;
    state.source = source;
    state.artist = artist;
    state.artwork = data.artwork || '';
    state.isFavicon = Boolean(data.isFavicon);
    state.mode = data.mode;
    state.tabId = data.tabId === undefined ? null : data.tabId;
    state.position = Number.isFinite(data.position) ? data.position : null;
    state.duration = Number.isFinite(data.duration) ? data.duration : null;
  }

  function controlMediaInTab(action) {
    const mediaList = Array.from(document.querySelectorAll('video, audio'));
    const media = mediaList.find((element) => !element.paused && !element.ended) ||
      mediaList.find((element) => element.readyState >= 2) ||
      mediaList[0] ||
      null;

    if (action === 'play' || action === 'pause') {
      if (!media) return false;

      if (action === 'pause') {
        if (!media.paused) media.pause();
        return true;
      }

      if (media.paused) {
        const result = media.play();
        if (result && typeof result.catch === 'function') result.catch(() => {});
      }

      return true;
    }

    const key = action === 'next' ? 'MediaTrackNext' : 'MediaTrackPrevious';

    try {
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key,
        code: key,
        bubbles: true,
        cancelable: true
      }));
      document.dispatchEvent(new KeyboardEvent('keyup', {
        key,
        code: key,
        bubbles: true,
        cancelable: true
      }));
    } catch {
       
    }

    const selectors = action === 'next'
      ? [
        '.ytp-next-button',
        '#next-button',
        '[data-testid="control-button-skip-forward"]',
        '.playControls__next',
        'button[aria-label*="next" i]',
        '[role="button"][aria-label*="next" i]',
        'button[title*="next" i]',
        '[data-testid*="next" i]',
        'button[aria-label*="след" i]',
        'button[title*="след" i]'
      ]
      : [
        '.ytp-prev-button',
        '#previous-button',
        '[data-testid="control-button-skip-back"]',
        '.playControls__prev',
        'button[aria-label*="previous" i]',
        '[role="button"][aria-label*="previous" i]',
        'button[title*="previous" i]',
        'button[aria-label*="prev" i]',
        '[data-testid*="previous" i]',
        'button[aria-label*="пред" i]',
        'button[title*="пред" i]'
      ];

    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element && typeof element.click === 'function') {
        element.click();
        return true;
      }
    }

    return false;
  }

  function controlPageMedia(action) {
    const media = getPageMediaElement() || document.querySelector('audio, video');
    if (!media) return false;

    if (action === 'pause') {
      if (!media.paused) media.pause();
      return true;
    }

    if (action === 'play') {
      if (media.paused) {
        const result = media.play();
        if (result && typeof result.catch === 'function') result.catch(() => {});
      }
      return true;
    }

    return false;
  }

  async function sendControl(action) {
    let handled = false;

    if (state.mode === 'tab' && state.tabId !== null && scriptingApi) {
      try {
        const results = await callExtensionApi(scriptingApi, 'executeScript', {
          target: { tabId: state.tabId },
          func: controlMediaInTab,
          args: [action]
        });

        handled = Array.isArray(results) &&
          results.some((result) => result && result.result === true);
      } catch {
         
      }
    } else if (state.mode === 'page') {
      handled = controlPageMedia(action);
    }

    if (action === 'pause' || action === 'play') {
      if (handled || state.mode === 'tab') setPlaying(action === 'play');
      window.setTimeout(() => {
        if (!document.hidden) refresh();
      }, 350);
    } else {
      window.setTimeout(() => {
        if (!document.hidden) refresh();
      }, 450);
    }
  }

  if (prevButton) {
    prevButton.addEventListener('click', (event) => {
      event.stopPropagation();
      void sendControl('prev');
    });
  }

  if (playButton) {
    playButton.addEventListener('click', (event) => {
      event.stopPropagation();
      void sendControl(state.playing ? 'pause' : 'play');
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', (event) => {
      event.stopPropagation();
      void sendControl('next');
    });
  }

   

  function startProgressTicker() {
    if (progressTimer) return;

    progressTimer = window.setInterval(async () => {
      if (!visible || seeking) return;

       
      if (state.mode === 'page') {
        const pageData = readPageMedia();
        if (pageData) apply(pageData);
        return;
      }

       
      if (state.mode !== 'tab' || state.tabId === null || tabSyncBusy) return;

      const now = Date.now();
      const minInterval = Number.isFinite(state.duration) ? 900 : 3000;
      if (now - lastTabSync < minInterval) return;
      lastTabSync = now;
      tabSyncBusy = true;

      try {
        const media = await readTabMedia(state.tabId);
        if (!media || !visible || seeking) return;

        apply(tabProgressData(media));
      } finally {
        tabSyncBusy = false;
      }
    }, 500);
  }

  function stopProgressTicker() {
    clearInterval(progressTimer);
    progressTimer = 0;
  }

   

  function canSeekCurrent() {
    return Number.isFinite(state.duration) && state.duration > 0 &&
      (state.mode === 'page' || state.tabId !== null);
  }

  function tabProgressData(media) {
    const usableArtwork = typeof media.artwork === 'string' &&
      media.artwork && !media.artwork.startsWith('blob:');

    return {
      title: media.title ? cleanTitle(media.title, state.source) : state.title,
      source: state.source,
      artist: media.artist || '',
      artwork: usableArtwork ? media.artwork : state.artwork,
      isFavicon: usableArtwork ? false : state.isFavicon,
      mode: 'tab',
      tabId: state.tabId,
      position: Number.isFinite(media.position) ? media.position : state.position,
      duration: Number.isFinite(media.duration) ? media.duration : state.duration,
      playing: media.playing !== false
    };
  }

  async function seekTabMedia(tabId, ratio) {
    if (!scriptingApi || tabId === null) return;

    try {
      await callExtensionApi(scriptingApi, 'executeScript', {
        target: { tabId },
        func: (value) => {
          const media = Array.from(document.querySelectorAll('video, audio'))
            .find((element) => !element.paused && !element.ended) ||
            document.querySelector('video, audio');

          if (!media || !Number.isFinite(media.duration) || media.duration <= 0) {
            return false;
          }

          media.currentTime = Math.max(
            0,
            Math.min(media.duration - 0.25, value * media.duration)
          );
          return true;
        },
        args: [ratio]
      });

      lastTabSync = 0;  
    } catch {
       
    }
  }

  function previewSeek(ratio, commit) {
    if (!canSeekCurrent()) return;

    const position = Math.max(0, Math.min(state.duration, ratio * state.duration));

    state.position = position;
    renderTimeline(position, state.duration, true);

    if (!commit) return;

    if (state.mode === 'page') {
      const media = getPageMediaElement();
      if (media) {
        try {
          media.currentTime = position;
        } catch {
           
        }
      }
      return;
    }

    if (state.tabId !== null) seekTabMedia(state.tabId, ratio);
  }

  function ratioFromSeekEvent(event) {
    const rect = progressEl.getBoundingClientRect();
    if (!rect.width) return 0;
    return Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
  }

  progressEl.addEventListener('pointerdown', (event) => {
    if (!canSeekCurrent()) return;

    event.preventDefault();
    seeking = true;
    try {
      progressEl.setPointerCapture(event.pointerId);
    } catch {
       
    }
    previewSeek(ratioFromSeekEvent(event), state.mode === 'page');
  });

  progressEl.addEventListener('pointermove', (event) => {
    if (!seeking) return;
    event.preventDefault();
    previewSeek(ratioFromSeekEvent(event), state.mode === 'page');
  });

  function finishSeek(event) {
    if (!seeking) return;

    const ratio = ratioFromSeekEvent(event);
    seeking = false;

    if (progressEl.hasPointerCapture(event.pointerId)) {
      try {
        progressEl.releasePointerCapture(event.pointerId);
      } catch {
         
      }
    }

    previewSeek(ratio, true);
  }

  progressEl.addEventListener('pointerup', finishSeek);
  progressEl.addEventListener('pointercancel', finishSeek);

  progressEl.addEventListener('keydown', (event) => {
    if (!canSeekCurrent()) return;

    const step = event.shiftKey ? 10 : 5;

    if (event.key === 'Home') {
      event.preventDefault();
      previewSeek(0, true);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      previewSeek(1, true);
      return;
    }

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? step : -step;
    const base = Number.isFinite(state.position) ? state.position : 0;
    previewSeek(Math.max(0, Math.min(1, (base + delta) / state.duration)), true);
  });

  function show() {
    clearTimeout(hideTimer);
    if (visible) return;

    visible = true;
    player.hidden = false;
    player.setAttribute('aria-hidden', 'false');

     
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (visible) player.classList.add('is-visible');
      });
    });

    startProgressTicker();
  }

  function hide() {
    if (!visible) return;

    visible = false;
    stopProgressTicker();
    player.classList.remove('is-visible');
    player.setAttribute('aria-hidden', 'true');

    clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      if (!visible) player.hidden = true;
    }, 520);
  }

   

  async function refresh() {
    if (document.hidden || seeking) return;

    const token = ++requestToken;

     
    let data = readPageMedia();

     
    if (!data && tabsApi && typeof tabsApi.query === 'function') {
      try {
        const tabs = await callExtensionApi(tabsApi, 'query', {});
        if (token !== requestToken) return;

        const audibleTabs = (tabs || []).filter((tab) =>
          tab && tab.audible && !(tab.mutedInfo && tab.mutedInfo.muted)
        );

        if (audibleTabs.length) {
          const tab =
            audibleTabs.find((item) => item.active) ||
            audibleTabs.find((item) => item.title) ||
            audibleTabs[0];

           
          const media = await readTabMedia(tab.id);
          if (token !== requestToken) return;

          data = dataFromTab(tab, media);
        }
      } catch {
         
      }
    }

    if (token !== requestToken) return;

    if (!data && state.mode === 'tab' && state.tabId !== null && !state.playing) {
      try {
        const media = await readTabMedia(state.tabId);
        if (token !== requestToken) return;
        if (media) data = tabProgressData(media);
      } catch {
         
      }
    }

    if (!data) {
      hide();
      return;
    }

    apply(data);
    show();
  }

  function scheduleRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(refresh, 200);
  }

  if (tabsApi) {
    for (const eventName of ['onUpdated', 'onRemoved', 'onActivated']) {
      const event = tabsApi[eventName];
      if (event && typeof event.addListener === 'function') {
        event.addListener(scheduleRefresh);
      }
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refresh();
  });

   
   
  window.setInterval(() => {
    if (!document.hidden) refresh();
  }, 1500);

  window.addEventListener('cosmic:locale', () => {
    updatePlayLabel();
    if (!visible) return;

    const oldTitles = [I18N.ru['player.untitled'], I18N.en['player.untitled']];
    if (oldTitles.includes(state.title)) {
      state.title = t('player.untitled');
      titleEl.textContent = state.title;
    }

    const oldArtists = [I18N.ru['player.playing'], I18N.en['player.playing']];
    if (oldArtists.includes(state.artist)) {
      state.artist = t('player.playing');
      artistEl.textContent = state.artist;
    }

    if ([I18N.ru['player.browser'], I18N.en['player.browser']].includes(state.source)) {
      state.source = t('player.browser');
      sourceEl.textContent = state.source;
    } else if ([I18N.ru['player.thisBrowser'], I18N.en['player.thisBrowser']].includes(state.source)) {
      state.source = t('player.thisBrowser');
      sourceEl.textContent = state.source;
    }

    if (Number.isFinite(state.duration)) {
      renderTimeline(state.position, state.duration, canSeekCurrent());
    } else {
      renderTimeline(state.position, state.duration, false);
    }
  });

  updatePlayLabel();
  refresh();
})();

 
(function initSearch() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const toggle = document.getElementById('ai-toggle');
  const historyButton = document.getElementById('ai-history');
  const imagePicker = document.getElementById('image-picker');
  const imageInput = document.getElementById('search-image-input');
  const attachment = document.getElementById('search-attachment');
  const attachmentImg = document.getElementById('search-attachment-img');
  const attachmentName = document.getElementById('search-attachment-name');
  const attachmentReady = document.getElementById('search-attachment-ready');
  const attachmentSend = document.getElementById('search-attachment-send');
  const attachmentRemove = document.getElementById('search-attachment-remove');
  if (!form || !input || !toggle) return;

  let pendingImage = null;
  let pendingImageUrl = '';

  const MODE_KEY = 'cosmic.search.mode.v3';

  let aiMode = false;
  try {
    aiMode = localStorage.getItem(MODE_KEY) === 'ai';
  } catch {
    aiMode = false;
  }

  let engine = SEARCH_ENGINES[Settings.data.searchEngine] || SEARCH_ENGINES.google;

  function applyEngine() {
    engine = SEARCH_ENGINES[Settings.data.searchEngine] || SEARCH_ENGINES.google;
    form.action = engine.url.replace('{q}', '');
    applyMode();
  }

  function applyMode() {
    form.classList.toggle('is-ai', aiMode);
    toggle.setAttribute('aria-pressed', String(aiMode));
    toggle.title = aiMode ? t('search.aiOnTitle') : t('search.aiOffTitle');
    toggle.setAttribute('aria-label', toggle.title);
    input.placeholder = pendingImage
      ? (aiMode ? t('imageSearch.promptPlaceholder') : t('imageSearch.lensReady'))
      : (aiMode
        ? t('search.aiPlaceholder')
        : t('search.placeholder', { engine: t(`searchEngine.${Settings.data.searchEngine}`) }));

    if (attachmentReady) {
      attachmentReady.textContent = aiMode
        ? t('imageSearch.readyAi')
        : t('imageSearch.readyLens');
    }

    if (imagePicker) {
      const imageTitle = aiMode ? t('imageSearch.ai') : t('imageSearch.lens');
      imagePicker.title = imageTitle;
      imagePicker.setAttribute('aria-label', imageTitle);
    }
  }

  function saveMode() {
    try {
      localStorage.setItem(MODE_KEY, aiMode ? 'ai' : 'web');
    } catch {
       
    }
  }

  toggle.addEventListener('click', () => {
    aiMode = !aiMode;
    saveMode();
    applyMode();
    input.focus();
  });

   
  if (historyButton) {
    historyButton.addEventListener('click', () => {
      window.location.href = 'https://www.google.com/ai';
    });
  }

  function sendImageRequest(mode, query) {
    return new Promise((resolve) => {
      const api = typeof browser !== 'undefined'
        ? browser
        : (typeof chrome !== 'undefined' ? chrome : null);
      if (!api || !api.runtime || typeof api.runtime.sendMessage !== 'function') {
        resolve();
        return;
      }

      const payload = { type: 'cosmotab:image-search', mode, query };

      try {
        if (typeof browser !== 'undefined') {
          const result = api.runtime.sendMessage(payload);
          if (result && typeof result.then === 'function') {
            result.then(resolve).catch(resolve);
          } else {
            resolve();
          }
        } else {
          api.runtime.sendMessage(payload, () => {
            void api.runtime.lastError;
            resolve();
          });
        }
      } catch {
        resolve();
      }
    });
  }

  function imageError() {
    input.placeholder = t('imageSearch.error');
    window.setTimeout(applyMode, 2500);
  }

  function setPendingImage(file) {
    if (!file || (file.type && !file.type.startsWith('image/'))) return;

    if (pendingImageUrl) URL.revokeObjectURL(pendingImageUrl);

    pendingImage = file;
    pendingImageUrl = URL.createObjectURL(file);

    if (attachmentImg) attachmentImg.src = pendingImageUrl;
    if (attachmentName) attachmentName.textContent = file.name || 'image';
    if (attachment) attachment.hidden = false;
    form.classList.add('has-attachment');

    applyMode();
    input.focus();
  }

  function clearPendingImage() {
    if (pendingImageUrl) {
      URL.revokeObjectURL(pendingImageUrl);
      pendingImageUrl = '';
    }

    pendingImage = null;

    if (attachment) attachment.hidden = true;
    if (attachmentImg) attachmentImg.removeAttribute('src');
    if (attachmentName) attachmentName.textContent = '';
    form.classList.remove('has-attachment');

    applyMode();
  }

  async function submitImage() {
    const file = pendingImage;
    if (!file) return;

    const mode = aiMode ? 'ai' : 'lens';
    const query = mode === 'ai' ? input.value.trim() : '';
    await sendImageRequest(mode, query);

    const uploadAction = new URL('https://www.google.com/searchbyimage/upload');
    if (mode === 'ai' && query) uploadAction.searchParams.set('q', query);

    const uploadForm = document.createElement('form');
    uploadForm.method = 'post';
    uploadForm.action = uploadAction.toString();
    uploadForm.enctype = 'multipart/form-data';
    uploadForm.target = '_blank';
    uploadForm.style.display = 'none';

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.name = 'encoded_image';

    const uploadFile = file.name
      ? file
      : new File([file], 'image.png', { type: file.type || 'image/png' });

    try {
      const transfer = new DataTransfer();
      transfer.items.add(uploadFile);
      fileInput.files = transfer.files;
    } catch {
      imageError();
      return;
    }

    const imageContent = document.createElement('input');
    imageContent.type = 'hidden';
    imageContent.name = 'image_content';
    imageContent.value = '';

    uploadForm.append(fileInput, imageContent);
    document.body.appendChild(uploadForm);
    uploadForm.submit();
    window.setTimeout(() => uploadForm.remove(), 1000);

    clearPendingImage();
    input.value = '';
  }

  if (imagePicker && imageInput) {
    imagePicker.addEventListener('click', () => imageInput.click());

    imageInput.addEventListener('change', () => {
      const file = imageInput.files && imageInput.files[0];
      if (file) setPendingImage(file);
      imageInput.value = '';
    });

    form.addEventListener('paste', (event) => {
      const items = event.clipboardData ? event.clipboardData.items : null;
      if (!items) return;

      for (const item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            event.preventDefault();
            setPendingImage(file);
          }
          return;
        }
      }
    });

    form.addEventListener('dragover', (event) => {
      if (!event.dataTransfer ||
          !Array.from(event.dataTransfer.types).includes('Files')) {
        return;
      }

      event.preventDefault();
      form.classList.add('is-dragover');
    });

    form.addEventListener('dragleave', () => {
      form.classList.remove('is-dragover');
    });

    form.addEventListener('drop', (event) => {
      if (!event.dataTransfer) return;

      const file = event.dataTransfer.files && event.dataTransfer.files[0];
      if (!file) return;

      event.preventDefault();
      form.classList.remove('is-dragover');
      if (file.type.startsWith('image/')) setPendingImage(file);
    });

    if (attachmentSend) {
      attachmentSend.addEventListener('click', () => {
        void submitImage();
      });
    }

    if (attachmentRemove) {
      attachmentRemove.addEventListener('click', () => {
        clearPendingImage();
        input.focus();
      });
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (pendingImage) {
      void submitImage();
      return;
    }

    const query = input.value.trim();
    if (!query) {
      input.focus();
      return;
    }

    if (aiMode) {
       
      window.location.href =
        `https://www.google.com/search?q=${encodeURIComponent(query)}&udm=50`;
      return;
    }

    window.location.href = engine.url.replace('{q}', encodeURIComponent(query));
  });

  Settings.subscribe(() => {
    applyEngine();
  });

  window.addEventListener('cosmic:locale', applyMode);

  applyMode();

  const focusInput = () => input.focus({ preventScroll: true });
  window.addEventListener('load', focusInput);
  focusInput();
})();

 
(function initSettingsUI() {
  const button = document.getElementById('settings-button');
  const dialog = document.getElementById('settings-dialog');
  const form = document.getElementById('settings-form');
  const languageSelect = document.getElementById('setting-language');
  const layoutSelect = document.getElementById('setting-layout');
  const engineSelect = document.getElementById('setting-search-engine');
  const lightingSelect = document.getElementById('setting-planet-lighting');
  const weatherEnabled = document.getElementById('setting-weather-enabled');
  const citySelect = document.getElementById('setting-weather-city');
  const weatherUnit = document.getElementById('setting-weather-unit');
  const restoreButton = document.getElementById('settings-restore-bookmarks');
  const exportButton = document.getElementById('settings-export-bookmarks');
  const importButton = document.getElementById('settings-import-bookmarks');
  const importInput = document.getElementById('bookmark-import');
  const cancelButton = document.getElementById('settings-cancel');
  const errorEl = document.getElementById('settings-error');
  const statusEl = document.getElementById('settings-status');

  if (!button || !dialog || !form) return;

  function clearError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.remove('is-visible');
  }

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.classList.add('is-visible');
  }

  let statusTimer = 0;

  function clearStatus() {
    clearTimeout(statusTimer);
    if (!statusEl) return;
    statusEl.textContent = '';
    statusEl.classList.remove('is-visible');
  }

  function showStatus(message) {
    if (!statusEl) return;
    clearTimeout(statusTimer);
    statusEl.textContent = message;
    statusEl.classList.add('is-visible');
    statusTimer = window.setTimeout(clearStatus, 4000);
  }

  function populateCities(selectedId) {
    if (!citySelect) return;

    citySelect.textContent = '';
    const language = Settings.data.language;

    for (const city of CITIES) {
      const option = document.createElement('option');
      option.value = city.id;
      option.textContent = cityLabel(city, language);
      citySelect.appendChild(option);
    }

    citySelect.value = cityById(selectedId) ? selectedId : DEFAULT_CITY_ID;
  }

  function fillForm() {
    const settings = Settings.data;

    if (languageSelect) languageSelect.value = settings.language;
    if (layoutSelect) layoutSelect.value = settings.layout;
    if (engineSelect) engineSelect.value = settings.searchEngine;
    if (lightingSelect) lightingSelect.value = settings.planetMode;
    if (weatherEnabled) weatherEnabled.checked = settings.weather.enabled;
    if (weatherUnit) weatherUnit.value = settings.weather.unit;

    populateCities(settings.weather.cityId);
    clearError();
    clearStatus();
  }

  function openDialog() {
    fillForm();

    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function closeDialog() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  button.addEventListener('click', openDialog);

  if (cancelButton) {
    cancelButton.addEventListener('click', closeDialog);
  }

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeDialog();
  });

  if (restoreButton) {
    restoreButton.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('cosmic:restore-bookmarks'));
      restoreButton.textContent = t('settings.restoreDone');
      window.setTimeout(() => {
        restoreButton.textContent = t('settings.restore');
      }, 1800);
    });
  }

  if (exportButton) {
    exportButton.addEventListener('click', () => {
      clearStatus();
      window.dispatchEvent(new CustomEvent('cosmic:export-bookmarks'));
    });
  }

  if (importButton && importInput) {
    importButton.addEventListener('click', () => {
      clearStatus();
      clearError();
      importInput.click();
    });
  }

  window.addEventListener('cosmic:bookmarks-exported', (event) => {
    showStatus(t('settings.exported', { count: event.detail ? event.detail.count : 0 }));
  });

  window.addEventListener('cosmic:bookmarks-imported', (event) => {
    const added = event.detail ? event.detail.added : 0;
    showStatus(added > 0
      ? t('settings.imported', { count: added })
      : t('settings.importNone'));
  });

  window.addEventListener('cosmic:bookmarks-import-error', () => {
    clearStatus();
    showError(t('settings.importError'));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearError();

    const enabled = weatherEnabled ? weatherEnabled.checked : true;
    const cityId = citySelect ? citySelect.value : DEFAULT_CITY_ID;

    if (enabled && !cityById(cityId)) {
      showError(t('settings.invalidCity'));
      return;
    }

    const selectedLanguage = languageSelect ? languageSelect.value : Settings.data.language;
    const languageExplicit = selectedLanguage !== Settings.data.language
      ? true
      : Settings.data.languageExplicit;

    Settings.update({
      language: selectedLanguage,
      languageExplicit,
      layout: layoutSelect ? layoutSelect.value : 'top',
      searchEngine: engineSelect ? engineSelect.value : 'google',
      planetMode: lightingSelect ? lightingSelect.value : 'auto',
      weather: {
        enabled,
        cityId: cityById(cityId) ? cityId : DEFAULT_CITY_ID,
        unit: weatherUnit ? weatherUnit.value : 'celsius'
      }
    });

    applyI18n();
    closeDialog();
  });
})();

 
(function initSolarScene() {
  const mount = document.getElementById('scene');
  const errorEl = document.getElementById('scene-error');
  if (!mount) return;

  function showError(message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  if (typeof THREE === 'undefined') {
    showError(t('scene.error'));
    return;
  }

   

  const CONFIG = {
    fov: 40,
    cameraZ: 9.4,
    near: 0.1,
    far: 260,
    earthRadius: 1.55,
    earthPosition: new THREE.Vector3(-0.35, -0.22, 0),
    earthSpin: 0.05,
    cloudSpin: 0.09,
    moonRadius: 0.5,
    moonSpin: 0.045,
    moonOrbitSpeed: 0.045,
    moonOrbitX: 3.05,
    moonOrbitY: 1.85,
    moonOrbitYAmp: 1.15,
    moonOrbitZ: -3.9,
    moonOrbitZAmp: 1.4,
    maxPixelRatio: 1.75
  };

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   
   
  const motionScale = reduceMotion ? 0.35 : 1;

   

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power'
    });
  } catch (error) {
    showError(t('scene.error'));
    return;
  }

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;  
  renderer.domElement.className = 'scene-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  mount.appendChild(renderer.domElement);

  const maxAnisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

   

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(CONFIG.fov, 1, CONFIG.near, CONFIG.far);
  camera.position.set(0, 0, CONFIG.cameraZ);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0xa8bce8, 0.42));

  const sunLight = new THREE.DirectionalLight(0xfff3e2, 3.1);
  sunLight.position.set(0, 10, 40);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 80;
  sunLight.shadow.camera.left = -9;
  sunLight.shadow.camera.right = 9;
  sunLight.shadow.camera.top = 9;
  sunLight.shadow.camera.bottom = -9;
  sunLight.shadow.bias = -0.0006;
  sunLight.shadow.normalBias = 0.02;
  sunLight.shadow.camera.updateProjectionMatrix();
  scene.add(sunLight);
  scene.add(sunLight.target);

   
  const fillLight = new THREE.DirectionalLight(0x8aa6d8, 0.35);
  fillLight.position.set(4, 2, 12);
  scene.add(fillLight);

   

  const textureLoader = new THREE.TextureLoader();

  function loadTexture(path, { srgb = true } = {}) {
    const texture = textureLoader.load(path);
    texture.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
    texture.anisotropy = maxAnisotropy;
    return texture;
  }

  const dayTexture = loadTexture('textures/earth_atmos_2048.jpg');
  const nightTexture = loadTexture('textures/earth_lights_2048.png');
  const specularTexture = loadTexture('textures/earth_specular_2048.jpg', { srgb: false });
  const cloudsTexture = loadTexture('textures/earth_clouds_1024.png');
  const moonTexture = loadTexture('textures/moon_1024.jpg');

   

  const earthVertexShader =   `
    varying vec2 vUv;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vWorldNormal = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `;

  const earthFragmentShader =   `
    uniform sampler2D uDayMap;
    uniform sampler2D uNightMap;
    uniform sampler2D uSpecMap;
    uniform sampler2D uCloudMap;
    uniform vec3 uSunDirection;
    uniform float uNight;
    uniform float uLights;

    varying vec2 vUv;
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;

    void main() {
      vec3 normal = normalize(vWorldNormal);
      vec3 sunDir = normalize(uSunDirection);
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);

      float sunDot = dot(normal, sunDir);

      vec3 dayColor = texture2D(uDayMap, vUv).rgb;

      float daySide = smoothstep(-0.15, 0.25, sunDot);
      float diffuse = max(sunDot, 0.0);

      float ambient = mix(0.17, 0.04, uNight);
      vec3 color = dayColor * (ambient + diffuse * 1.05);

      float cloudShadow = texture2D(uCloudMap, vUv + vec2(0.0022, 0.0013)).a;
      color *= 1.0 - cloudShadow * 0.24 * daySide;

      float rim = 1.0 - max(dot(normal, viewDir), 0.0);
      color *= 1.0 - pow(rim, 2.5) * 0.32;

      float oceanMask = texture2D(uSpecMap, vUv).r;
      vec3 halfVector = normalize(sunDir + viewDir);
      float specular = pow(max(dot(normal, halfVector), 0.0), 44.0);
      color += vec3(0.55, 0.75, 1.0) * specular * oceanMask * daySide *
               mix(1.0, 0.3, uNight);

      vec3 nightColor = texture2D(uNightMap, vUv).rgb;
      float nightLum = dot(nightColor, vec3(0.299, 0.587, 0.114));
      float cityMask = smoothstep(0.04, 0.3, nightLum);
      float darkSide = 1.0 - smoothstep(-0.18, 0.2, sunDot);
      vec3 warmLights = nightColor * vec3(1.6, 1.17, 0.62) * 2.2;
      color += warmLights * cityMask * darkSide * uLights;

      gl_FragColor = vec4(pow(max(color, 0.0), vec3(1.0 / 2.2)), 1.0);
    }
  `;

  const earthUniforms = {
    uDayMap: { value: dayTexture },
    uNightMap: { value: nightTexture },
    uSpecMap: { value: specularTexture },
    uCloudMap: { value: cloudsTexture },
    uSunDirection: { value: new THREE.Vector3(0, 0.3, 1).normalize() },
    uNight: { value: 0 },
    uLights: { value: 0 }
  };

  const earthMaterial = new THREE.ShaderMaterial({
    uniforms: earthUniforms,
    vertexShader: earthVertexShader,
    fragmentShader: earthFragmentShader
  });

  const atmosphereVertexShader =   `
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;

    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vWorldNormal = normalize(mat3(modelMatrix) * normal);
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `;

  const atmosphereFragmentShader =   `
    uniform vec3 uColor;
    uniform vec3 uSunDirection;

    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;

    void main() {
      vec3 normal = normalize(vWorldNormal);
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);

      float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
      float sunFace = smoothstep(-0.45, 0.55, dot(normal, normalize(uSunDirection)));
      float intensity = rim * (0.3 + 0.7 * sunFace);

      vec3 glow = uColor * intensity;
      gl_FragColor = vec4(pow(max(glow, 0.0), vec3(1.0 / 2.2)), intensity * 0.9);
    }
  `;

  const atmosphereUniforms = {
    uColor: { value: new THREE.Color(0.2, 0.45, 1.0) },
    uSunDirection: { value: new THREE.Vector3(0, 0.3, 1).normalize() }
  };

  const atmosphereMaterial = new THREE.ShaderMaterial({
    uniforms: atmosphereUniforms,
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.FrontSide
  });

   

   
  const earthGroup = new THREE.Group();
  earthGroup.position.copy(CONFIG.earthPosition);
  scene.add(earthGroup);

   
  const earthTilt = new THREE.Group();
  earthTilt.rotation.z = THREE.MathUtils.degToRad(-23.4);
  earthGroup.add(earthTilt);

   
  const earthSpin = new THREE.Group();
  earthSpin.rotation.y = -1.7;
  earthTilt.add(earthSpin);

  const earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(CONFIG.earthRadius, 96, 64),
    earthMaterial
  );
  earthMesh.castShadow = true;
  earthSpin.add(earthMesh);

  const cloudsSpin = new THREE.Group();
  cloudsSpin.rotation.y = -1.4;
  earthTilt.add(cloudsSpin);

  const cloudsMaterial = new THREE.MeshLambertMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });

  const cloudsMesh = new THREE.Mesh(
    new THREE.SphereGeometry(CONFIG.earthRadius * 1.006, 72, 48),
    cloudsMaterial
  );
  cloudsMesh.renderOrder = 1;
  cloudsSpin.add(cloudsMesh);

  const atmosphereMesh = new THREE.Mesh(
    new THREE.SphereGeometry(CONFIG.earthRadius * 1.045, 64, 48),
    atmosphereMaterial
  );
  atmosphereMesh.renderOrder = 2;
  earthGroup.add(atmosphereMesh);

   

  const moonOrbitGroup = new THREE.Group();
  moonOrbitGroup.position.copy(CONFIG.earthPosition);
  scene.add(moonOrbitGroup);

   
  const moonPivot = new THREE.Group();
  moonOrbitGroup.add(moonPivot);

  const moonSpinGroup = new THREE.Group();
  moonPivot.add(moonSpinGroup);

  const moonMesh = new THREE.Mesh(
    new THREE.SphereGeometry(CONFIG.moonRadius, 64, 48),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: moonTexture,
      bumpScale: 0.03,
      roughness: 0.95,
      metalness: 0
    })
  );
  moonMesh.receiveShadow = true;
  moonSpinGroup.add(moonMesh);

   
  const earthshine = new THREE.PointLight(0x7f9ed8, 3, 18, 2);
  moonOrbitGroup.add(earthshine);

   

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createCanvasTexture(width, height, painter) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    painter(ctx, width, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = maxAnisotropy;
    return texture;
  }

   
  function createJupiterTexture() {
    return createCanvasTexture(512, 256, (ctx, w, h) => {
      const palette = ['#d8c3a0', '#c2a883', '#e8d8bb', '#a98a66', '#cdb590', '#8f7050'];
      let y = 0;

      while (y < h) {
        const bandHeight = 6 + Math.random() * 20;
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.fillRect(0, y, w, bandHeight + 1);
        y += bandHeight;
      }

       
      for (let i = 0; i < 220; i += 1) {
        ctx.globalAlpha = randomBetween(0.04, 0.12);
        ctx.fillStyle = Math.random() > 0.5 ? '#fff1d6' : '#7a5c3e';
        ctx.fillRect(
          randomBetween(-w * 0.1, w * 0.7),
          Math.random() * h,
          randomBetween(w * 0.25, w * 0.7),
          randomBetween(1, 3)
        );
      }
      ctx.globalAlpha = 1;

       
      const spotX = w * 0.68;
      const spotY = h * 0.64;
      const spot = ctx.createRadialGradient(spotX, spotY, 2, spotX, spotY, w * 0.085);
      spot.addColorStop(0, 'rgba(176, 74, 48, 0.95)');
      spot.addColorStop(0.65, 'rgba(176, 74, 48, 0.55)');
      spot.addColorStop(1, 'rgba(176, 74, 48, 0)');
      ctx.fillStyle = spot;
      ctx.beginPath();
      ctx.ellipse(spotX, spotY, w * 0.085, h * 0.065, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

   
  function createMarsTexture() {
    return createCanvasTexture(256, 128, (ctx, w, h) => {
      const base = ctx.createLinearGradient(0, 0, 0, h);
      base.addColorStop(0, '#8e3b22');
      base.addColorStop(0.5, '#b95630');
      base.addColorStop(1, '#8a3a22');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 420; i += 1) {
        ctx.globalAlpha = randomBetween(0.04, 0.14);
        ctx.fillStyle = Math.random() > 0.45 ? '#5c2414' : '#d98a5f';
        ctx.beginPath();
        ctx.ellipse(
          Math.random() * w,
          Math.random() * h,
          randomBetween(1, 9),
          randomBetween(1, 5),
          Math.random() * Math.PI,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = 'rgba(240, 236, 226, 0.85)';
      ctx.beginPath();
      ctx.ellipse(w * 0.5, 0, w * 0.42, h * 0.06, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w * 0.5, h, w * 0.34, h * 0.05, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

   
  function createSaturnTexture() {
    return createCanvasTexture(256, 128, (ctx, w, h) => {
      const palette = ['#e7d3a1', '#dcc48c', '#f0e0b8', '#c9ae78', '#dbc68f'];
      let y = 0;

      while (y < h) {
        const bandHeight = 4 + Math.random() * 12;
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.fillRect(0, y, w, bandHeight + 1);
        y += bandHeight;
      }

      for (let i = 0; i < 140; i += 1) {
        ctx.globalAlpha = randomBetween(0.03, 0.09);
        ctx.fillStyle = Math.random() > 0.5 ? '#fff7dd' : '#a98d5c';
        ctx.fillRect(
          randomBetween(-w * 0.1, w * 0.7),
          Math.random() * h,
          randomBetween(w * 0.2, w * 0.6),
          randomBetween(1, 2)
        );
      }
      ctx.globalAlpha = 1;
    });
  }

   
  function createVenusTexture() {
    return createCanvasTexture(256, 128, (ctx, w, h) => {
      ctx.fillStyle = '#e6cf9b';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 90; i += 1) {
        ctx.globalAlpha = randomBetween(0.05, 0.14);
        ctx.fillStyle = Math.random() > 0.5 ? '#fff0c9' : '#c4a468';
        ctx.beginPath();
        ctx.ellipse(
          Math.random() * w,
          Math.random() * h,
          randomBetween(w * 0.08, w * 0.28),
          randomBetween(1.5, 5),
          randomBetween(-0.15, 0.15),
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    });
  }

  const backgroundPlanets = [];

  function addBackgroundPlanet({ radius, texture, position, spin, tilt = 0, driftX = 0.25, driftY = 0.15 }) {
    const group = new THREE.Group();
    group.position.copy(position);
    group.rotation.z = tilt;

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 40, 28),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.95,
        metalness: 0,
        emissive: new THREE.Color(0x070b14),
        emissiveIntensity: 0.9
      })
    );

    group.add(mesh);
    scene.add(group);

    backgroundPlanets.push({
      group,
      mesh,
      basePosition: position.clone(),
      spin,
      driftX,
      driftY,
      driftSpeed: randomBetween(0.035, 0.06),
      phase: Math.random() * Math.PI * 2
    });

    return group;
  }

  function createSaturnRings(planetRadius) {
    const rings = new THREE.Group();
    const definitions = [
      { inner: 1.32, outer: 1.52, color: 0xcdbb96, opacity: 0.5 },
      { inner: 1.58, outer: 1.86, color: 0xe6d6b0, opacity: 0.72 },
      { inner: 1.92, outer: 2.06, color: 0xb5a17c, opacity: 0.38 }
    ];

    for (const ring of definitions) {
      const geometry = new THREE.RingGeometry(
        planetRadius * ring.inner,
        planetRadius * ring.outer,
        96,
        1
      );
      const material = new THREE.MeshBasicMaterial({
        color: ring.color,
        transparent: true,
        opacity: ring.opacity,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      rings.add(new THREE.Mesh(geometry, material));
    }

    rings.rotation.x = Math.PI / 2 - 0.34;
    rings.rotation.z = 0.18;
    return rings;
  }

  const marsGroup = addBackgroundPlanet({
    radius: 0.52,
    texture: createMarsTexture(),
    position: new THREE.Vector3(-8.8, -4.2, -26),
    spin: 0.02,
    tilt: 0.35
  });
  marsGroup.name = 'Mars';

  addBackgroundPlanet({
    radius: 1.05,
    texture: createJupiterTexture(),
    position: new THREE.Vector3(11.5, -6.2, -48),
    spin: 0.035,
    tilt: 0.12,
    driftX: 0.35,
    driftY: 0.2
  });

  const saturnGroup = addBackgroundPlanet({
    radius: 0.8,
    texture: createSaturnTexture(),
    position: new THREE.Vector3(-9.5, 4.6, -32),
    spin: 0.022,
    tilt: 0.2,
    driftX: 0.3,
    driftY: 0.18
  });
  saturnGroup.add(createSaturnRings(0.8));

  addBackgroundPlanet({
    radius: 0.3,
    texture: createVenusTexture(),
    position: new THREE.Vector3(11.5, 5.2, -34),
    spin: 0.03,
    tilt: 0.1,
    driftX: 0.25,
    driftY: 0.15
  });

   

   

   
  const SEASONAL_SUN = [
    { sunrise: 8.5, sunset: 16.0 },  
    { sunrise: 8.0, sunset: 16.5 },  
    { sunrise: 7.0, sunset: 18.0 },  
    { sunrise: 6.0, sunset: 19.0 },  
    { sunrise: 5.0, sunset: 19.5 },  
    { sunrise: 4.5, sunset: 22.0 },  
    { sunrise: 4.5, sunset: 22.0 },  
    { sunrise: 5.5, sunset: 20.5 },  
    { sunrise: 6.5, sunset: 19.0 },  
    { sunrise: 7.5, sunset: 18.0 },  
    { sunrise: 8.0, sunset: 16.5 },  
    { sunrise: 8.5, sunset: 16.0 }   
  ];

   
  function getSunTimes(date) {
    const month = date.getMonth();
    const current = SEASONAL_SUN[month];
    const next = SEASONAL_SUN[(month + 1) % 12];
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    const monthProgress = (date.getDate() - 1) / daysInMonth;

    return {
      sunrise: current.sunrise + (next.sunrise - current.sunrise) * monthProgress,
      sunset: current.sunset + (next.sunset - current.sunset) * monthProgress
    };
  }

   
  const EVENING_DURATION = 1.5;  

  const lightingState = {
    sunDirection: new THREE.Vector3(0, 0, 1),
    nightMix: 0,
    nightTarget: 0,
    lightsMix: 0,
    lightsTarget: 0,
    sunrise: 6,
    sunset: 18,
    state: 'day',
    currentAngle: 0,
    targetAngle: 0,

    update(dt = 0) {
      const manualMode = Settings.data.planetMode;
      let state;

      if (manualMode === 'auto') {
        const now = new Date();
        const hours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
        const { sunrise, sunset } = getSunTimes(now);

        this.sunrise = sunrise;
        this.sunset = sunset;

        if (hours >= sunrise && hours < sunset) {
          state = 'day';
        } else if (hours >= sunset && hours < sunset + EVENING_DURATION) {
          state = 'evening';
        } else {
          state = 'night';
        }
      } else {
        state = manualMode === 'day'
          ? 'day'
          : manualMode === 'dusk' ? 'evening' : 'night';
      }

      if (state !== this.state) {
        this.state = state;

        if (state === 'day') this.targetAngle = 0;
        else if (state === 'evening') this.targetAngle = Math.PI / 2;
        else this.targetAngle = Math.PI;
      }

       
      const smooth = dt > 0 ? 1 - Math.exp(-3.2 * dt) : 1;
      this.currentAngle += (this.targetAngle - this.currentAngle) * smooth;

      if (Math.abs(this.targetAngle - this.currentAngle) < 0.001) {
        this.currentAngle = this.targetAngle;
      }

      this.nightTarget = state === 'night'
        ? 1
        : state === 'evening'
          ? 0.8    
          : 0;
      this.lightsTarget = state === 'day' ? 0 : 1;

       
       
      const sunHeight = 0.22 * Math.max(0, Math.cos(this.currentAngle));

      this.sunDirection
        .set(Math.sin(this.currentAngle) * 0.9, sunHeight, Math.cos(this.currentAngle))
        .normalize();
    }
  };

  lightingState.update(0);
  lightingState.nightMix = lightingState.nightTarget;
  lightingState.lightsMix = lightingState.lightsTarget;
  earthUniforms.uNight.value = lightingState.nightMix;
  earthUniforms.uLights.value = lightingState.lightsMix;

   

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const dragAxis = new THREE.Vector3();
  const angularVelocity = new THREE.Vector3();
  const inertiaAxis = new THREE.Vector3();
  const tempQuaternion = new THREE.Quaternion();
  const spinQuaternion = new THREE.Quaternion();
  const Y_AXIS = new THREE.Vector3(0, 1, 0);
  const canvas = renderer.domElement;

  const earthTarget = {
    pivot: earthGroup,
    mesh: earthMesh,
    base: earthGroup.quaternion.clone(),
    lastTouched: 0
  };
  const moonTarget = {
    pivot: moonPivot,
    mesh: moonMesh,
    base: moonPivot.quaternion.clone(),
    lastTouched: 0
  };
  const draggableTargets = [earthTarget, moonTarget];

  let dragging = false;
  let activeTarget = null;
  let inertiaTarget = null;
  let pointerId = null;
  let lastX = 0;
  let lastY = 0;
  let lastMoveTime = 0;
  let lastDragFrame = 0;
  let lastHoverCheck = 0;
  let dragDx = 0;
  let dragDy = 0;
  const dragVelocity = new THREE.Vector3();

  function applyDragStep(nowMs) {
    if (!dragging || !activeTarget) return false;
    if (dragDx === 0 && dragDy === 0) return false;

    const angle = Math.hypot(dragDx, dragDy) * 0.0065;

    if (angle > 1e-6) {
      dragAxis.set(dragDy, dragDx, 0).normalize();
      tempQuaternion.setFromAxisAngle(dragAxis, angle);
      activeTarget.pivot.quaternion.premultiply(tempQuaternion);

      const elapsed = Math.max(8, nowMs - lastDragFrame) / 1000;
      lastDragFrame = nowMs;

      const speed = Math.min(14, angle / elapsed);
      dragVelocity.copy(dragAxis).multiplyScalar(speed);
      angularVelocity.lerp(dragVelocity, 0.42);
      activeTarget.lastTouched = nowMs;
    }

    dragDx = 0;
    dragDy = 0;
    return true;
  }

  function updatePointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function pickTarget(event) {
    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects([earthMesh, moonMesh], false);
    if (!hits.length) return null;
    return hits[0].object === earthMesh ? earthTarget : moonTarget;
  }

  function updateHoverCursor(event) {
    const target = pickTarget(event);
    canvas.classList.toggle('is-hovering', Boolean(target));
  }

  canvas.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const target = pickTarget(event);
    if (!target) return;

    event.preventDefault();

    dragging = true;
    activeTarget = target;
    inertiaTarget = target;
    pointerId = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    lastMoveTime = performance.now();
    lastDragFrame = lastMoveTime;
    dragDx = 0;
    dragDy = 0;
    angularVelocity.set(0, 0, 0);
    target.lastTouched = lastMoveTime;

    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add('is-grabbing');
    canvas.classList.remove('is-hovering');
  });

  canvas.addEventListener('pointermove', (event) => {
    if (!dragging) {
       
      const now = performance.now();
      if (now - lastHoverCheck > 80) {
        lastHoverCheck = now;
        updateHoverCursor(event);
      }
      return;
    }

    if (event.pointerId !== pointerId) return;
    event.preventDefault();

    const now = performance.now();
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;

    lastX = event.clientX;
    lastY = event.clientY;
    lastMoveTime = now;

    dragDx += dx;
    dragDy += dy;
    activeTarget.lastTouched = now;
  });

  function endDrag(event) {
    if (!dragging) return;
    if (event && event.pointerId !== pointerId) return;

    if (event && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)) {
      dragDx += event.clientX - lastX;
      dragDy += event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
    }

    applyDragStep(performance.now());

    if (performance.now() - lastMoveTime > 120) {
      angularVelocity.set(0, 0, 0);
    }

    if (activeTarget) {
      activeTarget.lastTouched = performance.now();
    }

    dragging = false;
    activeTarget = null;
    canvas.classList.remove('is-grabbing');

    if (pointerId !== null && canvas.hasPointerCapture(pointerId)) {
      canvas.releasePointerCapture(pointerId);
    }
    pointerId = null;
  }

  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  canvas.addEventListener('lostpointercapture', () => {
    if (!dragging) return;
    dragging = false;
    activeTarget = null;
    canvas.classList.remove('is-grabbing');
    pointerId = null;
  });

  canvas.addEventListener('pointerleave', () => {
    if (!dragging) canvas.classList.remove('is-hovering');
  });

   

  function updateSize() {
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    if (!width || !height) return;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CONFIG.maxPixelRatio));
    renderer.setSize(width, height, false);

    camera.aspect = width / height;

     
    const aspect = Math.max(camera.aspect, 0.4);
    camera.position.z = Math.max(CONFIG.cameraZ, 5.05 / aspect);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  updateSize();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateSize).observe(mount);
  }
  window.addEventListener('resize', updateSize);

  let running = false;
  let rafId = 0;
  let lastTime = 0;
  let lastRenderTime = 0;
  let elapsed = 0;
  let orbitAngle = 0.75;
  let shadowTimer = 1;

  function spinAroundLocalY(group, angle) {
    spinQuaternion.setFromAxisAngle(Y_AXIS, angle);
    group.quaternion.multiply(spinQuaternion);
  }

  function frame(now) {
    if (!running) return;

     
    rafId = requestAnimationFrame(frame);

     
    const interacting = dragging || angularVelocity.lengthSq() > 1e-6;
    const minInterval = interacting ? 0 : 1000 / 30;
    if (now - lastRenderTime < minInterval) return;

    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    lastRenderTime = now;
    elapsed += dt;

     
    lightingState.update(dt);
    lightingState.nightMix +=
      (lightingState.nightTarget - lightingState.nightMix) * Math.min(1, dt * 1.4);
    lightingState.lightsMix +=
      (lightingState.lightsTarget - lightingState.lightsMix) * Math.min(1, dt * 1.6);

    earthUniforms.uSunDirection.value.copy(lightingState.sunDirection);
    earthUniforms.uNight.value = lightingState.nightMix;
    earthUniforms.uLights.value = lightingState.lightsMix;
    atmosphereUniforms.uSunDirection.value.copy(lightingState.sunDirection);

     
    cloudsMaterial.opacity = 0.9 - 0.52 * lightingState.nightMix;
    cloudsMaterial.color.setScalar(1 - 0.46 * lightingState.nightMix);

    sunLight.position.copy(lightingState.sunDirection).multiplyScalar(40);
    sunLight.target.position.set(0, 0, 0);

     
    shadowTimer += dt;
    if (shadowTimer >= 0.12) {
      renderer.shadowMap.needsUpdate = true;
      shadowTimer = 0;
    }

     
    const earthIsDragged = dragging && activeTarget === earthTarget;
    if (!earthIsDragged) {
      spinAroundLocalY(earthSpin, CONFIG.earthSpin * dt * motionScale);
    }
    spinAroundLocalY(cloudsSpin, CONFIG.cloudSpin * dt * motionScale);
    spinAroundLocalY(moonSpinGroup, CONFIG.moonSpin * dt * motionScale);

     
    orbitAngle += CONFIG.moonOrbitSpeed * dt * motionScale;
    moonPivot.position.set(
      Math.cos(orbitAngle) * CONFIG.moonOrbitX,
      CONFIG.moonOrbitY + Math.sin(orbitAngle) * CONFIG.moonOrbitYAmp,
      CONFIG.moonOrbitZ - Math.sin(orbitAngle) * CONFIG.moonOrbitZAmp
    );

     
    if (dragging && activeTarget) {
      const didDrag = applyDragStep(performance.now());

      if (!didDrag) {
        angularVelocity.multiplyScalar(0.82);
        if (angularVelocity.length() < 0.02) angularVelocity.set(0, 0, 0);
      }
    }

    if (!dragging && angularVelocity.lengthSq() > 1e-6) {
      const speed = angularVelocity.length();
      inertiaAxis.copy(angularVelocity).normalize();
      tempQuaternion.setFromAxisAngle(inertiaAxis, speed * dt);

      if (inertiaTarget) {
        inertiaTarget.pivot.quaternion.premultiply(tempQuaternion);
      }

      angularVelocity.multiplyScalar(Math.exp(-3.2 * dt));
      if (angularVelocity.length() < 0.015) angularVelocity.set(0, 0, 0);
    }

    const settleNow = performance.now();

    for (const target of draggableTargets) {
      if (dragging && activeTarget === target) continue;
      if (!dragging && inertiaTarget === target && angularVelocity.lengthSq() > 1e-6) continue;

      const offset = target.pivot.quaternion.angleTo(target.base);
      if (offset < 1e-4) continue;
      if (settleNow - target.lastTouched < 550) continue;

      target.pivot.quaternion.slerp(target.base, 1 - Math.exp(-5.2 * dt));

      if (target.pivot.quaternion.angleTo(target.base) < 0.002) {
        target.pivot.quaternion.copy(target.base);
      }
    }

     
    for (const planet of backgroundPlanets) {
      planet.mesh.rotation.y += planet.spin * dt * motionScale;

      planet.group.position.x =
        planet.basePosition.x +
        Math.sin(elapsed * planet.driftSpeed + planet.phase) * planet.driftX;
      planet.group.position.y =
        planet.basePosition.y +
        Math.cos(elapsed * planet.driftSpeed * 0.8 + planet.phase) * planet.driftY;
    }

    renderer.render(scene, camera);
  }

  function start() {
    if (running || document.hidden) return;
    running = true;
    lastTime = performance.now();
    lastRenderTime = 0;
    rafId = requestAnimationFrame(frame);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

   
  if (typeof IntersectionObserver !== 'undefined') {
    new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) start();
        else stop();
      }
    }, { threshold: 0.01 }).observe(mount);
  }

   
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    stop();
  });
  canvas.addEventListener('webglcontextrestored', start);

  start();
})();

applyI18n();
