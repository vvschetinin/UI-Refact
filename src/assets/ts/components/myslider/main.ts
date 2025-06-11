// src/assets/ts/components/myslider/main.ts
import { Slider } from "./myslider";

document.addEventListener("DOMContentLoaded", () => {
  // @ts-ignore
  const slider = new Slider(".myslider", {
    autoplay: true,
    autoplaySpeed: 4500,
    loop: true,
    effect: "fade",
  });
});
