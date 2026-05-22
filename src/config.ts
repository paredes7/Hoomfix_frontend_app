const fallbackApiUrl = "http://localhost:4000";

const nativeApiUrl = process.env.EXPO_PUBLIC_API_URL_NATIVE;
const sharedApiUrl = process.env.EXPO_PUBLIC_API_URL;

export const API_URL = (nativeApiUrl ?? sharedApiUrl ?? fallbackApiUrl).replace(/\/$/, "");
export const AGORA_APP_ID = process.env.EXPO_PUBLIC_AGORA_APP_ID ?? "";
export const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ?? "";
export const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? "";
