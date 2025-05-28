import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./swiper-custom.scss";

// Инициализация слайдера
export const swiper = new Swiper(".s-service-slider .swiper", {
  // Подключение модулей
  modules: [Navigation, Pagination, Scrollbar],

  // Базовые настройки слайдера
  slidesPerView: 1, // Показывать один слайд за раз
  spaceBetween: 20, // Отступ между слайдами (в пикселях)
  loop: true, // Зацикливание слайдов (бесконечная прокрутка)

  // Настройка навигации
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Настройка пагинации
  pagination: {
    el: ".swiper-pagination",
    clickable: true, // Пагинация кликабельна
  },

  // Настройка скроллбара
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true, // Скроллбар можно перетаскивать
  },
});
