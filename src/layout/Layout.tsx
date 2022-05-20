/**
 * @name Layout
 * @author Lester
 * @date 2022-05-18 18:02
 */
import { defineComponent } from "vue";
import Header from "./Header";
import style from "./style.module.less";

export default defineComponent({
  render() {
    return (
      <div class={style.layoutWrap}>
        <Header />
        <div class={style.routeWrap}>
          <router-view />
        </div>
      </div>
    );
  },
});
