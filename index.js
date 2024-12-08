import GLSlideshow from './gl-slideshow.module.js';

const slideshow = new GLSlideshow(
    ['./1.jpeg', './2.jpeg'],
    {
        canvas: document.getElementById('canvas'),
        duration: 1000,
        interval: 5000,
        effect: 'crossZoom'
    }
);

// effect randomizer
const effects = ['crossFade', 'crossZoom', 'directionalWipe', 'wind', 'ripple', 'pageCurl'];
slideshow.addEventListener('transitionEnd', function () {
    slideshow.setEffect(effects[Math.floor(Math.random() * effects.length)]);
});

// resize
$(window).on("resize", function () {
    slideshow.setSize($(this).width(), $(this).height());
}).trigger('resize');