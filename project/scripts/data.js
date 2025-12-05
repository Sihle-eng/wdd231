import { boxesData } from './boxes-data.js';

function initializeSlider(boxConfig) {
    const boxElement = document.querySelector(`[data-box-id="${boxConfig.boxId}"]`);
    if (!boxElement) return;

    const sliderTrack = boxElement.querySelector('.slider-track');
    const prevBtn = boxElement.querySelector('.prev-button');
    const nextBtn = boxElement.querySelector('.next-button');

    let currentIndex = 0;
    let autoPlayInterval;

    sliderTrack.innerHTML = '';

    // Create slides
    boxConfig.images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        if (index === 0) slide.classList.add('active'); // only first visible

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        slide.appendChild(img);
        sliderTrack.appendChild(slide);
    });

    function goToSlide(index) {
        const slides = sliderTrack.querySelectorAll('.slide');

        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');

        currentIndex = index;
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % boxConfig.images.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + boxConfig.images.length) % boxConfig.images.length;
        goToSlide(prevIndex);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, boxConfig.interval || 3000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    boxElement.addEventListener('mouseenter', stopAutoPlay);
    boxElement.addEventListener('mouseleave', startAutoPlay);

    // Initialize
    goToSlide(0);
    startAutoPlay();
}

// Initialize all sliders
boxesData.boxes.forEach(box => initializeSlider(box));
