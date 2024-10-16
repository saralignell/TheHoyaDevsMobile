import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

// Define the structure of the data you are fetching
interface Article {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
}

export default function Index() {
  const [news, setNews] = useState<Article[]>([]);  // Specify the type of the news state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured news articles from the server
    const fetchNews = async () => {
      try {
        //Put ip address of the computer the server is running on. To run server, navigate to server folder and run "npm start"
        const response = await axios.get("http://10.128.224.120:3000/getarticles");
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news articles:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Featured News</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}  // No more error on 'id'
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.title}>{item.title.rendered}</Text>  // No more error on 'title'
            <Text style={styles.excerpt}>
              {item.excerpt.rendered.replace(/(<([^>]+)>)/gi, "")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  newsItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  excerpt: {
    fontSize: 14,
    color: "#555",
  },
});
