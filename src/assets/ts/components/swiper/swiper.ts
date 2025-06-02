import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade"; // Импорт стилей для Fade Effect
import "./swiper-custom.scss";

export const swiper = new Swiper(".service-slider", {
  modules: [Navigation, Pagination, Scrollbar, Autoplay, EffectFade], // Добавляем EffectFade
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  speed: 1200, // Длительность перехода в миллисекундах (800ms = 0.8s)
  effect: "fade", // Включаем эффект затухания
  fadeEffect: {
    crossFade: true, // Плавное затухание между слайдами
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
});

// Управление автопрокруткой
const toggleButton = document.querySelector(".service-slider .toggle-autoplay");
if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
      toggleButton.textContent = "Start Autoplay";
    } else {
      swiper.autoplay.start();
      toggleButton.textContent = "Stop Autoplay";
    }
  });
}
