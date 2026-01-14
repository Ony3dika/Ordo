import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

// Preloader Animation

// Logo
gsap.to(".ordo", {
  yPercent: -1000,
  duration: 1.5,
  delay: 0.4,
  opacity: 0.3,
  ease: "circ.inOut",
});

// Slides
let slides = document.querySelectorAll(".slide");
gsap.to(slides, {
  yPercent: -100,
  duration: 1.5,
  delay: 2,
  display: "hidden",
  stagger: {
    amount: 0.5,
    grid: [2, 1],
    ease: "circ.inOut",
    from: "center",
  },
});

document.fonts.ready.then(() => {
  // Hero Text Aniamtion
  let heroText = SplitText.create(".split", { type: "words" });
  gsap.from(heroText.words, {
    yPercent: 150,
    autoAlpha: 0,
    stagger: {
      amount: 0.5,
    },
    ease: "power2.out",
    duration: 1,
    opacity: 1,
    delay: 3.6,
    scrollTrigger: {
      trigger: ".split",
      start: "top 70%",
    },
  });

  // Other Text Animation
  const texts = document.querySelectorAll(".body-text");
  texts.forEach((text) => {
    let split = SplitText.create(text, { type: "lines" });
    gsap.from(split.lines, {
      autoAlpha: 0,
      yPercent: 150,
      duration: 1,
      ease: "power2",
      stagger: {
        amount: 0.5,
      },
      scrollTrigger: {
        trigger: text,
        start: "top 70%",
        // markers: true,
      },
    });
  });
});
