package com.anonymous.chinamate

import com.facebook.react.ReactPackage
import com.facebook.react.DefaultReactPackage
import java.util.Arrays
import java.util.List

class PackageList {
    fun getPackages(): List<ReactPackage> {
        return Arrays.asList<ReactPackage>(
            DefaultReactPackage()
        )
    }
}
