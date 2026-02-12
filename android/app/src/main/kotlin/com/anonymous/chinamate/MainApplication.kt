package com.anonymous.chinamate

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.facebook.react.BuildConfig

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
            return PackageList().getPackages()
        }

        override fun getJSMainModuleName(): String = "index"

        override val isDebug: Boolean
          get() = BuildConfig.DEBUG
      }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
  }
}
