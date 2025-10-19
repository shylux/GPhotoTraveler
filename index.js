import GLSlideshow from './gl-slideshow.module.js';

const googlePhotoPickerEndpoint = 'https://photospicker.googleapis.com';

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

// initiate login
$(document).on('click', '#login', function () {
    let scope = 'https://www.googleapis.com/auth/photospicker.mediaitems.readonly';
    let redirectURL = 'http://localhost:63343/GPhotoTraveler/index.html';
    let clientID = '555416435103-dfnp4ccsrgeb9o6lqvouim2q793ddbcr.apps.googleusercontent.com';
    window.location = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=token&redirect_uri=${redirectURL}&client_id=${clientID}`;
});

// store access token
let fragment = new URLSearchParams(decodeURIComponent(window.location.hash.substring(1)));
if (fragment.has('error')) {
    console.error(fragment.get('error'));
}
if (fragment.has('access_token')) {
    console.log(fragment.get('access_token'));
    localStorage.setItem("access_token", fragment.get('access_token'));
}

// select photos
$(document).on('click', '#select', async function () {
    if (localStorage.getItem("access_token")) {
        // we have access!
        const response = await fetch(`${googlePhotoPickerEndpoint}/v1/sessions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                'Accept': 'application/json',
            },
        })
        const jsonResponse = await response.json();
        localStorage.setItem('session_id', jsonResponse.id);
        window.open(jsonResponse.pickerUri, '_blank').focus();
    }
});