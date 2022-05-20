/**
 * @name Index
 * @author Lester
 * @date 2022-05-18 13:48
 */
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { mapState } from "vuex";
import { Button } from "ant-design-vue";
import style from "./style.module.less";

export default defineComponent({
  computed: {
    ...mapState(["userInfo"]),
  },
  mounted() {
    console.log("mounted", this.userInfo);
  },

  render() {
    const route = useRoute();
    console.log(route.params, route.query, this);

    return (
      <div class={style.wrap}>
        <h3>试试水</h3>
        <Button type="primary">按钮</Button>
        <div class={style.text}>哈哈哈</div>
      </div>
    );
  },
});
