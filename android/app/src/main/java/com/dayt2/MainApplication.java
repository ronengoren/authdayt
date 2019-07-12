package com.dayt2;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
=======
>>>>>>> 5c7378d7838db95f5365cf3244fec949f7bb5297
import com.reactcommunity.rnlocalize.RNLocalizePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.rnfs.RNFSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.reactnative.camera.RNCameraPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
<<<<<<< HEAD
            new RNCViewPagerPackage(),
=======
>>>>>>> 5c7378d7838db95f5365cf3244fec949f7bb5297
            new RNLocalizePackage(),
            new ReactVideoPackage(),
            new FastImageViewPackage(),
            new RNFSPackage(), new RNDeviceInfo(), new RNCameraPackage(),
          new AsyncStoragePackage(), new ReactNativeConfigPackage(), new VectorIconsPackage(),
          new RNGestureHandlerPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
