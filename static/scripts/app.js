const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const audioMusic = document.getElementById('audioMusic');
audioMusic.play();
audioMusic.volume = 1.0;
audioMusic.muted = false;

const btnGrayscale = document.getElementById('btnGrayscale');
btnGrayscale.addEventListener('click', e => {
    grayscale = !grayscale;
    btnGrayscale.textContent = grayscale ? 'invert_colors_off' : 'invert_colors'
});

const btnMute = document.getElementById('btnMute');
btnMute.addEventListener('click', e => {
    if(audioMusic.paused) {
        audioMusic.play();
        audioMusic.volume = 1.0;
        audioMusic.muted = true;
    }

    audioMusic.muted = !audioMusic.muted;
    btnMute.textContent = audioMusic.muted ? 'volume_off' : 'volume_up'
});

const animations = [
    {name: 'zoom-in', min_time: 0.1, max_time: 0.15},
    {name: 'zoom-out', min_time: 0.1, max_time: 0.15},
    {name: 'slide-in_left', min_time: 0.15, max_time: 0.2},
    {name: 'slide-in_top', min_time: 0.15, max_time: 0.2},
    {name: 'slide-in_bottom', min_time: 0.15, max_time: 0.2},
    {name: 'slide-in_right', min_time: 0.15, max_time: 0.2},
    {name: 'slide-in_topleft', min_time: 0.15, max_time: 0.2},
    {name: 'slide-in_bottomleft', min_time: 0.15, max_time: 0.2},
    {name: 'slide-in_topright', min_time: 0.15, max_time: 0.2},
    {name: 'slide-in_bottomright', min_time: 0.15, max_time: 0.2},
    {name: 'rotate_cw', min_time: 0.1, max_time: 0.15},
    {name: 'rotate_ccw', min_time: 0.1, max_time: 0.15},
];

function randomInt(min, max) {
    return min + Math.ceil(Math.random() * (max - min));
}

function next() {
    activeImageElement.parentElement.style.display = 'none';
    activeImageElement = (activeImageElement === img1 ? img2 : img1);
    activeImageElement.parentElement.style.display = 'block';

    const containerElement = activeImageElement.parentElement;
    let animationIndex = randomInt(0, animations.length - 1);
    // Quick hack for weighting the randomness of the animations
    let rnd = Math.random();
    switch(true) {
        case rnd <= 0.33 || audioMusic.currentTime < 4.0: // stfu
            animationIndex = audioMusic.currentTime < 4 ? 0 : randomInt(0, 1);
            break;
        case rnd <= 0.66:
            animationIndex = randomInt(2, 9);
            break;
        default:
            animationIndex = randomInt(10, 11);
    }

    const animation = animations[animationIndex];
    const animationDuration = animation.min_time + (Math.random() * (animation.max_time - animation.min_time));
    containerElement.style.animation = `${animation.name} ${animationDuration}s 1`;
    containerElement.style.animationTimingFunction = 'ease-in';

    let imageIndex = lastImageIndex;
    while(imageIndex === lastImageIndex) imageIndex = randomInt(0, images.length - 1);
    lastImageIndex = imageIndex;
    activeImageElement.src = images[imageIndex].src;
    activeImageElement.style.filter = grayscale ? 'grayscale(100%)' : '';
}

const imagesCount = 40;
const images = [];
for(let i = 0; i < imagesCount; ++i) {
    images[i] = new Image();
    images[i].src = `static/images/${i + 1}.png`
}

let activeImageElement = img2;
let lastImageIndex = -1;
let grayscale = false;

// stfu
img1.parentElement.addEventListener('animationend', e => setTimeout(next, audioMusic.currentTime < 4.0 ? 400 : randomInt(150, 250)));
img2.parentElement.addEventListener('animationend', e => setTimeout(next, audioMusic.currentTime < 4.0 ? 400 : randomInt(150, 250))); 
window.addEventListener('load', e => setTimeout(next, 100));