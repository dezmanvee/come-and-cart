// Sortby button functionality
const sortbyBtns = document.querySelectorAll(".sortby-btn");
const categories = document.querySelector(".categories");
const chevronDown = document.querySelector(".bx-chevron-down");
const chevronUp = document.querySelector(".bx-chevron-up");
const collectionContainer = document.querySelector(".collection-ctn");
const totalPrice = document.querySelector('.total-price');
const cartCount = document.querySelector('.cart-count');
const productInCartContainer = document.querySelector('.cart');
const cartContent = document.querySelector('.cart-content');
const cartOverlay = document.querySelector('.cart-overlay');
const cartButton = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.cart-close');
const detailsContainer = document.querySelector('.details-ctn');
const detailsOverlay = document.querySelector('.details-overlay-outer');
const detailsBackBtn = document.querySelector('.go-back-btn');


document.querySelector(".sortby").addEventListener("click", () => {
  let toggle = categories.classList.contains("show-categories");
  if (!toggle) {
    categories.classList.add("show-categories");
    chevronDown.style.display = "none";
    chevronUp.style.display = "inline-block";
  } else {
    categories.classList.remove("show-categories");
    chevronDown.style.display = "inline-block";
    chevronUp.style.display = "none";
  }
});

// footer date
const currentYear = new Date().getFullYear();
document.querySelector(".date").innerHTML = `${currentYear}`;

// ===================
// Nav toggle functionality
// =====================

// variables for nav toggle
const toggleBtn = document.querySelector(".toggle-btn");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-btn");
const navItems = document.querySelectorAll(".nav-item");

//Show nav with toggle button
toggleBtn.addEventListener("click", () => {
  let checker = overlay.classList.contains("show-overlay");
  if (!checker) {
    overlay.classList.add("show-overlay");
  }
});
//Hide nav with close button
closeBtn.addEventListener("click", () => {
  overlay.classList.remove("show-overlay");
});

//Hide nav with nav items
navItems.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    overlay.classList.remove("show-overlay");
  });
});

// =========================
// APP JS
// =========================

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "3wgah40rlisz",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "-qHgeZttVy4S85tk6BRbCSYTb-hYViCvrHEr5FST150",
});
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

//   class Products{

//      async getProducts(){

//           try {
//             let entries = await client.getEntries({
//                 content_type: 'comeNcart'
//             })
//             let products = entries.items;
//              products = products.map(product => {
//                 const {title, price, description, category} = product.fields;
//                 const {id} = product.sys;
//                 const image = product.fields.image.fields.file.url;
//                 return {title, price, description, id, category, image}
//             })
//           return products
//           }catch(err){
//             console.log(err);
//           }
//       }
//   }

//   class UI {

//     displayProducts (productsArr) {
//           let productStore = '';
//           productsArr.forEach(product => {
//               productStore =
//                           productStore +
//                               ` <article class="product swiper-slide">
//                               <!-- product image -->
//                               <div class="image-ctn">
//                                   <img src=${product.image} alt=${product.title} class="product-img">
//                                   <div class="product-btns">
//                                       <span class="product-btn details" ${product.id}>details</span>
//                                       <span class="product-btn add-to-cart" ${product.id}>add to cart</span>
//                                   </div>
//                               </div>
//                               <!-- product details -->
//                               <div class="product-info-ctn">
//                                   <h5>${product.title}</h5>
//                                   <div class="rating-price">
//                                       <h6 class="price">$${product.price}</h6>
//                                       <div class="rating">
//                                           <i class='bx bxs-star'></i>4.5
//                                       </div>
//                                   </div>
//                               </div>
//                           </article>`
//           })
//           collectionContainer.innerHTML = productStore;
//       }
//   }

//     //loads the page and populates the DOM with the products
//     document.addEventListener('DOMContentLoaded', () => {
//         const comeNcartProduct = new Products()
//         const comeNcartUi = new UI()

//         comeNcartProduct
//             .getProducts()
//                 .then(products => comeNcartUi.displayProducts(products));
//     })
let cart = [];

async function getProducts() {
  try {
    let entries = await client.getEntries({
      content_type: "comeNcart",
    });
    let products = entries.items;
    products = products.map((product) => {
      const { title, price, description, category } = product.fields;
      const { id } = product.sys;
      const image = product.fields.image.fields.file.url;
      return { title, price, description, id, category, image };
    });
    return products;
  } catch (err) {
    console.log(err);
  }
}
function displayProducts(productsArr) {
  let productStore = "";
  productsArr.forEach((product) => {
    productStore =
      productStore +
      ` <article class="product swiper-slide">
                            <!-- product image -->
                            <div class="image-ctn">
                                <img src=${product.image} alt=${product.title} class="product-img">
                                <div class="product-btns">
                                    <span class="product-btn details" data-id=${product.id}>details</span>
                                    <span class="product-btn add-to-cart" data-id=${product.id}>add to cart</span>
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
                        </article>`;
  });
  collectionContainer.innerHTML = productStore;
}

