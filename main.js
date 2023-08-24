
// Sortby button functionality
  const sortbyBtns = document.querySelectorAll('.sortby-btn');
  const categories = document.querySelector('.categories');
  const chevronDown = document.querySelector('.bx-chevron-down');
  const chevronUp = document.querySelector('.bx-chevron-up');
  const collectionContainer = document.querySelector('.collection-ctn');

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



// =========================
// APP JS
// =========================


const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: '3wgah40rlisz',
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: '-qHgeZttVy4S85tk6BRbCSYTb-hYViCvrHEr5FST150',
  })
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token
  
  
  // client
  //   .getEntries({
  //     content_type: 'comeNcart'
  //   })
  //   .then(entries => {
  //     let products = entries.items;
  //     products = products.map(product => {
  //         const {title, price, description, category} = product.fields;
  //         const {id} = product.sys;
  //         const image = product.fields.image.fields.file.url;
  //         return {title, price, description, id, category, image}
  //     })
  //     console.log(products);
  //   });
  
  class Products{

     async getProducts(){
    
          try {
            let entries = await client.getEntries({
                content_type: 'comeNcart'
            })
            let products = entries.items;
             products = products.map(product => {
                const {title, price, description, category} = product.fields;
                const {id} = product.sys;
                const image = product.fields.image.fields.file.url;
                return {title, price, description, id, category, image}
            })
          return products
          }catch(err){
            console.log(err);
          }
      }
  }
   
  class UI {

    displayProducts (productsArr) {
          let productStore = '';
          productsArr.forEach(product => {
              productStore = 
                          productStore + 
                              ` <article class="product swiper-slide">
                              <!-- product image -->
                              <div class="image-ctn">
                                  <img src=${product.image} alt=${product.title} class="product-img">
                                  <div class="product-btns">
                                      <span class="product-btn details" ${product.id}>details</span>
                                      <span class="product-btn add-to-cart" ${product.id}>add to cart</span>
                                  </div>
                              </div>
                              <!-- product details -->
                              <div class="product-info-ctn">
                                  <h5>${product.title}</h5>
                                  <div class="rating-price">
                                      <h6 class="price">$${product.price}</h6>
                                      <div class="rating">
                                          <i class='bx bxs-star'></i>4.5
                                      </div>
                                  </div>
                              </div>
                          </article>`
          })
          collectionContainer.innerHTML = productStore;
      }
  }





    //loads the page and populates the DOM with the products
    document.addEventListener('DOMContentLoaded', () => {
        const comeNcartProduct = new Products()
        const comeNcartUi = new UI()

        comeNcartProduct
            .getProducts()
                .then(products => comeNcartUi.displayProducts(products));
    })  
