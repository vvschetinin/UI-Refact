const form = document.querySelector<HTMLFormElement>("#modal-form");

if (form) {
  form.addEventListener("submit", async function (event: Event) {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("sendform.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(response.statusText);

      const result = await response.text();

      form.reset();

      const successSpan = document.querySelector<HTMLSpanElement>(".success span");
      const successDiv = document.querySelector<HTMLElement>(".success");

      if (successSpan && successDiv) {
        successSpan.innerHTML = result;
        successDiv.classList.add("success-mail");
        successDiv.style.display = "block";

        setTimeout(() => {
          successDiv.classList.remove("success-mail");
          successDiv.style.display = "none";
        }, 5000);
      }
    } catch (error) {
      alert(`Ошибка отправки формы: ${error instanceof Error ? error.message : "Неизвестная ошибка"}`);
    }
  });
}
