<template>
  <div class="home">
    <HomeHead />
    <div class="home-content">
      <layout />
      <HomeNav />
      <Content />
    </div>
  </div>
</template>
  
<script setup>
import layout from "@/components/layout/index.vue";
import HomeHead from "@/components/Home-head/index.vue";
import HomeNav from "@/components/Home-nav/index.vue";
import Content from "@/views/Content.vue";
</script>

<style lang="less" >
.home {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.home-content {
  height: 100%;
}
</style>

