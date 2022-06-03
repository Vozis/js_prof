const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

// ==========================================
class List {
  /**
   *
   * @param {*} url путь к json файлу
   * @param {*} container в данны блок выводим товары каталога или корзины
   * @param {*} list для возможностей вывода каталога товаров и корзины
   */
  constructor(url, container, list = list2) {
    this.container = container;
    this.list = list;
    this.url = url;
    this.goods = []; // товары из json
    this.allProducts = []; // массив объектов соответсвующего класса
    this._init();
  }

  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then((text) => text.json())
      .catch((error) => {
        console.error(error);
      });
  }

  handleData(data) {
    this.goods = data;
    this.render();
  }

  calcSum() {
    return this.allProducts.reduce((s, el) => (s += el.price), 0);
  }

  render() {
    console.log(this.container.name); // имя конструтора = имя класса

    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productEl = new this.list[this.constructor.name](product);
      this.allProducts.push(productEl);
      block.insertAdjacentHTML("beforeend", productEl.render());
      // block.innerHTML += item.render();
    }
  }

  _init() {
    return false;
  }
}

//============================================================================
class Item {
  constructor(el, img = "https://via.placeholder.com/200x150") {
    this.title = el.product_name;
    this.price = el.price;
    this.id = el.id_product;
    this.img = img;
  }

  render() {
    // генерация товара для каталога товаров
    return `<div class="product-item" data-id="${this.id}">
    <img src="${this.img}" alt="Some img">
    <div class="desc">
      <h3>${this.title}</h3>
      <p>${this.price} $</p>
      <button class="buy-btn" 
      data-id="${this.id}" 
      data-name="${this.title}" 
      data-price="${this.price}">Купить</button>
    </div>
  </div>`;
  }
}
//============================================================================

class ProductsList extends List {
  constructor(cart, container = ".products", url = "/catalogData.json") {
    super(url, container);
    this.cart = cart;
    this.getJson().then((data) => this.handleData(data));
  }

  _init() {
    document
      .querySelector(this.container)
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("buy-btn")) {
          console.log(event.target);
          this.cart.addProduct(event.target);
        }
      });
  }

  /*
  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then((text) => text.json())
      .catch((error) => {
        console.error(error);
      });
  }
  */

  /*
  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
      // block.innerHTML += item.render();
    }
  }
  */

  /*
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
  */
}

//==========================================
class ProductItem extends Item {
  /*
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
  */
}
// ============================================
class Cart extends List {
  constructor(container = ".cart", url = "/getBasket.json") {
    super(url, container);
    this.getJson().then((data) => this.handleData(data.contents));
  }

  _init() {
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

  /*
  getCartGoods() {
    return fetch(`${API}/getBasket.json`)
      .then((text) => text.json())
      .catch((error) => {
        console.error(error);
      });
  }
  */

  /*
  render() {
    const block = document.querySelector(this.container);
    // console.log(cartListEl);
    for (let product of this.goodsInCart) {
      const item = new CartItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
    }
  }
  */

  addProduct(element) {
    this.getJson(`${API}/addToBasket.json`).then((data) => {
      if (data.result === 1) {
        let productId = +element.dataset.id;
        let find = this.allProducts.find((product) => product.id === productId);

        if (find) {
          find.quantity++;
          this._updateCart(find);
        } else {
          let product = {
            id: productId,
            price: +element.dataset.price,
            title: element.dataset.name,
            quantity: 1,
          };
          this.goods = [product];
          this.render();
        }
      } else {
        alert("Доступ запрещен!");
      }
    });

    // document.querySelector(".products").addEventListener("click", (event) => {
    //   if (!event.target.classList.contains("buy-btn")) {
    //     return;
    //   }
    //   const goodProduct = event.target.closest(".product-item");
    //   console.log(goodProduct);
    //   cart.addItemToCartList(goodProduct);
    // });

    // for (let product of list.goods) {
    //   if (product.id_product == goodProduct.dataset.id) {
    //     const newGood = new CartItem(product);
    //     this.goodsInCart.push(newGood);
    //     this.goodsInCart.render();
    //   }
    // }
  }

  _updateCart(product) {
    let block = document.querySelector(`.cart__item[data-id="${product.id}"]`);
    block.querySelector(
      ".cart__quantity"
    ).textContent = `Quantity: ${product.quantity}`;
    block.querySelector(".cart__total-price").textContent = `${
      product.quantity * product.price
    }`;
  }

  removeProduct(element) {
    this.getJson(`${API}/deleteFromBasket.json`).then((data) => {
      if (data.result === 1) {
        let productId = +element.dataset.id;
        let find = this.allProducts.find((product) => product.id === productId);

        if (find.quantity > 1) {
          find.quantity--;
          this._updateCart(find);
        } else {
          this.allProducts.splice(this.allProducts.indexOf(find), 1);
          document
            .querySelector(`.cart__item[data-id="${productId}"]`)
            .remove();
        }
      } else {
        alert("ERROR");
      }
    });
  }
}

//==========================================

class CartItem extends Item {
  constructor(el, img = "https://via.placeholder.com/200x150") {
    super(el, img);
    this.quantity = el.quantity;
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

const list2 = {
  ProductsList: ProductItem,
  Cart: CartItem,
};

let cart = new Cart();
let products = new ProductsList(cart);

// // list.getTotalProoductsPrice();
