<template>
  <div>
    <el-menu
      default-active="2"
      class="h-screen"
    >
      <el-menu-item index="2">
        <span>项目</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
export default {
  setup()  {
    const handleOpen = (key: string, keyPath: string): void => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string): void => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style></style>
