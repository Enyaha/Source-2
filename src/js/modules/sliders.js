const sliders = (slides, dir, prev, next) => {
    let slideindex = 1;
    let paused = false;
    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        if (n > items.length) {
            slideindex = 1;
        }

        if (n < 1) {
            slideindex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[slideindex - 1].style.display = 'block'; 
    }

    showSlides(slideindex);

    function plusSlides(n) {
        showSlides(slideindex +=n);
    }

    try {
        const prevBtn = document.querySelector(prev);
        const nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideindex - 1].classList.remove('slideInLeft');
            items[slideindex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideindex - 1].classList.remove('slideInRight');
            items[slideindex - 1].classList.add('slideInLeft');
        });

    } catch(e) {}

    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(() => {
                plusSlides(1);
                items[slideindex - 1].classList.add('slideInDown');
            }, 3500);
        } else {
            paused = setInterval(() => {
                plusSlides(1);
                items[slideindex - 1].classList.remove('slideInRight');
                items[slideindex - 1].classList.add('slideInLeft');  
            }, 3500);
        }
    }

    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });

    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });
};

export default sliders;