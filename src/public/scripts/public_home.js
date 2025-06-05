const swiper = new Swiper('.swiper', {
    slidesPerView: 9,
    spaceBetween: 75,
    loop: true,
    speed: 5000,
    freeMode: true,
    autoplay: {
        delay: 0,
        reverseDirection: true,
        disableOnInteraction: false,
    },
});

document.getElementById('theme-switch').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');

    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : '';
})
