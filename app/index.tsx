import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { fetchArticlesByCategory } from '../FetchArticles/Fetcharticlesbycategory';
import LoadMore from '../components/LoadMore';
import styles from './index.css';

interface Article {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  content?: { rendered: string };
}

export default function Index() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNews = async (pageNumber: number, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const articles = await fetchArticlesByCategory('News - Top', pageNumber);
      
      if (articles.length === 0) {
        setHasMore(false);
      } else {
        setNews(prevNews => isLoadMore ? [...prevNews, ...articles] : articles);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to fetch news.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInitialNews = async () => {
      if (isMounted) {
        await fetchNews(1);
      }
    };

    fetchInitialNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(nextPage, true);
    }
  };

  const renderItem = ({ item }: { item: Article }) => (
    <View style={styles.article}>
      {item.image_url ? (
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : null}
      <Text style={styles.title}>{item.title || 'Untitled'}</Text>
      <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
      {item.author && <Text style={styles.author}>By: {item.author}</Text>}
      <Text numberOfLines={3} style={styles.preview}>
        {item.content?.rendered
          ? item.content.rendered.replace(/<[^>]+>/g, '')
          : 'No content available.'}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#777" />
        <Text style={styles.loading}>Loading articles...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListFooterComponent={
          <LoadMore 
            loading={loadingMore} 
            hasMore={hasMore} 
            onPress={handleLoadMore}
          />
        }
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}