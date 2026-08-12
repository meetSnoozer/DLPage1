document.addEventListener("DOMContentLoaded", function() {

    const images = [
        "gamesample1.png",
        "gamesample2.png",
        "gamesample3.png",
        "gamesample4.png",
        "gamesample5.png"
    ];

    let current = 0;
    let showingBg1 = true;

    const bg1 = document.querySelector(".bg1");
    const bg2 = document.querySelector(".bg2");

    bg1.style.backgroundImage = `url('${images[0]}')`;

    setInterval(() => {
        current = (current + 1) % images.length;

        if (showingBg1) {
            bg2.style.backgroundImage = `url('${images[current]}')`;
            bg2.style.opacity = 1;
            bg1.style.opacity = 0;
        } else {
            bg1.style.backgroundImage = `url('${images[current]}')`;
            bg1.style.opacity = 1;
            bg2.style.opacity = 0;
        }

        showingBg1 = !showingBg1;

    }, 5000);
});