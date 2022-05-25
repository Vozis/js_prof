const products = [
  { id: 1, title: "Notebook", price: 2000 },
  { id: 2, title: "Mouse", price: 20 },
  { id: 3, title: "Keyboard", price: 200 },
  { id: 4, title: "Gamepad", price: 50 },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
  // this.title = item.title;
  // this.price = item.price;
  // this.id = item.id;
  return `<div class="product-item">
                <img src="./img/${item.id}.jpeg" alt="image">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};

const renderPage = (list) => {
  // const productsList = list.map((item) => renderProduct(item));
  // console.log(productsList);
  // document.querySelector(".products").innerHTML = productsList.join("");

  document.querySelector(".products").innerHTML = list
    .map((item) => renderProduct(item))
    .join("");
};

renderPage(products);
