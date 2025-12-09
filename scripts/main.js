document.addEventListener('DOMContentLoaded', () => {
    console.log('Consulting Center Script Loaded');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply animation to service sections and cards
    document.querySelectorAll('.service-section, .inquiry-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 3-Item Auto-Slider Functionality (Page Scroll)
    const casesWrappers = document.querySelectorAll('.cases-wrapper');

    casesWrappers.forEach(wrapper => {
        const slider = wrapper.querySelector('.case-list');
        const prevBtn = wrapper.querySelector('.slider-btn.prev');
        const nextBtn = wrapper.querySelector('.slider-btn.next');

        if (!slider) return;

        let autoPlayInterval;
        const autoPlayDelay = 3000; // 3 seconds

        const moveSlider = (direction) => {
            const scrollAmount = slider.clientWidth; // Scroll one full container width (3 items)
            const maxScroll = slider.scrollWidth - slider.clientWidth;
            const tolerance = 10;

            if (direction === 'next') {
                if (slider.scrollLeft >= maxScroll - tolerance) {
                    slider.scrollTo({ left: 0, behavior: 'smooth' }); // Return to start
                } else {
                    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            } else {
                if (slider.scrollLeft <= tolerance) {
                    slider.scrollTo({ left: maxScroll, behavior: 'smooth' }); // Go to end
                } else {
                    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        };

        const startAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                moveSlider('next');
            }, autoPlayDelay);
        };

        // Button Listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                moveSlider('next');
                startAutoPlay(); // Reset timer
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                moveSlider('prev');
                startAutoPlay(); // Reset timer
            });
        }

        // Initialize Auto-Play
        startAutoPlay();

        // Pause on hover
        slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        slider.addEventListener('mouseleave', startAutoPlay);
    });
});
