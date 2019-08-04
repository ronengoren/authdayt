import { merge } from "lodash";
import { isDevEnv } from "src/vars/environment";
import { Platform } from "react-native";

// TODO: inject providers keys from env/build
const GCM_SENDER_ID = "431500802141";

const sharedConfig = {
  providers: {
    googlePlacesAPI: {
      url: "https://maps.googleapis.com/maps/api/place",
      apiKey: ""
    },
    googleTranslateAPI: {
      url: "https://translation.googleapis.com/language/translate/v2",
      apiKey: ""
    }
  }
};
// https://api.dev.homeis.com/v1
// https://web.dev.homeis.com
// https://api.dev.homeis.com/health
// 68ABE-20932
const devConfig = {
  api: {
    url: "",
    timeout: 60000
  },
  web: {
    url: ""
  },
  healthCheckUrl: "",
  providers: {
    pushwoosh: {
      appId: "B3CCE-A5B1D",
      projectNumber: GCM_SENDER_ID
    }
    // stream: {
    //   apiKey: 'yb56q635sgwc'
    // },
    // logentries: {
    //   token: '0c06c379-2377-4839-92b9-3694f6bee845'
    // },
    // mixpanel: {
    //   token: '6c7215e45b8c11e5201e4cc67e0ac928',
    //   fireEvents: false
    // },
    // algolia: {
    //   appId: 'A1ZXAZG9VE',
    //   apiKey: '41e17007d1dea32a97e2bd1f5b8d7ff8',
    //   indexPrefix: 'dev_'
    // },
    // testfairy: {
    //   recordSessions: false,
    //   token: 'SDK-peiciHhe'
    // },
    // stats: {
    //   url: 'https://stats.dev.homeis.com'
    // },
    // instagram: {
    //   clientId: '56adea73c5a647729e6c4a526f9a000d',
    //   url: 'https://api.instagram.com'
    // },
    // walkme: {
    //   key: Platform.select({ ios: 'c0d24d60-1aca-46ed-ae29-bc85ba5084a0', android: '6adb83ee-f5d5-4755-9297-5157fae2ac90' }),
    //   secret: Platform.select({
    //     ios: 'MGYzWlRWTndFTlFZTDEyMzQ1SmV2NkFYU0ZVdnBLaVBmaWRqc0FZd3hxTWh6Ym44YTRGczFuZHZQVkZDODVtVE82',
    //     android: 'S3B6YUlLRXNPVVE1UDkvWFpURzFPS3ZGbXl2cG1DNVFwNXMzbGsrOTh4a0VkelVETVluYVlCa08rOU9VNkoxRUcy'
    //   })
    // }
  }
};

const prodConfig = {
  //   api: {
  //     url: "",
  //     timeout: 60000
  //   },
  //   web: {
  //     url: ""
  //   },
  //   healthCheckUrl: "https://api.homeis.com/health",
  providers: {
    pushwoosh: {
      appId: "B3CCE-A5B1D",
      projectNumber: GCM_SENDER_ID
    }
    //     stream: {
    //       apiKey: "mhb3pbt5w3kp"
    //     },
    //     logentries: {
    //       token: "8fd3be43-44f2-40c6-82a0-0e4c16f3bb3b"
    //     },
    //     mixpanel: {
    //       fireEvents: true,
    //       token: "bccd38ad0c9a2c4e3b9990d64ca5cbd8"
    //     },
    //     algolia: {
    //       appId: "OF1ML9IS2Z",
    //       apiKey: "4fde968e268cf15b95937159adf435bb",
    //       indexPrefix: "prod_"
    //     },
    //     testfairy: {
    //       recordSessions: true,
    //       token: "SDK-peiciHhe"
    //     },
    //     stats: {
    //       url: "http://stats.homeis.com/"
    //     },
    //     instagram: {
    //       clientId: "56adea73c5a647729e6c4a526f9a000d",
    //       url: "https://api.instagram.com"
    //     },
    //     walkme: {
    //       key: Platform.select({
    //         ios: "4c6f9464-1041-4deb-a8f0-59c12a547d36",
    //         android: "6a2e8d0e-f38c-443d-884e-3483ada03ec5"
    //       }),
    //       secret: Platform.select({
    //         ios:
    //           "b2hNenR2cW1OaUkxRFdZU1VNd3lTTFg1N1ltRkZvc2hSWk9IekloQnpKZ29tck93aysxcVowS2VUOEJ0UG05dVdI",
    //         android:
    //           "MHRmTU9RSUtRZmJsaGFiY2RlWkFzUDYzTjFta1g0T3dmQ2p6MXVsRFFianpjaGdFcDJOZ3hkcXM4WThxdUVOdzFv"
    //       })
    //     }
  }
};

const appConfig = merge(sharedConfig, isDevEnv ? devConfig : prodConfig);

export default appConfig;
