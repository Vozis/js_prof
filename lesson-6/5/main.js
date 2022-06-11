const app = new Vue({
  el: "#app",
  data() {
    return {
      name: "Илья",
      age: 25,
    };
  },
  methods: {
    showInfo(age) {
      alert(`Пользователю ${age} лет`);
    },
  },
});
