export {};

// ======================= Header Scroll Bottom ============================= //

const defaultOffset: number = 40;
const header: HTMLElement | null = document.querySelector(".header");

const scrollPosition = (): number => window.pageYOffset || document.documentElement.scrollTop;

// Функция для инициализации состояния header
const initializeHeader = (): void => {
  if (header) {
    if (scrollPosition() <= defaultOffset) {
      header.classList.remove("is-active");
    } else {
      header.classList.add("is-active");
    }
  }
};

// Вызываем инициализацию при загрузке страницы
document.addEventListener("DOMContentLoaded", initializeHeader);

// Обработчик прокрутки
window.addEventListener("scroll", (): void => {
  if (header) {
    const currentScroll = scrollPosition();
    if (currentScroll > defaultOffset) {
      header.classList.add("is-active");
    } else {
      header.classList.remove("is-active");
    }
  }
});

// ================== Управление показом видео ======================

const videoElement = document.getElementById("heroVideo") as HTMLVideoElement | null;

if (!videoElement) {
  console.warn('Элемент video с id="heroVideo" не найден.');
} else {
  const handleResize = (): void => {
    if (window.innerWidth <= 550) {
      videoElement.pause();
    } else {
      videoElement.play().catch((error: Error) => {
        console.log("Автовоспроизведение заблокировано:", error.message);
      });
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
}
