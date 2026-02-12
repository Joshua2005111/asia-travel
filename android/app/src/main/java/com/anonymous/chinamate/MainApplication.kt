package com.anonymous.chinamate

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.defaults.DefaultReactNativeHost

class MainApplication : Application(), ReactApplication() {

  override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
    override fun getUseDeveloperSupport(): Boolean = true

    override fun getPackages(): List<com.facebook.react.ReactPackage> {
      return emptyList()
    }

    override fun getJSMainModuleName(): String = "index"
  }
}
