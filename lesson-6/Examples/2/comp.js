Vue.component("my-comp", {
  data() {
    return {
      name: "Bob",
      age: 33,
      year: 1982,
      step: 2,
    };
  },
  template: `<div>
  <p>Привет, {{name}}, возраст {{age}}</p>
  <inner-comp></inner-comp>
  <button v-on:click="$parent.showInfo(age)">OK</button>

</div>
`,
});

Vue.component("inner-comp", {
  template: `
  <div>
  <h1>Пользователю {{$root.name}} {{$parent.age}}</h1>
</div>
  `,
});
