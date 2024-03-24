document.body.style.overflowY = "hidden";
let loadingText = document.querySelector('.loading-text');
setInterval(function() {
    if (loadingText.innerHTML == 'loading...')
        loadingText.innerHTML = "loading";
    else {
        loadingText.innerHTML += '.';
    }
}, 1000);

const styleSheet = document.styleSheets[0];
const body = document.querySelector('body');
const backgroundHeight = document.querySelector('.star-background').offsetHeight;

window.addEventListener('load', function() {
    setInterval(starFall, Math.floor(Math.random() * (4000 - 2200)) + 2200);
    setInterval(starTrail, 50);
});
$(window).on('load', function() {
    $(".loader").fadeOut(1000);
});

const toggle = document.getElementById('toggleTheme');

toggle.addEventListener('click', function() {
    const starBackground = document.querySelector('.star-background');
    this.classList.toggle('bi-moon');
    //light mode
    if(this.classList.toggle('bi-brightness-high-fill')) {
        starBackground.classList.remove('dark-mode');
        toggle.style.color = "#0054ac";
        toggle.style.transition = 'color 2s ease';
    }
    //dark mode
    else {
        starBackground.classList.add('dark-mode');
        toggle.style.color = "#d4efee";
        toggle.style.transition = 'color 2s ease';
    }
});

let j = 0;
function starFall() {
    let stars = document.createElement('div');
    stars.classList.add('star');
    let size = Math.floor(Math.random() * (6 - 1)) + 1;
    stars.style.fontSize = 8 * size + 4 + 'px';
    let xStartPos = (Math.random() * + innerWidth) / innerWidth * 100;
    stars.style.left = xStartPos + 'vw';
    stars.style.animationDuration = (Math.floor(Math.random() * (61 - 30)) + 30) + "s";

    let direction = Math.random() > 0.5 ? '-' : '';
    let speed = (Math.floor(Math.random() * (15 + 1)) - 1) + 2;
    let xEndPos = (Math.floor(Math.random() * (101 + 1)) - 1);
    const newKeyframeRule = `@keyframes anim${j} {
        to {
            transform: rotate(${direction}${speed}turn);
            top: 400vh;
            left: ${xEndPos}vw;
        }
    }`;
    j++;
    styleSheet.insertRule(newKeyframeRule, styleSheet.cssRules.length);
    stars.style.animation = `anim${j} ${stars.style.animationDuration} linear 1 forwards`;

    stars.addEventListener('click', (e) => {
        e.stopPropagation();
        stars.remove();

        for (let i = 0; i < 20; i++) {
            let pop = document.createElement('div');
            pop.classList.add('pop');
            pop.style.left = e.clientX - (Math.floor(Math.random() * (15 + 15)) - 15) + 'px';
            pop.style.top = e.clientY - (Math.floor(Math.random() * (15 + 15)) - 15) + window.scrollY + 'px';
            pop.style.fontSize = 3 * size + 'px';
            document.querySelector('.star-background').appendChild(pop);

            setTimeout(() => {
                pop.remove();
            }, 500);
        }
    });

    document.querySelector('.star-background').appendChild(stars);
}


function starTrail() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star) => {
        const rect = star.getBoundingClientRect();
        let x = rect.left;
        let y = rect.top;

        if (y >= backgroundHeight + 10) {
            star.remove();
        }

        const starWidth = rect.width;
        const starHeight = rect.height;
        const fontSize = window.getComputedStyle(star).getPropertyValue('font-size');

        if (fontSize <= '14') {
            x += Math.floor(Math.random() * 2) - 2;
        } else if (fontSize <= '22') {
            x += Math.floor(Math.random() * 4) - 4;
        } else if (fontSize <= '30') {
            x += Math.floor(Math.random() * 8) - 8;
        } else if (fontSize <= '38') {
            x += Math.floor(Math.random() * 14) - 14;
        } else if (fontSize <= '50') {
            x += Math.floor(Math.random() * 20) - 20;
        }
        x += (starWidth / 2);
        y += (starHeight / 2 + window.scrollY);

        let trail = document.createElement('div');
        trail.classList.add('trail');
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.querySelector('.star-background').appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000);
    });
}