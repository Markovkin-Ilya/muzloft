const YANDEX_MAPS_APP_URL = "yandexmaps://maps.yandex.ru/";
const YANDEX_MAPS_WEB_URL = "https://yandex.ru/maps/";
const APP_FALLBACK_DELAY_MS = 1000;

const isMobileDevice = () =>
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export function openInYandexMaps(address: string) {
  const query = `text=${encodeURIComponent(address)}`;
  const webUrl = `${YANDEX_MAPS_WEB_URL}?${query}`;

  if (!isMobileDevice()) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }

  // Если приложение открылось, страница уходит в фон и фолбэк отменяется
  const handleVisibilityChange = () => {
    if (document.hidden) {
      cancelFallback();
    }
  };

  const fallbackTimer = window.setTimeout(() => {
    cancelFallback();
    window.location.href = webUrl;
  }, APP_FALLBACK_DELAY_MS);

  function cancelFallback() {
    window.clearTimeout(fallbackTimer);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  }

  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.location.href = `${YANDEX_MAPS_APP_URL}?${query}`;
}
