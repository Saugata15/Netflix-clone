export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "हिन्दी" },
  { identifier: "bengali", name: "বাংলা" }];

export const tmdbLanguageMap = {
  en: "en-US",
  hindi: "hi-IN",
  bengali: "bn-BD",
};