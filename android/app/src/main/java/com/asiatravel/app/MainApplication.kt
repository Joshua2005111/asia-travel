package com.asiatravel.app

import android.app.Application
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

/**
 * Asia Travel - Main Application
 * 
 * Package: com.asiatravel.app
 */

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        
        override fun getPackages(): List<ReactPackage> {
          // Return empty list - Expo handles packages automatically
          return emptyList()
        }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = false

        // Disable New Architecture for simplicity
        override val isNewArchEnabled: Boolean = false

        // Enable Hermes for better performance
        override val isHermesEnabled: Boolean = true
      }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
  }
}
