import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library
import axios from 'axios';

// Define the article type
interface Article {
  id: number;
  date: string;
  title: string;
  link: string;
  content: string;
  image_url: string;
}

const Searchpage = () => {
  const [searchText, setSearchText] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch articles by keyword
  const fetchArticles = async () => {
    if (!searchText) return;
    setLoading(true);
    try {
      const articlesData = await FetchArticlesByKeyword(searchText);
      setArticles(articlesData);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching articles:', error.message);
      } else {
        console.error('Unknown error occurred while fetching articles.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSearchText('');
    setArticles([]);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={fetchArticles} // Trigger search on submit
          placeholderTextColor="#aaa"
        />
        {searchText ? (
          <TouchableOpacity onPress={handleCancel}>
            <Ionicons name="close" size={20} color="#888" style={styles.clearIcon} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Articles View */}
      <View style={styles.articlesContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#094C9F" />
        ) : (
          <FlatList
            data={articles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.article}>
                <View style={styles.articleTextContainer}>
                  <Text style={styles.articleTitle} numberOfLines={3}>
                    {item.title}
                  </Text>
                  <Text style={styles.articleContent} numberOfLines={3}>
                    {item.content}
                  </Text>
                </View>
                {item.image_url ? (
                  <Image source={{ uri: item.image_url }} style={styles.articleImage} />
                ) : null}
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={<Text style={styles.noArticlesText}>No articles found</Text>}
          />
        )}
      </View>
    </View>
  );
};

// Fetch Articles by Keyword
async function FetchArticlesByKeyword(keyword: string, pageNumber = 1, limit = 10): Promise<Article[]> {
  const apiUrl = 'https://thehoya.com/wp-json/wp/v2/posts';

  try {
    const response = await axios.get(apiUrl, {
      params: { per_page: limit, page: pageNumber, search: keyword },
    });

    const articles = response.data;

    const articlesFormatted: Article[] = await Promise.all(
      articles.map(async (article: any) => {
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
    if (error instanceof Error) {
      console.error('Error fetching articles by keyword:', error.message);
    } else {
      console.error('Unknown error occurred while fetching articles.');
    }
    return [];
  }
}

// Helper function to fetch the image URL
async function fetchImage(mediaId: number): Promise<string> {
  try {
    const mediaResponse = await axios.get(`https://thehoya.com/wp-json/wp/v2/media/${mediaId}`);
    return mediaResponse.data.source_url || '';
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching image for media ID ${mediaId}:`, error.message);
    } else {
      console.error(`Unknown error occurred while fetching image for media ID ${mediaId}.`);
    }
    return '';
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15, // Add spacing below search bar
    backgroundColor: 'transparent',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 10, // Increased border radius for rounder appearance
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    color: '#333',
  },
  clearIcon: {
    marginLeft: 10,
  },
  articlesContainer: {
    flex: 1,
    padding: 10,
  },
  article: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  articleTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  articleContent: {
    fontSize: 14,
    color: '#666',
  },
  articleImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  noArticlesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});

export default Searchpage;
