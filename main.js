
//Swiper functionality
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    //Break points for width wide screens
    breakpoints: {
        600: {
            slidesPerView: 3
        },
        898: {
            slidesPerView: 4
        },
        1024: {
            slidesPerView: 5
        }
    }
  });

  // Sortby button functionality
  const sortbyBtns = document.querySelectorAll('.sortby-btn');
  const categories = document.querySelector('.categories');
  const chevronDown = document.querySelector('.bx-chevron-down');
  const chevronUp = document.querySelector('.bx-chevron-up');


document.querySelector('.sortby').addEventListener('click', () => {
    let toggle = categories.classList.contains('show-categories');
    if (!toggle) {
        categories.classList.add('show-categories')
         chevronDown.style.display = 'none';
         chevronUp.style.display = 'inline-block';
    }
    else{         
        categories.classList.remove('show-categories');
        chevronDown.style.display = 'inline-block';
        chevronUp.style.display = 'none';
     }
})
