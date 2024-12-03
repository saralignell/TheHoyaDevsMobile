import axios from 'axios';
import categories from './categories.js';
import { subcategories } from './categories.js';

// Function to fetch the image URL for a given media ID


// Function to fetch subcategories based on input
function fetchSubcategories(input) {
  if (!input) {
    throw new Error('Input is required to fetch subcategories');
  }

  const category = input.toLowerCase();
  const matchingKey = Object.keys(subcategories).find(
    key => key.toLowerCase() === category
  );

  if (!matchingKey) {
    throw new Error('Subcategory not found');
  }

  // Return the subcategories or the key itself if the array is empty
  const result = subcategories[matchingKey];
  return result && result.length > 0 ? result : [matchingKey];
}

// Function to fetch articles by category with dynamic page number and limit
async function FetchArticlesByCategory (categoryInput, pageNumber, limit) {
  let category;

  if (typeof categoryInput === 'number') {
    category = categories.find(cat => cat.id === categoryInput);
  } else {
    category = categories.find(cat => cat.name.toLowerCase() === categoryInput.toLowerCase());
  }

  if (!category) {
    throw new Error('Category not found');
  }

  try {
    const response = await axios.get(category.posts_link, {
      params: { per_page: limit, page: pageNumber },
    });
    const articles = response.data;

    const articlesFormatted = await Promise.all(
      articles.map(async (article) => {
        const imageUrl = article.featured_media ? await fetchImage(article.featured_media) : '';

        return {
          id: article.id,
          date: article.date,
          title: article.title.rendered,
          link: article.link,
          content: article.content.rendered.replace(/<\/?[^>]+(>|$)/g, ''),
          image_url: imageUrl,
        };
      })
    );

    return articlesFormatted;
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    return [];
  }
}
async function FetchArticlesByKeyword(keyword, pageNumber = 1, limit = 10) {
  const apiUrl = 'https://thehoya.com/wp-json/wp/v2/posts';

  try {
    // Fetch articles with pagination
    const response = await axios.get(apiUrl, {
      params: { per_page: limit, page: pageNumber, search: keyword },
    });

    const articles = response.data;

    // Format the articles
    const articlesFormatted = await Promise.all(
      articles.map(async (article) => {
        const imageUrl = article.featured_media
          ? await fetchImage(article.featured_media)
          : '';

        return {
          id: article.id,
          date: article.date,
          title: article.title.rendered,
          link: article.link,
          content: article.content.rendered.replace(/<\/?[^>]+(>|$)/g, ''),
          image_url: imageUrl,
        };
      })
    );

    return articlesFormatted;
  } catch (error) {
    console.error('Error fetching articles by keyword:', error.message);
    return [];
  }
}

// Helper function to fetch the image URL (unchanged from your existing code)
async function fetchImage(mediaId) {
  try {
    const mediaResponse = await axios.get(`https://thehoya.com/wp-json/wp/v2/media/${mediaId}`);
    return mediaResponse.data.source_url || '';
  } catch (error) {
    console.error(`Error fetching image for media ID ${mediaId}:`, error.message);
    return '';
  }
}

// Exporting the functions
export { FetchArticlesByCategory, fetchSubcategories,FetchArticlesByKeyword };
