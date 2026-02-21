# FOREIGNER_APP - Android 修复命令（手动执行）

## 第一步：删除冲突的文件夹

在文件资源管理器中手动删除以下文件夹：
```
C:\Users\Joshua\.openclaw\workspace\FOREIGNER_APP\android\app\src\main\kotlin\
（整个 kotlin 文件夹）

C:\Users\Joshua\.openclaw\workspace\FOREIGNER_APP\android\app\src\main\java\com\anonymous\
（整个 anonymous 文件夹）
```

## 第二步：验证文件位置

删除后，确认以下文件存在：
```
C:\Users\Joshua\.openclaw\workspace\FOREIGNER_APP\android\app\src\main\java\com\chinamate\MainActivity.kt

C:\Users\Joshua\.openclaw\workspace\FOREIGNER_APP\android\app\src\main\java\com\chinamate\MainApplication.kt
```

## 第三步：清理 Gradle

打开 PowerShell 或 CMD，运行：

```powershell
cd C:\Users\Joshua\.openclaw\workspace\FOREIGNER_APP\android
.\gradlew clean
```

## 第四步：运行 App

确保 Android 模拟器已启动，然后运行：

```powershell
cd C:\Users\Joshua\.openclaw\workspace\FOREIGNER_APP
npx react-native run-android
```

---

## 快速检查清单

删除这些（如果有）：
- [ ] `android/app/src/main/kotlin/` 整个文件夹
- [ ] `android/app/src/main/java/com/anonymous/` 整个文件夹

保留这些：
- [ ] `android/app/src/main/java/com/chinamate/MainActivity.kt`
- [ ] `android/app/src/main/java/com/chinamate/MainApplication.kt`

---

## 如果 PowerShell 命令报错

直接手动删除文件夹后，双击运行：
```
android/app/build.gradle
```

确认里面是：
```
namespace 'com.chinamate'
applicationId "com.chinamate"
```

然后在 Android Studio 中：
1. **Build > Clean Project**
2. **Build > Rebuild Project**
