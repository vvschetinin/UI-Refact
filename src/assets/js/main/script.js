"use strict";

// Отключение возможности копирования

document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});

// Подгрузка видео на страницы

function lazyLoadVideo({ containerId, videoUrl, posterUrl, preload = "metadata", controls = false }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const video = document.createElement("video");
  video.classList.add("hero-video", "bg--cover");
  video.setAttribute("preload", preload);
  video.setAttribute("poster", posterUrl);
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.controls = controls;

  const source = document.createElement("source");
  source.src = videoUrl;
  source.type = "video/mp4";

  video.appendChild(source);
  container.appendChild(video);

  video.load();
  video.play().catch((err) => {
    console.warn("Автовоспроизведение заблокировано браузером.", err);
  });
}

// Проверяем, на какой странице мы сейчас
if (document.getElementById("hero-figure")) {
  lazyLoadVideo({
    containerId: "hero-figure",
    videoUrl: "/assets/video/careers.mp4",
    posterUrl: "/assets/images/hero/main-hero.webp",
    preload: "metadata",
  });
}

if (document.getElementById("hero-figure-contact")) {
  lazyLoadVideo({
    containerId: "hero-figure-contact",
    videoUrl: "/assets/video/contacts/contact.mp4",
    posterUrl: "/assets/images/contacts/bg-contacts.webp",
    preload: "auto",
    controls: true,
  });
}
