import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { FetchArticlesByCategory, fetchSubcategories } from '../FetchArticles/Fetcharticlesbycategory';
import styles from './categoriespage.css';

const { width: screenWidth } = Dimensions.get('window');

interface Article {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  content?: string;
}

export default function categoriespage() {
  const [category, setCategory] = useState<string[]>([]);
  const [data, setData] = useState<{ [key: string]: Article[] }>({});
  const [pageNumbers, setPageNumbers] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [subcategories, setSubcategories] = useState<{ [key: string]: string[] }>({
    Sports: [],
    Features: [],
    Science: [],
  });

  const fetchData = async (subcategory: string, pageNumber: number, limit: number) => {
    if (loading[subcategory]) return; // Prevent concurrent fetches for the same subcategory

    setLoading((prevLoading) => ({ ...prevLoading, [subcategory]: true }));

    const newArticles = await FetchArticlesByCategory(subcategory, pageNumber, limit);
    setData((prevData) => ({
      ...prevData,
      [subcategory]: [...(prevData[subcategory] || []), ...newArticles],
    }));

    setPageNumbers((prevPages) => ({
      ...prevPages,
      [subcategory]: pageNumber,
    }));

    setLoading((prevLoading) => ({ ...prevLoading, [subcategory]: false }));
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (category.length === 0) return;

      const initialPage = 1;
      const initialLimit = 10;

      const articlesPromises = category.map((subcategory) =>
        fetchData(subcategory, initialPage, initialLimit)
      );

      await Promise.all(articlesPromises);
    };

    fetchInitialData();
  }, [category]);

  const handleScrollEnd = (subcategory: string, event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (layoutMeasurement.width + contentOffset.x >= contentSize.width - 20) {
      // Fetch next page with a limit of 5
      const nextPage = (pageNumbers[subcategory] || 1) + 1;
      fetchData(subcategory, nextPage, 5);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.maincontainer}>
        <View style={styles.scrollcontainer}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.categoriesheader}
            showsHorizontalScrollIndicator={true}
          >
            {['News', 'Opinion', 'Guide', 'Sports', 'Features', 'Science'].map((section) => (
              <TouchableOpacity
                key={section}
                style={styles.buttonContainer}
                onPress={async () => {
                  const result = await fetchSubcategories(section);
                  setCategory(result || []);
                }}
              >
                <Text style={styles.buttonText}>{section}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <ScrollView style={styles.subarticlecontainer}>
          {Object.keys(loading).some((key) => loading[key]) && (
            <Text style={styles.loading}>Loading articles...</Text>
          )}
          {category.map((subcategory) => (
            <View key={subcategory} style={styles.subarticle}>
              <Text style={styles.subarticleTitle}>{subcategory}</Text>
              {subcategories[subcategory]?.length === 0 ? (
                // Render articles vertically for categories with no subcategories
                <ScrollView
                  onScroll={(event) => handleScrollEnd(subcategory, event)}
                  scrollEventThrottle={16}
                >
                  {data[subcategory]?.map((article) => (
                    <View key={article.id} style={styles.verticalArticleCard}>
                      {article.image_url && (
                        <Image source={{ uri: article.image_url }} style={styles.image} />
                      )}
                      <Text style={styles.title}>{article.title || 'Untitled'}</Text>
                      <Text style={styles.date}>
                        {article.date ? new Date(article.date).toDateString() : 'No date available'}
                      </Text>
                      {article.author && <Text style={styles.author}>By: {article.author}</Text>}
                      <Text numberOfLines={3} style={styles.preview}>
                        {article.content
                          ? article.content.replace(/<[^>]+>/g, '') // Remove HTML tags
                          : 'No content available.'}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                // Render articles horizontally for categories with subcategories
                <ScrollView
                  horizontal
                  onScroll={(event) => handleScrollEnd(subcategory, event)}
                  scrollEventThrottle={16}
                  contentContainerStyle={styles.horizontalScroll}
                  showsHorizontalScrollIndicator={true}
                >
                  {data[subcategory]?.map((article) => (
                    <View key={article.id} style={styles.articleCard}>
                      {article.image_url && (
                        <Image source={{ uri: article.image_url }} style={styles.image} />
                      )}
                      <Text style={styles.title}>{article.title || 'Untitled'}</Text>
                      <Text style={styles.date}>
                        {article.date ? new Date(article.date).toDateString() : 'No date available'}
                      </Text>
                      {article.author && <Text style={styles.author}>By: {article.author}</Text>}
                      <Text numberOfLines={3} style={styles.preview}>
                        {article.content
                          ? article.content.replace(/<[^>]+>/g, '') // Remove HTML tags
                          : 'No content available.'}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
