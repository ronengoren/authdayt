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
<<<<<<< HEAD
    assets: ["./src/assets/fonts/"],
=======
>>>>>>> e21bc47770be0ff9b591d4f6327aa50e430c175c
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
