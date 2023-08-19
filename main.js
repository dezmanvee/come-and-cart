
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

// footer date
const currentYear = new Date().getFullYear();
document.querySelector('.date').innerHTML = `${currentYear}`;

// ===================
// Nav toggle functionality
// =====================

// variables
const toggleBtn = document.querySelector('.toggle-btn');
const overlay = document.querySelector('.overlay');
const navItems = document.querySelector('.nav-items');
const closeBtn = document.querySelector('.close-btn');

let checker = overlay.classList.contains('show-overlay');
toggleBtn.addEventListener('click', () => {
    // if (!checker) {
    //     overlay.classList.add('show-overlay');
    //     // toggleBtn.style.display = 'none';
    //     // closeBtn.style.display = 'block';
    // }
    // else{
    //     overlay.classList.remove('show-overlay');
    // }
    // overlay.classList.toggle('show-overlay');
})


