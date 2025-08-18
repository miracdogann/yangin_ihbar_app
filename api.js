// Güvenlik: API URL'si environment variable'dan alınıyor
export const base_api = import.meta.env.VITE_API_URL || "https://api.example.com/api/";
