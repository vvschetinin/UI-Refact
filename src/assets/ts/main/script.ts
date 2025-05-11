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

const videoElements = document.querySelectorAll<HTMLVideoElement>(".hero-video");

if (videoElements.length === 0) {
  console.warn("Видео с классом .hero-video не найдено.");
} else {
  const handleResize = (): void => {
    const isMobile = window.innerWidth <= 550;

    videoElements.forEach((video) => {
      if (!video) return;

      if (isMobile) {
        video.pause();
      } else {
        video.play().catch((error: Error) => {
          console.log("Автовоспроизведение заблокировано:", error.message);
        });
      }
    });
  };

  handleResize();

  window.addEventListener("resize", handleResize);
}
