// src/assets/ts/components/myslider/myslider.ts

interface SliderOptions {
  autoplay?: boolean;
  autoplaySpeed?: number;
  loop?: boolean;
  effect?: "slide" | "fade";
}

interface SliderElements {
  container: HTMLElement;
  wrapper: HTMLElement;
  slides: HTMLElement[];
  prevButton: HTMLElement;
  nextButton: HTMLElement;
  pagination: HTMLElement;
}

export class Slider {
  private options: SliderOptions;
  private elements: SliderElements;
  private currentIndex: number = 0;
  private totalSlides: number;
  private paginationBullets: HTMLElement[] = [];
  private autoplayInterval: number | null = null;
  private isTransitioning: boolean = false;

  constructor(selector: string, options: SliderOptions = {}) {
    this.options = {
      autoplay: false,
      autoplaySpeed: 3000,
      loop: true,
      effect: "fade",
      ...options,
    };

    const container = document.querySelector(selector) as HTMLElement;
    if (!container) {
      throw new Error(`Slider container with selector "${selector}" not found`);
    }

    const wrapper = container.querySelector(".myslider-wrapper") as HTMLElement;
    const slides = Array.from(container.querySelectorAll(".slider-item")) as HTMLElement[];
    const prevButton = container.querySelector(".slider-button-prev") as HTMLElement;
    const nextButton = container.querySelector(".slider-button-next") as HTMLElement;
    const pagination = container.querySelector(".slider-pagination") as HTMLElement;

    if (!wrapper || slides.length === 0 || !prevButton || !nextButton || !pagination) {
      throw new Error("Required slider elements are missing");
    }

    this.elements = {
      container,
      wrapper,
      slides,
      prevButton,
      nextButton,
      pagination,
    };

    this.totalSlides = slides.length;

    // Проверка краевого случая: если слайдов меньше 2, отключаем автопрокрутку и цикл
    if (this.totalSlides < 2) {
      this.options.autoplay = false;
      this.options.loop = false;
    }

    this.init();
  }

  private init(): void {
    this.updateSlide();
    this.initPagination();
    this.setupEventListeners();
    this.setupAutoplay();
  }

  private setupEventListeners(): void {
    // Обработчики для кнопок
    this.elements.prevButton.addEventListener("click", () => this.prev());
    this.elements.nextButton.addEventListener("click", () => this.next());

    // Обработчик для завершения анимации
    this.elements.wrapper.addEventListener("transitionend", () => {
      this.isTransitioning = false;
    });
  }

  private initPagination(): void {
    this.elements.pagination.innerHTML = "";
    if (this.totalSlides < 2) {
      return; // Не создаем пагинацию, если только один слайд
    }
    this.elements.slides.forEach((_, index) => {
      const bullet = document.createElement("div");
      bullet.classList.add("pagination-bullet");
      bullet.dataset.index = index.toString();
      bullet.addEventListener("click", () => this.goToSlide(index));
      this.elements.pagination.appendChild(bullet);
      this.paginationBullets.push(bullet);
    });
    this.updatePagination();
  }

  private updateSlide(): void {
    if (this.isTransitioning) return; // Предотвращаем множественные переключения
    this.isTransitioning = true;

    this.elements.slides.forEach((slide: HTMLElement, index: number) => {
      slide.classList.toggle("active", index === this.currentIndex);
    });
    this.updatePagination();
  }

  private updatePagination(): void {
    if (this.totalSlides < 2) return;
    this.paginationBullets.forEach((bullet, index) => {
      bullet.classList.toggle("active", index === this.currentIndex);
    });
  }

  private setupAutoplay(): void {
    if (this.options.autoplay && this.totalSlides > 1) {
      this.startAutoplay();
      this.elements.container.addEventListener("mouseenter", () => this.stopAutoplay());
      this.elements.container.addEventListener("mouseleave", () => this.startAutoplay());
      this.elements.prevButton.addEventListener("click", () => this.stopAutoplay());
      this.elements.nextButton.addEventListener("click", () => this.stopAutoplay());
      this.paginationBullets.forEach((bullet) => bullet.addEventListener("click", () => this.stopAutoplay()));
    }
  }

  private startAutoplay(): void {
    if (this.autoplayInterval || this.totalSlides < 2) return;
    this.autoplayInterval = window.setInterval(() => {
      this.next();
    }, this.options.autoplaySpeed);
  }

  private stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  public prev(): void {
    if (this.isTransitioning || this.totalSlides < 2) return;
    this.currentIndex = this.options.loop ? (this.currentIndex - 1 + this.totalSlides) % this.totalSlides : Math.max(this.currentIndex - 1, 0);
    this.updateSlide();
  }

  public next(): void {
    if (this.isTransitioning || this.totalSlides < 2) return;
    this.currentIndex = this.options.loop ? (this.currentIndex + 1) % this.totalSlides : Math.min(this.currentIndex + 1, this.totalSlides - 1);
    this.updateSlide();
  }

  public goToSlide(index: number): void {
    if (this.isTransitioning || this.totalSlides < 2) return;
    this.currentIndex = this.options.loop ? index % this.totalSlides : Math.max(0, Math.min(index, this.totalSlides - 1));
    this.updateSlide();
  }

  public destroy(): void {
    // Очищаем интервал автопрокрутки
    this.stopAutoplay();
    // Удаляем обработчики событий
    this.elements.prevButton.removeEventListener("click", () => this.prev());
    this.elements.nextButton.removeEventListener("click", () => this.next());
    this.elements.container.removeEventListener("mouseenter", () => this.stopAutoplay());
    this.elements.container.removeEventListener("mouseleave", () => this.startAutoplay());
    this.paginationBullets.forEach((bullet) => bullet.removeEventListener("click", () => this.goToSlide(parseInt(bullet.dataset.index!))));
    this.elements.wrapper.removeEventListener("transitionend", () => {
      this.isTransitioning = false;
    });
  }
}
