import 'dotenv/config'

export default {
    expo: {
        name: "flashcard-app",
        slug: "flashcard-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        scheme: "flash-master",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            bundleIdentifier: "com.zg06.flashcardapp",
            supportsTablet: true
        },
        android: {
            package: "com.zg06.flashcardapp",
            googleServicesFile: "./android/app/google-services.json",
            adaptiveIcon: {
                foregroundImage: "",
                backgroundColor: "#ffffff"
            },
            edgeToEdgeEnabled: true,
            intentFilters: [
                {
                    action: "VIEW",
                    autoVerify: true,
                    data: [
                        {
                            scheme: "https",
                            host: "flashcard-app.expo.app"
                        }
                    ],
                    category: [
                        "BROWSABLE",
                        "DEFAULT"
                    ]
                }
            ]
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: ""
        },
        plugins: [
            "expo-router",
            "expo-notifications",
            "@react-native-firebase/app",
            [
                "expo-splash-screen",
                {
                    image: "",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff"
                }
            ]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            router: {},
            eas: {
                projectId: "0952f20f-8e2a-4afa-8816-94273779bfa5"
            },
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            GOOGLE_WEB_CLIENT_ID: process.env.GOOGLE_WEB_CLIENT_ID
        }
    }
}