import axios from 'axios';
import { writeFileSync } from 'fs'; // To write the CSV file
import { Parser } from 'json2csv';  // To convert JSON to CSV

export default async function requesthoyawp() {
  let categorieslist = [];
  let page = 1;
  let totalPages = 1;
  
  try {
    while (page <= totalPages) {
      const response = await axios.get('https://thehoya.com/wp-json/wp/v2/categories', {
        params: { per_page: 100, page },
      });

      if (Array.isArray(response.data)) {
        categorieslist = [...categorieslist, ...response.data];
      }

      if (response.headers && response.headers['x-wp-totalpages']) {
        totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
      }

      page += 1;
    }
  } catch (error) {
    console.log('Error fetching articles:', error.message);
    return [];
  }

  const categories = categorieslist.map((category) => ({
    name: category.name,
    id: category.id,
    count: category.count,
    link: category.link,  // Link to the category page
    posts_link: category._links['wp:post_type'] 
                 ? category._links['wp:post_type'][0].href 
                 : '',  // Link to posts in this category if available
  }));

  // Convert to CSV
  const fields = ['name', 'id', 'count', 'link', 'posts_link']; // Fields to include in the CSV
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(categories);

  // Write CSV to file
  writeFileSync('categories.csv', csv);

  console.log('CSV file created: categories.csv');
  
  return categories;
}

requesthoyawp();
