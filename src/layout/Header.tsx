/**
 * @name Header
 * @author Lester
 * @date 2022-05-18 18:23
 */
import { defineComponent } from "vue";
import { mapState } from "vuex";
import style from "./style.module.less";

export default defineComponent({
  computed: {
    ...mapState(["userInfo"]),
  },
  mounted() {
    console.log("mounted", this.userInfo);
  },

  render() {
    return (
      <header class={style.headerWrap}>
        <img
          class={style.headerLogo}
          src={require("../assets/logo.png")}
          alt=""
          onClick={() => {
            const { origin } = window.location;
            window.open(`${origin}/${process.env.PROJECT_NAME}/index`);
          }}
        />
        <div class={style.headerInfo}>
          <img
            class={style.headerAvatar}
            src={require("@/assets/logo.png")}
            alt=""
          />
          <span class={style.userName}>
            {this.userInfo.name}[{this.userInfo.corpName}{" "}
            {this.userInfo.departDesc}]
          </span>
        </div>
      </header>
    );
  },
});
