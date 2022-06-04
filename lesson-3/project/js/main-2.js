const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// ==========================================
class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this.getProducts().then((data) => {
      this.goods = data;
      this.render();
    });
  }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((text) => text.json())
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
      // block.innerHTML += item.render();
    }
  }

  getTotalProoductsPrice() {
    // for (let i = 0; i < this.goods.length; i++) {
    //   this.totalProductPrice += this.goods[i].price;
    // }

    // for (let goodEl of this.goods) {
    //   this.totalProductPrice += goodEl.price;
    // }
    // return this.totalProductPrice;

    // this.goods.forEach((el) => {
    //   this.totalProductPrice += el.price;
    // });
    // return this.totalProductPrice;

    console.log(this.goods.reduce((s, el) => (s += el.price), 0));
    return this.goods.reduce((s, el) => (s += el), 0);
  }
}

//==========================================
class ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.product_name;
    this.price = product.price;
    this.id = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
            <img src="${this.img}" alt="Some img">
            <div class="desc">
              <h3>${this.title}</h3>
              <p>${this.price} $</p>
              <button class="buy-btn">Купить</button>
            </div>
          </div>`;
  }
}
// ============================================
class CartList {
  constructor(container = ".cart") {
    this.container = container;
    this.goodsInCart = [];
    this.getCartGoods().then((data) => {
      this.goodsInCart = data.contents;
      console.log(this.goodsInCart);
      this.render();
    });
  }

  getCartGoods() {
    return fetch(`${API}/getBasket.json`)
      .then((text) => text.json())
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    block.insertAdjacentHTML("beforeend", `<ul class="cartList"></ul>`);
    const cartListEl = document.querySelector(".cartList");
    // console.log(cartListEl);
    for (let product of this.goodsInCart) {
      const item = new CartItem(product);
      cartListEl.insertAdjacentHTML("beforeend", item.render());
    }
  }

  addItemToCartList(goodProduct) {
    for (let product of list.goods) {
      if (product.id_product == goodProduct.dataset.id) {
        const newGood = new CartItem(product);
        this.goodsInCart.push(newGood);
        this.goodsInCart.render();
      }
    }

    // const newGood = new CartItem(
    //   (list.goods.id_product = `${goodProduct.dataset.id}`)
    // );
    // console.log(newGood);
    // this.goodsInCart.push(newGood);
  }

  renderProductsIncart() {}

  renderNewProductsInCart() {}

  removeProductFromCart(removeProduct) {
    console.log(this.goodsInCart.indexOf(removeProduct));
    this.goodsInCart.splice(this.goodsInCart.indexOf(removeProduct), 1);
  }

  getTotalCartCount() {}

  getTotalCartPrice() {}
}

//==========================================

class CartItem extends ProductItem {
  render() {
    return `<li class="cartList__item" data-id="${this.id}">
              <h3>${this.title}</h3>
              <p>${this.price}</p>
              <button class="remove-btn">Удалить</button>
            </li>`;
  }
}

let list = new ProductList();

// list.getTotalProoductsPrice();

const cart = new CartList();

document.querySelector(".products").addEventListener("click", (event) => {
  if (!event.target.classList.contains("buy-btn")) {
    return;
  }
  const goodProduct = event.target.closest(".product-item");
  console.log(goodProduct);
  cart.addItemToCartList(goodProduct);
});

document.querySelector(".cart").addEventListener("click", (event) => {
  if (!event.target.classList.contains("remove-btn")) {
    return;
  }
  const removeProduct = event.target.closest(".cartList__item");
  cart.removeProductFromCart(removeProduct);
});
