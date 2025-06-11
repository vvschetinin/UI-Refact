document.addEventListener("DOMContentLoaded", () => {
  const eventCallback = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const clearVal = target.dataset.phoneClear;
    const pattern = target.dataset.phonePattern;
    const matrixDef = "+7(___) ___-__-__";
    const matrix = pattern ? pattern : matrixDef;
    let i = 0;
    const def = matrix.replace(/\D/g, "");
    let val = target.value.replace(/\D/g, "");

    if (clearVal !== "false" && e.type === "blur") {
      const match = matrix.match(/([\_\d])/g);
      if (match && val.length < match.length) {
        target.value = "";
        return;
      }
    }

    if (def.length >= val.length) val = def;

    target.value = matrix.replace(/./g, (a: string) => {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
  };

  const phoneInputs = document.querySelectorAll<HTMLInputElement>("[data-phone-pattern]");
  phoneInputs.forEach((elem) => {
    ["input", "blur", "focus"].forEach((ev) => {
      elem.addEventListener(ev, eventCallback);
    });
  });
});
