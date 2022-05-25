class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts(); //рекомендация, чтобы метод был вызван в текущем классе
    this.render(); //вывод товаров на страницу
    this.totalProductPrice = 0;
  }
  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000, img: "./img/1.jpeg" },
      { id: 2, title: "Mouse", price: 20, img: "./img/2.jpeg" },
      { id: 3, title: "Keyboard", price: 200, img: "./img/3.jpeg" },
      { id: 4, title: "Gamepad", price: 50, img: "./img/4.jpeg" },
      { id: 4, title: "Gamepad", price: 50, img: "./img/4.jpeg" },
      { id: 4, title: "Gamepad", price: 50, img: "./img/4.jpeg" },
      { id: 4, title: "Gamepad", price: 50, img: "./img/4.jpeg" },
    ];
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
    for (let i = 0; i < this.goods.length; i++) {
      this.totalProductPrice += this.goods[i].price;
    }
    return this.totalProductPrice;
    // console.log(
    //   `Суммарная стоимость всех товаров равна ${this.totalProductPrice}`
    // );
  }
}

class ProductItem {
  constructor(product) {
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.img = product.img;
  }
  render() {
    return `<div class="product-item">
                <img src=${this.img}>
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
  }
}

class CartList {
  constructor(container = ".cart") {
    this.container = container;
    this.goodsInCart = [];
  }

  renderCart() {
    this.container.insertAdjacentHTML("beforeend", `<ul class"cartList"></ul>`);
  }

  addItemToCartList(cartItem) {
    this.cartItem = cartItem;
    this.count = 0;
  }

  renderProductsIncart() {}

  renderNewProductsInCart() {}

  removeProductFromCart() {}

  getTotalCartCount() {}

  getTotalCartPrice() {}
}

class CartItem extends ProductItem {
  constructor(product) {
    super(product);
    this.count = 0;
  }

  createCartItem() {
    const cartItem = new CartItem(product);
    return cartItem;
  }

  render() {
    return `<li class="cart__item">
              <img src=${this.img}>
              <h3>${this.title}</h3>
              <p>${this.price}</p>
            </li>`;
  }
}

let list = new ProductList();

list.getTotalProoductsPrice();

const cart = new CartList();

//const products = [
//    {id: 1, title: 'Notebook', price: 2000},
//    {id: 2, title: 'Mouse', price: 20},
//    {id: 3, title: 'Keyboard', price: 200},
//    {id: 4, title: 'Gamepad', price: 50},
//];
//
//const renderProduct = (product,img='https://placehold.it/200x150') => {
//    return `<div class="product-item">
//                <img src="${img}">
//                <h3>${product.title}</h3>
//                <p>${product.price}</p>
//                <button class="buy-btn">Купить</button>
//            </div>`
//};
//const renderPage = list => document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//
//renderPage(products);
