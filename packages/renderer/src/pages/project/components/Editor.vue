<template>
  <div class="editor-page">
    <el-button @click="addProject">
      创建项目
    </el-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
  methods: {
    addProject() {
      this.$router.push('/project/add');
    },
  },
});
</script>

<style lang="less">

</style>
