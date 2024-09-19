// reference: https://github.com/vuejs/language-tools/issues/3349
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
