module.exports = {
  publicPath: "./",
  outputDir: "dist", //和编译结果输出路径有关，开发阶段不用管
  devServer: {
    open: true, //是否开启
    host: "https://aiimagefixer-frontend-bugmakers.app.secoder.net",
    port: "80",
    proxy: {
      "": {
        target: "https://aiimagefixer-backend-bugmakers.app.secoder.net", // 实际后端地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {},
      },
    },
  },
};

// module.exports = {
//   publicPath: "./",
//   outputDir: "dist", //和编译结果输出路径有关，开发阶段不用管
//   devServer: {
//     open: true, //是否开启
//     host: "localhost",
//     port: "8080",
//     proxy: {
//       "": {
//         target: "http://localhost:8000", // 实际后端地址
//         ws: true,
//         changeOrigin: true,
//         pathRewrite: {},
//       },
//     },
//   },
// };

