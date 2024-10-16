import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

// Define the structure of the data you are fetching
interface Article {
  id: number;
  title: {
    rendered: string;
  };
}

export default function Index() {
  const [news, setNews] = useState<Article[]>([]); // Store fetched articles
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchNews = async () => {
      try {
        console.log("Fetching news from backend...");
        const response = await axios.get("http://10.120.6.251:3000/getarticles", {
          timeout: 5000,
        });

        if (isMounted) {
          console.log("Fetched news:", response.data);
          setNews(response.data); // Update the state with the fetched articles
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Error fetching news articles:", err.message);
          if (isMounted) setError("Failed to fetch news. Please try again.");
        } else {
          console.error("An unexpected error occurred:", err);
          if (isMounted) setError("An unexpected error occurred.");
        }
      } finally {
        if (isMounted) {
          console.log("Setting loading to false.");
          setLoading(false); // Ensure loading state is cleared
        }
      }
    };

    fetchNews(); // Call the fetch function on mount

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []); // Run the effect only once

  if (loading) {
    console.log("Loading news...");
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    console.log("Error occurred:", error);
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
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
          </View>
        )}
      />
    </View>
  );
}

// Styles for the component
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
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
});
