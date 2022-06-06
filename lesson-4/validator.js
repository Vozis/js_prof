class Validator {
  constructor(form) {
    this.patterns = {
      name: /^[a-zа-яё]{2,}$/i,
      phone: /^\+7\(\d{3}\)\d{3}\-\d{4}$/,
      email: /^[a-zа-я0-9._-]+@[a-z0-9-_]+\.[a-z0-9-_]{2,4}$/iu,
    };
    this.errors = {
      name: "Имя содержит только буквы",
      phone: "Телефон подчиняется шаблону +7(000)000-0000",
      email:
        "E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru",
    };
    this.errorClass = "error-msg";
    this.form = form;
    this.valid = false;
    this._validateForm();
  }

  validate(regexp, value) {
    regexp.test(value);
  }

  _validateForm() {
    // 1. Проверка на наличие ошибок, очистка ошибок
    let errors = [
      ...document
        .getElementById(this.form)
        .querySelectorAll(`.${this.errorClass}`),
    ];
    for (let error of errors) {
      error.remove();
    }

    // 2. Проверка полей ввода
    let formFields = [
      ...document.getElementById(this.form).querySelectorAll(".form__input"),
    ];
    for (let field of formFields) {
      this.validate(field);
    }
    if (
      ![...document.getElementById(this.form).querySelectorAll(".invalid")]
        .length
    ) {
      this.valid = true;
    }
  }

  validate(field) {
    if (this.patterns[field.name]) {
      if (!this.patterns[field.name].test(field.value)) {
        field.classList.add("invalid");
        this.addErrorMsg(field);
        this.watchField(field);
      }
    }
  }

  addErrorMsg(field) {
    let error = `<span class="${this.errorClass}">${
      this.errors[field.name]
    }</span> `;
    field.parentNode.insertAdjacentHTML("beforeend", error);
  }

  watchField(field) {
    field.addEventListener("input", () => {
      let error = field.parentNode.querySelector(`.${this.errorClass}`);
      if (this.patterns[field.name].test(field.value)) {
        field.classList.remove("invalid");
        field.classList.add("valid");
        if (error) {
          error.remove();
        }
      } else {
        field.classList.remove("valid");
        field.classList.add("invalid");
        if (!error) {
          this.addErrorMsg(field);
        }
      }
    });
  }
}
