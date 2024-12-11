import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { FetchArticlesByCategory } from '../FetchArticles/Fetcharticlesbycategory';
import styles from './trendingpage.css';

interface Article {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  content?: string;
}

export default function TrendingPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedNews = async () => {
      try {
        const articles = await FetchArticlesByCategory('News - Top', 1);
        if (isMounted) setNews(articles.slice(0, 10) || []); // Limit to first 10 articles
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
        renderItem={({ item, index }) => (
          <View style={styles.article}>
            <Text style={styles.largeNumber}>{index + 1}</Text> {/* Large article number */}
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.image} />
            ) : null}
            <Text style={styles.title}>{item.title || 'Untitled'}</Text>
            <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
            {item.author && <Text style={styles.author}>By: {item.author}</Text>}
            <Text numberOfLines={3} style={styles.preview}>
              {item.content
                ? item.content.replace(/<[^>]+>/g, '')
                : 'No content available.'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}