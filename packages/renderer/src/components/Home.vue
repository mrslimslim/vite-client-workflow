<template>
  <div class="home-page">
    <div>
      <button @click="handleChoosePath">
        选择路径
      </button>
    </div>
    <div>当前路径: {{ dirPath }}</div>
    <div>
      创建项目名称 <input
        type="text"
        @change="handleChangeProjectName"
      >
    </div>
    <div>
      <button @click="createProject">
        writeSomething
      </button>
    </div>
    <div>
      <button @click="showFinder">
        show Finder
      </button>
    </div>
    <button @click="getGitInfo">
      获取GIT信息
    </button>
    <div class="git-info">
      <div>
        git信息展示
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const { ipcRenderer } = require('electron');
export default defineComponent({
  name: 'Home',

  data() {
    return {
      dirPath: '',
      projectName: '',
    };
  },
  methods: {
    async handleChoosePath() {
      const res = await ipcRenderer.invoke('openDialog');
      this.dirPath = res.filePaths[0];
    },
    handleChangeProjectName(e: any) {
      console.log(e.target.value);
      this.projectName = e.target.value;
    },
    async createProject() {
      await ipcRenderer.invoke('writeFile', this.dirPath);
      // fs.writeFileSync(this.dirPath+'/text.txt','something')
    },
    async showFinder() {
      await ipcRenderer.invoke('showInFinder', this.dirPath);
    },
    async getGitInfo() {
      const ret = await ipcRenderer.invoke('getGitInfo', this.dirPath);
      console.log(ret);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home-page{
  color: red;
}
</style>
