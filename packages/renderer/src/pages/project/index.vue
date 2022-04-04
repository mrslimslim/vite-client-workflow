<template>
  <div class="w-full">
    <Header />
    <el-container class="content-area">
      <el-aside
        class="h-full"
        :width="asideWidth"
      >
        <left-side />
      </el-aside>
      <el-main class="h-full">
        <right-main />
      </el-main>
    </el-container>
  </div>
</template>

<script lang='ts'>
import Header from './components/Header.vue';
import LeftSide from './components/LeftSide.vue';
import RightMain from './components/RightMain.vue';
import type { Ref} from 'vue';
import { ref } from 'vue';
export default {
  components: {
   'Header' : Header,
   'left-side': LeftSide,
   'right-main': RightMain,
  },
  setup(){
    const asideWidth:Ref<string> = ref('200px');
    return {
      asideWidth,
    };
  },

};
</script>

<style lang="less" scoped>
 .content-area{
   height: calc(100vh - 40px);
 }
</style>
