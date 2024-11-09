import axios from 'axios';

import categories from './categories.js';

async function fetchImage(mediaId) {
  try {
    const mediaResponse = await axios.get(`https://thehoya.com/wp-json/wp/v2/media/${mediaId}`);
    return mediaResponse.data.source_url; 
  } catch (error) {
    console.error('Error fetching image:', error.message);
    return '';  
  }
}

async function fetchArticlesByCategory(categoryInput, pagenumber) {
  let category;
  let pagenum =pagenumber ||1;
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
      params: { 
        per_page: 10, 
        page: pagenumber
      }  
    });
      if (!response.data || response.data.length === 0) {
      return [];
    }
    const articles = response.data;

    const articlesFormatted = await Promise.all(articles.map(async (article) => {
      const imageUrl = article.featured_media ? await fetchImage(article.featured_media) : '';

      return {
        id: article.id,
        date: article.date,
        title: article.title.rendered,
        link: article.link,
        content: {
          rendered: article.content.rendered
        },  
        image_url: imageUrl  
      };
    }));

    

    
    console.log(articlesFormatted);
    return articlesFormatted;
  } catch (error) {
    if(error.response && error.response === 404){ //no more pages
      return []; //return empty 
    }
    console.error('Error fetching articles:', error.message);
    throw error;
  }
}

export { fetchArticlesByCategory };
