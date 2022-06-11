const app = new Vue({
  el: "#app",
  data() {
    return {
      name: "Анна",
      name2: "Tomas",
      age: 32,
    };
  },

  methods: {
    showInfo(age) {
      alert(`Пользователю ${age} лет`);
    },
  },
});
