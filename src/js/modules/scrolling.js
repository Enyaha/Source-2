const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    // Scrolling with raf

    let links = document.querySelectorAll('[href^="#"]');
    let speed = 0.2;
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let wihtTop = document.documentElement.scrollTop;
            let hash = this.hash;
            let toBlock = document.querySelector(hash).getBoundingClientRect().top;
            let start = null;

            requestAnimationFrame(step);

            function step(time) {
                if (start === null) {
                    start = time;
                }

                let progress = time - start;
                let r = (toBlock < 0 ? Math.max(wihtTop - progress/speed, wihtTop + toBlock) : Math.min(wihtTop + progress/speed, wihtTop + toBlock));

                document.documentElement.scrollTo(0, r);

                if (r != wihtTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });


    // Pure js scrolling

    // const element = document.documentElement;
    // const body = document.body;

    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event) {
    //         let scrollTop = Math.round(element.scrollTop || body.scrollTop);

    //         if (this.hash !== '') {
    //             event.preventDefault();
    //             let hashElement = document.querySelector(this.hash);
    //             let hashElementTop = 0;

    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothscroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // const smoothscroll = (from, to, hash) => {
    //     let timeInteval = 1;
    //     let prevScrollTop;
    //     let speed;

    //     if (to > from) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }

    //     let move = setInterval(function() {
    //         let scrollTop = Math.round(element.scrollTop || body.scrollTop);

    //         if ((prevScrollTop === scrollTop) || 
    //             (to > from && scrollTop >= to) || 
    //             (to < from && scrollTop <= to)) {
    //                 clearInterval(move);
    //                 history.replaceState(history.state, document.title, 
    //                                     location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInteval);
    // };
    // calcScroll();
};

export default scrolling;