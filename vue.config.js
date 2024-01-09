const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // // 覆盖颜色
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // 这里的路径要和刚刚写的 index.scss 文件路径一致
  //       additionalData: `
  //         @use "@/styles/element/index.scss" as *;
  //       `,
  //     },
  //   },
  // },

})
