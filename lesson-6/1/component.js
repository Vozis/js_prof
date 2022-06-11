Vue.component("mycomp", {
  data() {
    return {
      name: "Иван",
      year: 1994,
    };
  },
  template: `<div>
  <div>  
    <h1>Пользователю {{ name }} {{new Date().getFullYear() - year}} лет.</h1>
  </div>
  
  <div>  
    <h1>Тестовый блок!</h1>
  </div>
  </div>`,
});

Vue.component("inner-comp", {
  data() {
    return {
      counter: 0,
    };
  },
  template: `<div>

<button @click="increase($parent.year)">{{counter}}</button>
</div>`,
  methods: {
    increase(step) {
      this.counter += step;
    },
  },
});
