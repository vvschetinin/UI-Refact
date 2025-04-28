export {};

// ======================= Header Scroll Bottom ============================= //

let lastScroll: number = 0;
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
    lastScroll = scrollPosition(); // Сохраняем начальную позицию
  }
};

// Вызываем инициализацию при загрузке страницы
document.addEventListener("DOMContentLoaded", initializeHeader);

// Обработчик прокрутки
window.addEventListener("scroll", (): void => {
  if (header) {
    const currentScroll = scrollPosition();
    // Управление классом is-active
    if (currentScroll > defaultOffset) {
      header.classList.add("is-active");
    } else {
      header.classList.remove("is-active");
    }

    // Используем lastScroll для добавления классов направления прокрутки
    if (currentScroll > lastScroll && currentScroll > defaultOffset) {
      header.classList.add("is-scrolling-down");
      header.classList.remove("is-scrolling-up");
    } else if (currentScroll < lastScroll && lastScroll > defaultOffset) {
      header.classList.add("is-scrolling-up");
      header.classList.remove("is-scrolling-down");
    } else {
      // Удаляем классы направления, если прокрутка в пределах defaultOffset
      header.classList.remove("is-scrolling-up", "is-scrolling-down");
    }

    lastScroll = currentScroll; // Обновляем lastScroll
  }
});
