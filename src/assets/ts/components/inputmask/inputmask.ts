import Inputmask from "inputmask";

document.addEventListener("DOMContentLoaded", function () {
  const phoneInputs = document.querySelectorAll<HTMLInputElement>("[data-mask='phone']");

  phoneInputs.forEach((input) => {
    const mask = input.dataset.phonePattern || "+7 (999) 999-99-99";
    const im = new Inputmask({
      mask: mask,
      clearIncomplete: input.dataset.phoneClear === "false" ? false : true,
      showMaskOnHover: false,
      autoUnmask: true,
    });
    im.mask(input);
  });
});
