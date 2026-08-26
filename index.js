
//header scroll fixing

let header =document.querySelector('header');

let menu =document.querySelector('#menu-icon');

let navbar =document.querySelector('.navbar'); 

window.addEventListener('scroll',function(){
  header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onscroll = function() {
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}


// swiper
var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  });

var toursSwiper = new Swiper(".places-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".places-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }
  });

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

// Integrate Lenis with GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// GSAP scroll trigger animations
gsap.from(".places .heading h1", {
  scrollTrigger: {
    trigger: ".places",
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 1,
});

gsap.from(".places-swiper .box", {
  scrollTrigger: {
    trigger: ".places-swiper",
    start: "top 85%",
  },
  opacity: 0,
  y: 60,
  stagger: 0.15,
  duration: 1.2,
  ease: "power2.out"
});

// Immersive Pinned Video Section Timeline
const videoTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".video",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: true,
    anticipatePin: 1,
  }
});

// Scale background image from zoomed-in (1.5) down to normal (1.0)
videoTL.to(".video-container img", {
  scale: 1,
  ease: "none",
}, 0);

// Animate text elements: Fade & Zoom in
videoTL.fromTo(".video-title", 
  { opacity: 0, scale: 0.8 },
  { opacity: 1, scale: 1, ease: "power2.out", duration: 0.5 }, 
  0.1
);

videoTL.fromTo(".video-subtitle", 
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 }, 
  0.2
);

// Fade out everything at the end of the pin
videoTL.to(".video-content", {
  opacity: 0,
  scale: 1.1,
  duration: 0.4,
  ease: "power2.in"
}, 0.9);

videoTL.to(".video-container img", {
  filter: "brightness(0.4)",
  duration: 0.4,
}, 0.9);

gsap.from(".about-text", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  opacity: 0,
  x: -50,
  duration: 1,
});

gsap.from(".about-img", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  opacity: 0,
  x: 50,
  duration: 1,
});

gsap.from(".contact .heading h1, .contact .heading p", {
  scrollTrigger: {
    trigger: ".contact",
    start: "top 80%",
  },
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 0.8,
});

gsap.from(".contact-info", {
  scrollTrigger: {
    trigger: ".contact-container",
    start: "top 80%",
  },
  opacity: 0,
  x: -40,
  duration: 1,
});

gsap.from(".contact-form", {
  scrollTrigger: {
    trigger: ".contact-container",
    start: "top 80%",
  },
  opacity: 0,
  x: 40,
  duration: 1,
});

// Packages details panel grid scroll reveal animations
gsap.from(".grid-cell", {
  scrollTrigger: {
    trigger: ".itinerary-grid",
    start: "top 80%",
  },
  opacity: 0,
  y: 40,
  stagger: 0.1,
  duration: 1,
  ease: "power3.out"
});

// Image hover scale setup
document.querySelectorAll(".grid-cell").forEach((cell) => {
  const img = cell.querySelector(".cell-image img");
  if (img) {
    cell.addEventListener("mouseenter", () => {
      gsap.to(img, { scale: 1.05, duration: 0.6, ease: "power2.out" });
    });
    cell.addEventListener("mouseleave", () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
    });
  }
});

// FAQ Accordion click toggler
document.querySelectorAll(".faq-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".faq-item");
    const isActive = item.classList.contains("active");
    
    // Close other items
    document.querySelectorAll(".faq-item").forEach((el) => {
      el.classList.remove("active");
    });
    
    // Toggle active on clicked item
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// GSAP Animations for new sections
gsap.from(".perk-cell", {
  scrollTrigger: {
    trigger: ".perks-grid",
    start: "top 85%",
  },
  opacity: 0,
  y: 35,
  stagger: 0.1,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".diary-item", {
  scrollTrigger: {
    trigger: ".visual-diary-grid",
    start: "top 85%",
  },
  opacity: 0,
  scale: 0.9,
  stagger: 0.08,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".faq-item", {
  scrollTrigger: {
    trigger: ".faq-container",
    start: "top 85%",
  },
  opacity: 0,
  y: 25,
  stagger: 0.08,
  duration: 0.8,
  ease: "power3.out"
});


  