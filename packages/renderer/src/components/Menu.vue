<template>
  <div>
    <el-menu
      default-active="2"
      class="h-screen"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu> -->
      <el-menu-item index="2">
        <span>项目</span>
      </el-menu-item>
      <!-- <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item> -->
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
