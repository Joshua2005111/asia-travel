package com.chinamate

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackageManager
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackageManager> =
            PackageList(this).packages.apply {
              // Add additional packages you want here
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
