const todoItem = {
  props: ["todos"],
  template: `<li v-for="todo in todos">
  {{ todo.text }}</li>`,
};

const HelloVueApp = Vue.createApp({
  data() {
    return {
      message: "Hello Vue!!",
      counter: 0,
      todos: [
        { text: "Learn JavaScript" },
        { text: "Learn Vue" },
        { text: "Build something awesome" },
      ],
    };
  },
  components: {
    "todo-item": todoItem,
  },
  methods: {
    startTimer() {
      timer = setInterval(() => {
        this.counter++;
      }, 1000);
    },
    stop() {
      clearInterval(timer);
    },
  },
  mounted() {
    this.startTimer();
  },
}).mount("#hello-vue");
