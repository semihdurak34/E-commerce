const categoryList = document.querySelector(".category-list");
const productList = document.querySelector(".product-list");
const sepetButton = document.querySelector("#sepet");
const modal = document.querySelector(".modal-wrapper");
const closeImage = document.querySelector("#close");
const totalPrice = document.getElementById("totalPrice");
const modalItem = document.querySelector(".modal-list");

document.addEventListener("DOMContentLoaded", fetchCategories);
document.addEventListener("DOMContentLoaded", fetchProducts);
function fetchCategories() {
  fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 4).forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category-card");
        categoryDiv.innerHTML = `
        <img src="${category.image}"/>
        <span>${category.name}</span>
        `;
        categoryList.appendChild(categoryDiv);
      })
    )
    .catch((err) => console.error(err));
}

function fetchProducts() {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((data) =>
      data.slice(0, 25).forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
      <img src="${product.images[1]}" alt="" />
            <p>${product.title}</p>
            <p>${product.category.name}</p>
            <div class="info-table">
              <span>$ ${product.price}</span>
              <button onclick="sepeteEkle({name:'${product.title}',id:'${product.id}', price:'${product.price}',amount:1})">Sepete Ekle</button>
            </div>`;
        productList.appendChild(productDiv);
      })
    )
    .catch((err) => console.log("hata var"));
}
var basket = [];
let totalAmount = 0;
const addBasket = () => {
  basket.forEach((item) => {
    const basketItem = document.createElement("div");
    basketItem.classList.add("sepetItem");
    basketItem.innerHTML = `
    
        
          <h2>${item.name}</h2>
          <h2> $  ${item.price}</h2>
          <b>${item.amount}</b>
        
        `;
    modalItem.appendChild(basketItem);
    totalAmount += Number(item.price) * item.amount;
  });
  totalPrice.innerText = totalAmount;
};

sepetButton.addEventListener("click", () => {
  toggleSepet();
  addBasket();
});
closeImage.addEventListener("click", () => {
  toggleSepet();
  modalItem.innerHTML = "";
});
//modalDiv.addEventListener("click", toggleKapat);

function toggleSepet() {
  modal.classList.toggle("active");
}
function toggleKapat() {
  modal.setAttribute("class", "modal-wrapper");
}

function sepeteEkle(param) {
  const foundItem = basket.find((item) => item.id == param.id);

  if (foundItem) {
    foundItem.amount += 1;
  } else {
    basket.push(param);
  }
  console.log(basket);
}
