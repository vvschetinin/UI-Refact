declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "swiper/css/scrollbar";
declare module "swiper/css/effect-fade"; // Добавляем для стилей Fade
declare module "swiper/modules" {
  export const Navigation: any;
  export const Pagination: any;
  export const Scrollbar: any;
  export const Autoplay: any;
  export const EffectFade: any; // Добавляем для EffectFade
}
