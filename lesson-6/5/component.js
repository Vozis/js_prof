Vue.component("mycomp", {
  data() {
    return {
      name: "Иван",
      age: 28,
    };
  },
  template: `<div>
  <div>  
    <h1>Привет, {{name}}</h1>
    <inner-comp></inner-comp>
    <button @click="$parent.showInfo(age)"></button>
  </div>

  </div>`,
});

Vue.component("inner-comp", {
  template: `<div>
  <p>Пользователю {{$root.name}} {{$root.age}} лет</p>
</div>`,
  methods: {
    increase(step) {
      this.counter += step;
    },
  },
});
