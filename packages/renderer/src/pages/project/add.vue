<template>
  <div class="add-project">
    <div class="title text-lg mb-4">
      创建项目
    </div>
    <div class="wrapper p-8 bg-white rounded-sm">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="项目名称">
          <el-input
            v-model="form.projectName"
            placeholder="输入项目名"
          />
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input
            v-model="form.dirPath"
            placeholder="选择项目地址"
            @click="handleChooseRootDir"
          />
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        :disabled="isAllowCreate"
        @click="createProject"
      >
        创建项目
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const { ipcRenderer } = require('electron');

export default defineComponent({
  data() {
    return {
      form: {
        projectName: '',
        dirPath: '',
      },
    };
  },
  computed: {
    isAllowCreate() {
      if (!this.form.projectName || !this.form.dirPath) return true;
      return false;
    },
  },
  methods: {
    async handleChooseRootDir() {
      const res = await ipcRenderer.invoke('openDialog');
      const [dirPath] =  res.filePaths;
      this.form.dirPath = dirPath;
    },
    createProject() {
      ipcRenderer.invoke('download', { ...this.form });
    },
  },
});
</script>

<style></style>
