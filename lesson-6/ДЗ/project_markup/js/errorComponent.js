Vue.component("error", {
  props: ["error"],
  template: `
  <div class="error" v-show="error" >
  <p class="error-message">При подгрузке удаленных файлов произошла ошибка</p>
  </div>
`,
});
