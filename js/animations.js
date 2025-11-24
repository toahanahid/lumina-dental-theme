// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
const tl = gsap.timeline();

tl.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
})
    .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-buttons a', {
        y: 20,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.6');

// Scroll Animations for Sections

// Services
gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power3.out'
    });
});

// About Section
gsap.from('.about-img', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

gsap.from('#about .section-title, #about .lead, #about .list-unstyled li', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
    },
    x: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out'
});

// Contact Section
gsap.from('.contact-wrapper', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});
