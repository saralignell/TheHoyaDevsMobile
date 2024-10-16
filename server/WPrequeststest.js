import axios from 'axios';
import { writeFileSync } from 'fs';
import { Parser } from 'json2csv';

export default async function requesthoyawp() {
  let categorieslist = [];
  let page = 1;
  let totalPages = 1;

  try {
    console.time('FetchingCategories'); // Start timer

    // Fetch all pages concurrently if multiple pages exist
    const firstResponse = await axios.get('https://thehoya.com/wp-json/wp/v2/categories', {
      params: { per_page: 100 },
      timeout: 5000, // Timeout to prevent slow responses
    });

    totalPages = parseInt(firstResponse.headers['x-wp-totalpages'], 10) || 1;
    categorieslist = firstResponse.data;

    if (totalPages > 1) {
      const requests = Array.from({ length: totalPages - 1 }, (_, i) =>
        axios.get('https://thehoya.com/wp-json/wp/v2/categories', {
          params: { per_page: 100, page: i + 2 },
          timeout: 5000,
        })
      );

      const responses = await Promise.all(requests);
      responses.forEach(response => {
        categorieslist = [...categorieslist, ...response.data];
      });
    }

    console.timeEnd('FetchingCategories'); // End timer

    const categories = categorieslist.map(category => ({
      name: category.name,
      id: category.id,
      count: category.count,
      link: category.link,
      posts_link: category._links?.['wp:post_type']?.[0]?.href || '',
    }));

    // Convert to CSV
    const json2csvParser = new Parser({ fields: ['name', 'id', 'count', 'link', 'posts_link'] });
    const csv = json2csvParser.parse(categories);
    writeFileSync('categories.csv', csv);

    console.log('CSV file created: categories.csv');
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return [];
  }
}

requesthoyawp();
