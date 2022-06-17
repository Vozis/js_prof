const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

//============================================================================

class ProductList {
  constructor(cart, container = ".products") {
    this.container = container;
    this.cart = cart;
    this.goods = [];
    this.allProducts = [];
    this._initProducts();
    this.getProducts().then((data) => {
      this.goods = data;
      this.render();
    });
  }

  _initProducts() {
    document
      .querySelector(this.container)
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("buy-btn")) {
          console.log(event.target);
          this.cart.addProduct(event.target);
        }
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
      this.allProducts.push(item);
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
              <button class="buy-btn" data-id="${this.id}">Купить</button>
            </div>
          </div>`;
  }
}
// ============================================
class CartList {
  constructor(container = ".cart") {
    this.container = container;
    this.goodsInCart = []; // массив товаров
    this.allProducts = [];
    this._initCart();
    this.getCartGoods().then((data) => {
      this.goodsInCart = data.contents;
      // console.log(this.goodsInCart);
      this.render();
    });
  }

  _initCart() {
    document.querySelector(".btn-cart").addEventListener("click", () => {
      document.querySelector(this.container).classList.toggle("hidden");
    });
    document
      .querySelector(this.container)
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
          this.removeProduct(event.target);
        }
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
    // console.log(cartListEl);
    for (let product of this.goodsInCart) {
      const item = new CartItem(product);
      this.allProducts.push(item);
      block.insertAdjacentHTML("beforeend", item.render());
    }
  }

  addProduct(product) {
    let productId = +product.dataset.id;
    let findEl = this.allProducts.find((product) => product.id === productId);
    if (findEl) {
      findEl.quantity++;
      this.updateCart(findEl);
    } else {
      let element = {
        id: productId,
        price: +product.dataset.price,
        title: product.dataset.name,
        quantity: 1,
      };
      this.goods = [element];
      this.render();
    }
  }

  removeProduct(product) {
    let productId = +product.dataset.id;
    let findEl = this.allProducts.find((product) => product.id === productId);
    if (findEl.quantity > 1) {
      findEl.quantity--;
      this.updateCart(findEl);
    } else {
      this.allProducts.splice(this.allProducts.indexOf(findEl), 1);
      document.querySelector(`.cart__item[data-id="${productId}"]`).remove();
    }
  }

  // const newGood = new CartItem(
  //   (list.goods.id_product = `${goodProduct.dataset.id}`)
  // );
  // console.log(newGood);
  // this.goodsInCart.push(newGood);

  updateCart(product) {
    let block = document.querySelector(`.cart__item[data-id="${product.id}"]`);
    block.querySelector(
      ".cart__quantity"
    ).textContent = `Quantity: ${product.quantity}`;
    block.querySelector(".cart__total-price").textContent = `${
      product.quantity * product.price
    }`;
  }
}

//==========================================

class CartItem extends ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    super(product, img);
    this.quantity = product.quantity;
  }

  render() {
    return `<div class="cart__item" data-id="${this.id}">
    <img class="cart__img" src="${this.img}" alt="Some img">
    <div class="cart__info">
    <h3 class="cart__title">${this.title}</h3>
    <p class="cart__price">${this.price}</p>
    <p class="cart__quantity">Quantity: ${this.quantity}</p>
    </div>
    <div class=cart__sum>
    <p class="cart__total-price">${this.quantity * this.price}</p>
    <button class="remove-btn" data-id="${this.id}">Удалить</button>
    </div>
  </div>`;
  }
}

const cart = new CartList();
let list = new ProductList(cart);
