<template>
  <div class="app-wrap">
    <router-view />
  </div>
</template>

<script lang="ts"></script>

<style lang="less">
html,
body,
#app {
  width: 100%;
  height: 100%;
  background-color: white;
  -webkit-text-size-adjust: none;
  -webkit-overflow-scrolling: touch;
  font-family: PingFangSC-Regular, PingFang SC, Microsoft YaHei,
    Microsoft JhengHei;
}

*,
p {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  touch-action: pan-y pan-x;
  outline: none;
  word-break: break-word;
}

ul {
  list-style: none;
  margin: 0;
}

.scroll-strip {
  overflow-y: auto;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 6px;
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgb(239, 239, 239);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #318cf5;
  }

  &::-webkit-scrollbar-corner {
    background-color: #e6e7eb;
  }
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.app-wrap {
  width: 100%;
}
</style>
