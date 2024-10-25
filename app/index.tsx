import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { fetchArticlesByCategory } from '.././FetchArticles/Fetcharticlesbycategory';
import styles from './index.css';
// import Navbar from '../../components/Navbar/Navbar';

interface Article {
  id: number;
  title: { rendered: string };
  date: string;
  image_url: string;
}

export default function Index() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedNews = async () => {
      try {
        const articles = await fetchArticlesByCategory('Sports', 1);
        if (isMounted) setNews(articles || []);
      } catch (err) {
        console.error('Error fetching featured news:', err);
        if (isMounted) setError('Failed to fetch featured news.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFeaturedNews();
  

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
  
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.article}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <Text style={styles.title}>{item.title.rendered}</Text>
            <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}
