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

// ============== Вызов формы ================= //

const startProjectForm = document.querySelector<HTMLElement>(".start-project-overlay");
const startProjectButtons = document.querySelectorAll<HTMLElement>(".js-startproject");
const closeButton = document.querySelector<HTMLElement>(".js-closebutton");

if (startProjectForm) {
  startProjectButtons.forEach((el: HTMLElement) => {
    el.addEventListener("click", () => {
      startProjectForm.classList.add("is-active");
    });
  });

  closeButton?.addEventListener("click", () => {
    startProjectForm.classList.remove("is-active");
  });
}

// ==================== Toggle Mobile Menu ======================== //

const bodyPage = document.querySelector<HTMLElement>("body");
const navToggleOpen = document.querySelector<HTMLElement>(".nav-toggle");

if (bodyPage && navToggleOpen) {
  navToggleOpen.addEventListener("click", () => {
    bodyPage.classList.toggle("menu-open");
  });
}

// ================ Checked Form ================ //

// Используем типы HTMLElement или их подтипы (например, HTMLInputElement)
const formButton = document.querySelector('[name="formbutton"]') as HTMLButtonElement | null;
const formCheck = document.querySelector('[name="formcheck"]') as HTMLInputElement | null;

if (formButton && formCheck) {
  formButton.setAttribute("disabled", "true");

  formCheck.oninput = () => {
    if (formCheck.checked) {
      formButton.removeAttribute("disabled");
    } else {
      formButton.setAttribute("disabled", "true");
    }
  };
} else {
  console.error("Один из элементов формы не найден");
}

// ================== Accordeon FAQ ===================

document.addEventListener("DOMContentLoaded", () => {
  // Получаем все вопросы с типом HTMLElement
  const questions: NodeListOf<HTMLElement> = document.querySelectorAll(".faq-question");

  questions.forEach((question: HTMLElement) => {
    question.addEventListener("click", () => {
      // Находим следующий элемент (ответ) с типом HTMLElement или null
      const answer: HTMLElement | null = question.nextElementSibling as HTMLElement | null;
      const isActive: boolean = question.classList.contains("active");

      if (isActive) {
        question.classList.remove("active");
        if (answer) {
          answer.classList.remove("active");
          answer.style.maxHeight = "0"; // Закрываем с анимацией
        }
      } else {
        question.classList.add("active");
        if (answer) {
          answer.classList.add("active");
          // Устанавливаем max-height на основе scrollHeight с запасом 10px
          answer.style.maxHeight = `${answer.scrollHeight + 10}px`;
        }
      }
    });

    // Поддержка клавиатуры (Enter или Пробел)
    question.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        question.click();
      }
    });
  });
});
