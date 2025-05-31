"use strict";

// Отключение возможности копирования

document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling; // Находим следующий .faq-answer
      const isActive = question.classList.contains("active");

      // Закрываем все ответы
      document.querySelectorAll(".faq-question").forEach((q) => {
        q.classList.remove("active");
        q.nextElementSibling.classList.remove("active");
      });

      // Открываем/закрываем текущий ответ
      if (!isActive) {
        question.classList.add("active");
        answer.classList.add("active");
      }
    });

    // Поддержка клавиатуры (Enter или пробел)
    question.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
});
