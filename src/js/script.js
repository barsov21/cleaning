const selectSingle = document.querySelector('.services__select');
const selectSingle_title = selectSingle.querySelector('.services__select-title');
const selectSingle_labels = selectSingle.querySelectorAll('.services__select-label');

// Toggle menu

selectSingle_title.addEventListener('click', () => {
    if ('active' === selectSingle.getAttribute('data-state')) {
        selectSingle.setAttribute('data-state', '');
    } else {
        selectSingle.setAttribute('data-state', 'active');
    }
});


// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
    selectSingle_labels[i].addEventListener('click', (e) => {
        selectSingle_title.textContent = e.target.textContent;
        selectSingle[i].setAttribute('data-state', '');
    });
}


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
    } catch (e) {}
};

sliders('.galery__item', '', '.galery__arrow-prev', '.galery__arrow-next');

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
    if ( e.target.getAttribute('data-close') == "") {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code == "Escape" && overlay.classList.contains('show')) {
        closeModal();
    }
});