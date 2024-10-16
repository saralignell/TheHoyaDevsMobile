import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

console.log('Initializing server...');

// Endpoint to get articles from the WordPress API
app.get('/getarticles', async (req, res) => {
  console.log('Received GET request for /getarticles');

  try {
    console.log('Fetching articles from WordPress...');
    const response = await axios.get('https://thehoya.com/wp-json/wp/v2/posts', {
      params: { per_page: 20 },
    });
    console.log('Successfully fetched articles:', response.data.length, 'articles retrieved.');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching articles:', error.message);
    res.status(500).send('Error fetching articles');
  }
});

// Start the server and log that it’s running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
