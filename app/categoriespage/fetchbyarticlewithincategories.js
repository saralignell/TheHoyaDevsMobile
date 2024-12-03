import axios from 'axios';
import categories from '../../FetchArticles/categories.js';
import { subcategories } from '../../FetchArticles/categories.js';


// Function to fetch the image URL for a given media ID
async function fetchImage(mediaId) {
  try {
    const mediaResponse = await axios.get(`https://thehoya.com/wp-json/wp/v2/media/${mediaId}`);
    return mediaResponse.data.source_url;
  } catch (error) {
    console.error('Error fetching image:', error.message);
    return '';
  }
}

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



// Function to fetch articles by category and page number
async function fetchArticlesforcategoriespage(categoryInput, pageNumber = 1, limit = 3) {
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
  
//fetchArticlesByCategory("Student-Life");
// Exporting the functions
export { fetchArticlesforcategoriespage, fetchSubcategories };
