export const BASE_URL = 'https://pixabay.com/api/',
  API_KEY = '31381634-1aa714b0129639c0faecef278',
  SEARCH_PARAMS = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  });
