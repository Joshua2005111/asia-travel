package com.asiatravel.app

import android.os.Build
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.defaults.DefaultReactActivityDelegate

/**
 * Asia Travel - Main Activity
 */

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    setTheme(R.style.AppTheme)
    super.onCreate(null)
  }

  // 必须与 index.js 中的模块名一致
  override fun getMainComponentName(): String = "AsiaTravel"

  override fun createReactActivityDelegate(): DefaultReactActivityDelegate {
    return DefaultReactActivityDelegate(
      this,
      mainComponentName,
      false
    )
  }

  override fun invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        super.invokeDefaultOnBackPressed()
      }
      return
    }
    super.invokeDefaultOnBackPressed()
  }
}
