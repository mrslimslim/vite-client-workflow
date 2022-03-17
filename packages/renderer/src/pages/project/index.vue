<template>
  <el-container>
    <el-header class="h-10" />
    <el-container>
      <el-aside
        width="80px"
        class="bg-white"
      >
        <nav-menu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import NavMenu from '/@/components/Menu.vue';
export default {
  components: {
    NavMenu,
  },

};
</script>

<style></style>
