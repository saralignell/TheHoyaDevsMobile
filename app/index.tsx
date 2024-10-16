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
    const fetchNews = async () => {
      try {
        console.log("Fetching news from backend...");
        const response = await axios.get("http://10.128.224.120:3000/getarticles", {
          timeout: 10000, // Increase timeout
        });
        console.log("Fetched news:", response.data); // Log the data received
        setNews(response.data); // Update the state with the fetched news
        setLoading(false); // Set loading to false
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching news articles:", error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    };

    fetchNews();
  }, []); // Ensure it runs only once on mount

  if (loading) {
    console.log("Loading news...");
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (news.length === 0) {
    console.log("No news found.");
    return (
      <View style={styles.loadingContainer}>
        <Text>No articles available.</Text>
      </View>
    );
  }

  console.log("Rendering news...");
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Featured News</Text>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Text style={styles.title}>{item.title.rendered}</Text>
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
