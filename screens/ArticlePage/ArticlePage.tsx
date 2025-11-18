import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Share,
  Image,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { fetchArticle } from "../../helpers/loadArticles";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Article {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  link?: string;
  content: string[];
}

export default function ArticlePage({ route }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [percentRead, setPercentRead] = useState(0);
  const { id } = route.params;

  const onShare = async () => {
    try {
      if (Platform.OS === "android") {
        await Share.share({
          message: `${article.link}`,
          title: article.title,
        });
      } else if (Platform.OS === "ios") {
        await Share.share({
          message: "Check out this article: " + article.title,
          url: article.link,
        });
      }
    } catch (error) {
      console.error("Error sharing article:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchArticleData = async () => {
      try {
        const fetchedData = await fetchArticle(id);
        const article: Article = {
          id: fetchedData.id,
          title: fetchedData.title,
          date: fetchedData.date,
          content: parseArticle(fetchedData.content),
          image_url: fetchedData.image_url,
          link: fetchedData.link,
          author: fetchedData.author,
        };
        if (isMounted) setArticle(article);
      } catch (err) {
        console.error("Error fetching article:", err);
        if (isMounted) setError("Failed to fetch article.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticleData();

    return () => {
      isMounted = false;
    };
  }, [route.params.id]);

  const parseArticle = (content: string) => {
    const paragraphs = content.split("\n");
    for (let i = 0; i < paragraphs.length; i++) {
      //removes inline figures or ratings from the guide
      if (
        paragraphs[i].startsWith("<figure") ||
        paragraphs[i].startsWith("<p><img")
      ) {
        paragraphs.splice(i, 1);
      }
      paragraphs[i] = paragraphs[i].replace(/<[^>]*>/g, "");
    }
    return paragraphs;
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const maxScroll =
      event.nativeEvent.contentSize.height -
      event.nativeEvent.layoutMeasurement.height;
    if (scrollPosition >= maxScroll) {
      setPercentRead(100);
      return;
    } else if (scrollPosition <= 0) {
      setPercentRead(0);
      return;
    }
    const percent = (scrollPosition / maxScroll) * 100;
    setPercentRead(percent);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#034da2"
          style={styles.loading}
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      {article && (
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <Text style={styles.title}>{article?.title || "Untitled"}</Text>
          {article.image_url && (
            <View style={[styles.image, { backgroundColor: "#eee" }]}>
              <Image
                source={{ uri: article?.image_url }}
                style={styles.image}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "110%",
            }}
          >
            <View style={{ flex: 2, width: "80%" }}>
              <Text style={styles.date}>
                {new Date(article.date).toDateString()}
              </Text>
              {article.author && (
                <Text style={styles.author}>By: {article.author}</Text>
              )}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="share-outline"
                size={25}
                color="#777"
                onPress={onShare}
              />
            </View>
          </View>
          {article.content.map((paragraph, index) => (
            <Text key={index} style={styles.content}>
              {paragraph}
            </Text>
          ))}
        </ScrollView>
      )}
      <View
        style={{
          height: 2,
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "#034da2",
          width: `${percentRead}%`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    fontSize: 18,
    color: "#333",
    fontFamily: "SourceSerifPro_400Regular",
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "red",
    fontSize: 18,
  },
  article: {
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 220,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
    fontFamily: "SourceSerifPro_400Regular",
    padding: 10,
  },
  date: {
    fontSize: 14,
    color: "#777",
    padding: 10,
    paddingBottom: 5,
    fontFamily: "SourceSerifPro_400Regular",
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    padding: 10,
    paddingTop: 0,
    fontFamily: "SourceSerifPro_400Regular_Italic",
  },
});
