class Motivation {
  /**
   *
   * @param {*} person сотрудник с изменением зп
   * @param {*} rate если процент больше 0, то это премия, если меньше - взыскание
   */
  changeSalary(person, rate) {
    let motivationMoney = (person.salary * rate) / 100;
    console.log(
      rate > 0
        ? `${person.name} получает премию ${motivationMoney}`
        : `${person.name} получает взыскание ${motivationMoney}`
    );
    person.salary += motivationMoney;
  }
}

class Person {
  constructor(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
  }

  _getInfo() {
    return `Сотрудник ${this.name} зарабатывает ${this.salary}`;
  }

  /**
   *
   * @param {*} men
   */
  static getManWithMaxSalary(men) {
    let manMaxSalary = men[0];
    for (let i = 1; i < men.length; i++) {
      if (manMaxSalary.salary < men[i].salary) {
        manMaxSalary = men[i];
      }
    }
    return manMaxSalary;
  }

  static getManWithMinSalary(men) {
    let manMinSalary = men[0];
    for (let i = 1; i < men.length; i++) {
      if (manMinSalary.salary > men[i].salary) {
        manMinSalary = men[i];
      }
    }
    return manMinSalary;
  }
}

class Manager extends Person {
  constructor(id, name, salary, role) {
    super(id, name, salary);
    this.role = role;
  }

  getInfo() {
    return `${super._getInfo()}\nРоль сотрудника: ${this.name} - ${this.role}`;
  }
}

const manager = new Manager(1, "Пупкин", 500000, "директор");
console.log(manager.getInfo());

const man1 = new Person(1, "Иванов", 50000); // при создании объекта всегда вызывается конструктор класса
const man2 = new Person(2, "Петров", 60000); // при создании объекта всегда вызывается конструктор класса
const man3 = new Person(3, "Сидоров", 70000); // при создании объекта всегда вызывается конструктор класса

let office = [man1, man2, man3];

console.log("Информация о сотрудниках до модификации");
office.forEach((man) => console.log(man.getInfo()));
let manMax = Person.getManWithMaxSalary(office);
let manMin = Person.getManWithMinSalary(office);

console.log(
  `Сотруднник ${manMax.name} имеет максимальный оклад ${manMax.salary}`
);
console.log(
  `Сотруднник ${manMin.name} имеет минимальный оклад ${manMin.salary}`
);
console.log("==========================");
console.log("Информация о сотрудниках  с учетом их равботы в данном месяце");

const motivation = new Motivation();

office.forEach((man) => {
  if (man.id == manMax.id) {
    motivation.changeSalary(man, -20);
  }
  if (man.id == manMin.id) {
    motivation.changeSalary(man, 20);
  }
});