function addToCartButton() {

  const addToCartBtns = [...document.querySelectorAll('.add-to-cart')]
    addToCartBtns.forEach(button => {
      const buttonId = button.dataset.id;
      const inCart = cart.find(item => item.id === buttonId)

      if (inCart) {
        button.innerText = 'in cart';
        button.disabled = true;
      }
      else{
        button.addEventListener('click', (e) => {
          e.target.innerText = 'in cart';
          e.target.disabled = true;

          // get product from storage and add a new property, amount
          const cartItem = {...getProduct(buttonId), amount: 1};
          // add product to cart
          cart = [...cart, cartItem]
          // update the cart 
          saveCart(cart);
          //update the total price in cart and the total count
          cartCountAndPrice(cart);
          //display the cart item
          displayCartItem(cartItem);
          //display cart count
          cartCountDisplay(cart)

        })
      }
    })
}

function detailsButton() {

  const detailsButtons = document.querySelectorAll('.details');
  detailsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const buttonId = e.target.dataset.id;
      const productDetails = getProduct(buttonId);
      const result = `<!-- image -->
      <div class="details-image-ctn">
          <img src=${productDetails.image} alt=${productDetails.title}>
      </div>
      <!-- info -->
      <div class="details-info-ctn">
          <h3>${productDetails.title}</h3>
          <!-- description -->
          <div class="description-rating-ctn">
              <p>
              ${productDetails.description}
              </p>
              <div>
                  <i class='bx bxs-star'></i>
                  <i class='bx bxs-star'></i>
                  <i class='bx bxs-star'></i>
                  <i class='bx bxs-star'></i>
                  <i class='bx bxs-star'></i>
                  <span>(121)</span>
              </div>
          </div>
          <!-- price -->
          <h4>$${productDetails.price}</h4>
          <!-- return and delivery -->
          <div class="return-delivery-ctn">
              <!-- delivery -->
              <div class="delivery">
                  <div>
                      <i class='bx bxs-truck'></i>
                  </div>
                  <div>
                      <h6>free delivery</h6>
                      <p>Enter your postal code for delivery avalaibility</p>
                  </div>
              </div>
              <!-- return -->
              <div class="return">
                  <div>
                      <i class='bx bxs-wallet'></i>
                  </div>
                  <div>
                      <h6>return delivery</h6>
                      <p>Free 30days delivery returns</p>
                  </div>
              </div>
          </div>
      </div>`
      detailsContainer.innerHTML = result;
      detailsOverlay.classList.add('show-details-overlay-outer')
    })
  })
}

detailsBackBtn.addEventListener('click', () => {
  detailsOverlay.classList.remove('show-details-overlay-outer')
})

cartButton.addEventListener('click', () => {
  cartOverlay.classList.add('show-cart-overlay');
})

closeCart.addEventListener('click', () => {
  cartOverlay.classList.remove('show-cart-overlay');
})


function displayCartItem(item) {
  const div = document.createElement('div');
  div.setAttribute('class', 'product-in-cart');
  div.innerHTML = `<!-- image -->
  <div class="product-in-cart-image">
      <img src=${item.image} alt=${item.title}>
  </div>
  <!-- info -->
  <div class="product-in-cart-info">
      <div class="product-in-cart-title">
        ${item.title}
      </div>
      <div class="product-in-cart-price">
          $${item.price}
      </div>
      <div class="remove">
          remove
          <i class='bx bx-trash'></i>
      </div>
  </div>
  <!-- number of single product -->
  <div class="product-in-cart-count">
      <span><i class='bx bx-minus'></i></span>
      <span class="amount">${item.amount}</span>
      <span><i class='bx bx-plus'></i></span>
  </div>`
  cartContent.appendChild(div);
}

function cartCountAndPrice (cartArr) {
  let cartTotalPrice = 0;
  let count = 0;
  cartArr.map(item => {
    count += item.amount;
    cartTotalPrice += item.price * item.amount
  })
  cartCount.innerText = `${count}`;
  totalPrice.innerText = `${parseFloat(cartTotalPrice.toFixed(2))}`
}

function cartCountDisplay(cartArr) {
  return cartArr.length > 0 ? cartCount.style.display = 'inline-block' :
  cartCount.style.display = 'none';
  
}

function saveProducts(productsArr) {
  localStorage.setItem("products", JSON.stringify(productsArr));
}

function getProduct(id) {
  const products = JSON.parse(localStorage.getItem('products'))
  return products.find(product => product.id === id)
}

function saveCart(cartArr) {
  localStorage.setItem('cart', JSON.stringify(cartArr));
}

document.addEventListener("DOMContentLoaded", () => {
  cartCountDisplay(cart);
  getProducts().then(products => {
    displayProducts(products);
    saveProducts(products);
  }).then(() => {
    addToCartButton()
    detailsButton()
  })
});
