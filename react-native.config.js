// module.exports = {
//   project: {
//     ios: {},
//     android: {
//       sourceDir: "./lib/android"
//     }
//   }
// };

module.exports = {
  dependency: {
    assets: ["./src/assets/fonts/"],
    platforms: {
      ios: {
        project: "iOS/RCTOrientation.xcodeproj"
      },
      android: {
        packageInstance: "new OrientationPackage()"
      }
    }
  }
};
