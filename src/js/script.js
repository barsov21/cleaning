const selectList = [...document.querySelectorAll('.services__select')];

selectList.forEach(select => {
    const selectTitle = select.querySelector('.services__select-title');
    const selectLabels = select.querySelectorAll('.services__select-label');

    // Toggle menu
    selectTitle.addEventListener('click', () => {
        if ('active' === select.getAttribute('data-state')) {
            select.setAttribute('data-state', '');
        } else {
            select.setAttribute('data-state', 'active');
        }
    });

    // Close when click to option
    selectLabels.forEach(selectLabel => {
        selectLabel.addEventListener('click', (e) => {
            selectTitle.textContent = e.target.textContent;
            select.setAttribute('data-state', '');
        });
    });
});


// Menu

const menu = document.querySelector('.header__menu'),
    menuItem = document.querySelectorAll('.header__menu-item'),
    humburger = document.querySelector('.humburger');

humburger.addEventListener('click', () => {
    humburger.classList.toggle('humburger_active');
    menu.classList.toggle('header__menu_active');
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        humburger.classList.toggle('humburger_active');
        menu.classList.toggle('header__menu_active');
    });
});

// showInfo

const acc = document.querySelectorAll('.answers__item-title');

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let sibling = this.nextElementSibling;
        
        if (sibling.style.maxHeight) {
            sibling.style.maxHeight = null;
            // sibling.style.paddingTop = '0';
        } else {
            sibling.style.maxHeight = sibling.scrollHeight + "px";
            // sibling.style.paddingTop = '20px';
        }
    });
}

// Modal

const modalTrigger = document.querySelectorAll('[data-modal]'),
    overlay = document.querySelector('.overlay');

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
});

function openModal() {
    overlay.classList.add('show');
    overlay.classList.remove('hide');
    overlay.style.overflow = 'auto';
    document.body.style.overflow = 'hidden';
}


function closeModal() {
    overlay.classList.add('hide');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.getAttribute('data-close') == "") {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && overlay.classList.contains('show')) {
        closeModal();
    }
});


// Slider

const sliders = (slides, dir, prev, next) => {
    let slideIndex = 1;
    const items = document.querySelectorAll(slides);


    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        items[slideIndex - 1].style.display = 'block';
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }


    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });

        let initialPoint;
        let finalPoint;
        items.forEach(item => {
            item.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                initialPoint = e.changedTouches[0];
            }, false);
        });
        items.forEach(item => {
            item.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                finalPoint = e.changedTouches[0];
                let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
                let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
                if (xAbs > 20 || yAbs > 20) {
                    if (xAbs > yAbs) {
                        if (finalPoint.pageX < initialPoint.pageX) {
                            plusSlides(-1);
                            items[slideIndex - 1].style.transition = '.3s all';
                        } else {
                            plusSlides(1);
                            items[slideIndex - 1].style.transition = '.3s all';
                        }
                    }
                }
            }, false);
        });

    } catch (e) {}
};

sliders('.galery__item-desctop', '', '.galery__arrow-prev--desctop', '.galery__arrow-next--desctop');
sliders('.galery__item-mobile', '', '.galery__arrow-prev--mobile', '.galery__arrow-next--mobile');



// Видео

function video() {
    const play = document.querySelectorAll('.evaluate__button'),
            video = document.querySelector('#video'),
            modalVideo = document.querySelector('.popup-video');

    play.forEach(item => {
        item.addEventListener('click', () => {
            modalVideo.classList.add('popup--visible');
            document.body.style.overflow = 'hidden';
        });
    });

    modalVideo.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup--visible')) {
            modalVideo.classList.remove('popup--visible');
            video.pause();
            document.body.style.overflow = '';
        }
    });
}

video();




new Swiper('.swiper', {
    navigation: {
        nextEl: '.galery__arrow-next',
        prevEl: '.galery__arrow-prev'
    },

    slidesPerView: 3,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        }
    }
});


