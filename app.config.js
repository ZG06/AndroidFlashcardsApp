import 'dotenv/config'

export default {
    expo: {
        name: "flashcard-app",
        slug: "flashcard-app",
        android: {
            package: "com.zg06.flashcardapp"
        },
        ios: {
            bundleIdentifier: "com.zg06.flashcardapp"
        },
        extra: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            eas: {
                projectId: "0952f20f-8e2a-4afa-8816-94273779bfa5"
            }
        }
    }
}