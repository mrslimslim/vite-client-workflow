<template>
  <div class="pt-8">
    welcome
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {};
  },
  created() {
    this.$router.push('/project');
  },
});
</script>

<style>

</style>
