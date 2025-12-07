# TugasFirebaseMahasiswa

A React Native + Firebase mobile application for managing student tasks and communications.

**Adapted for cross-platform development** (Windows, macOS, Linux).

## Prerequisites

Before running this project, ensure you have:

1. **Node.js >= 20** — [Download here](https://nodejs.org)
2. **JDK 17+** — Required for Android development
3. **Android SDK & Android Studio** — For Android builds
4. **(Optional) Xcode + macOS** — For iOS builds (macOS only)

### Environment Setup

Set Android SDK paths (required for Android development):

```powershell
# Windows PowerShell (temporary for this session)
$env:ANDROID_HOME = 'C:\Users\<YourUsername>\AppData\Local\Android\Sdk'
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME

# Or set permanently via Windows Settings → Environment Variables
```

## Getting Started

```powershell
# 1. Install dependencies
npm install

# 2. Start metro development server (in separate terminal)
npm start

# 3. Run on Android (requires emulator or connected device)
npm run android

# 4. Run on iOS (macOS only)
npm run ios

# 5. Run tests
npm test

# 6. Lint code
npm lint

# 7. Clean build artifacts
npm run clean
```

## Platform Support

- ✅ **Android**: Fully supported on Windows, macOS, Linux
- ✅ **iOS**: Supported on macOS only (requires Xcode + CocoaPods)
- ✅ **Windows/Mac/Linux**: Project configured for all platforms

## Project Structure

```
src/
  ├── config/          # Firebase and storage configuration
  ├── screens/         # React Native screens
  └── services/        # Firebase and Firestore service modules
android/               # Android native code
ios/                   # iOS native code
__tests__/             # Unit tests
```

## Build & Deployment Notes

### Android Build

```powershell
cd android
.\gradlew.bat assembleDebug      # Build debug APK
.\gradlew.bat assembleRelease    # Build release APK (requires signing)
```

### iOS Build

iOS builds require macOS with Xcode installed. Cannot be built on Windows.

```bash
# macOS only
cd ios
pod install
xcodebuild -workspace TugasFirebaseMahasiswa.xcworkspace -scheme TugasFirebaseMahasiswa -configuration Release
```

## Firebase Configuration

This project uses Firebase for authentication and real-time database:

- **Auth Service**: `src/services/authService.js`
- **Firestore Service**: `src/services/firestoreService.js`
- **Firebase Config**: `src/config/firebaseConfig.js`

⚠️ **Security Note**: Firebase plist files (`ios/GoogleService-Info.plist`) are not tracked in git to prevent accidental exposure of API keys. If you need to build iOS locally, obtain the correct config file from your Firebase project.

## Development Tips

- **Hot Reload**: Metro bundler supports fast refresh during development
- **Debugging**: Use React Native Debugger or Chrome DevTools
- **Linting**: Run `npm lint` to check code quality
- **Testing**: Run `npm test` to execute Jest test suite
- **Cleanup**: Run `npm run clean` to remove build artifacts and cache

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Module not found` | Run `npm install` to install dependencies |
| `ANDROID_HOME not set` | Set Android SDK path in environment variables |
| `Java not found` | Install JDK 17+ and set `JAVA_HOME` |
| `Port 8081 in use` | Kill existing metro process: `lsof -ti:8081 \| xargs kill -9` (Mac/Linux) or use PowerShell equivalent |
| `iOS build fails` | Ensure you're on macOS with Xcode installed |

## Contributing

1. Create a new branch for your feature
2. Make changes to relevant files
3. Run `npm lint` and `npm test` to verify
4. Commit with clear messages
5. Push and create a pull request

## License

This project is provided as-is for educational purposes.

---

**Last Updated**: 2025-12-08
- `Port 8081 already in use`: Kill the previous metro server or use `lsof -ti:8081 | xargs kill -9` (or PowerShell equivalent).
- Line ending warnings from git: Run `git reset --hard` after first commit with `.gitattributes`.
