
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

// variables for nav toggle
const toggleBtn = document.querySelector('.toggle-btn');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const navItems = document.querySelectorAll('.nav-item');

//Show nav with toggle button
toggleBtn.addEventListener('click', () => {
    let checker = overlay.classList.contains('show-overlay');
    if (!checker) {
        overlay.classList.add('show-overlay');
    }
})
//Hide nav with close button
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show-overlay');
})

//Hide nav with nav items
navItems.forEach(btn => {
    btn.addEventListener('click', (e) => {
        overlay.classList.remove('show-overlay');
    })
})
