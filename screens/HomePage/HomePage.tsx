import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  ActivityIndicator,
} from "react-native";
import { FetchArticlesByCategory } from "../../helpers/loadArticles";
import { useNavigation } from "@react-navigation/native";
import styles from "./HomePage.css";
import { ScrollView } from "react-native-gesture-handler";
import SectionBadge from "../../components/SectionBadge";
import { LinearGradient } from "expo-linear-gradient";

interface Article {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  content?: string;
}

export default function Index() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("News");
  const navigation = useNavigation();
  const categories = [
    "News",
    "Opinion",
    "Guide",
    "Sports",
    "Features",
    "Science",
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchFeaturedNews = async () => {
      try {
        const articles = await FetchArticlesByCategory("News - Top", 1);
        if (isMounted) setNews(articles || []);
      } catch (err) {
        console.error("Error fetching featured news:", err);
        if (isMounted) setError("Failed to fetch featured news.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFeaturedNews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchArticles = async () => {
      try {
        let category = selectedCategory;
        switch (selectedCategory) {
          case "News":
            category = "News - Top";
            break;
          case "Guide":
            const articles = await FetchArticlesByCategory(13266, 1);
            if (isMounted) setNews(articles || []);
            return;
          default:
            break;
        }

        const articles = await FetchArticlesByCategory(selectedCategory, 1);
        if (isMounted) setNews(articles || []);
      } catch (err) {
        console.error("Error fetching articles:", err);
        if (isMounted) setError("Failed to fetch articles.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchArticles();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  if (loading) return <ActivityIndicator size="large" color="#034da2" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ id: 0 }, ...news, { id: 1 }]}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item, index }) =>
          index === 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <SectionBadge
                  key={category}
                  category={category}
                  selected={selectedCategory === category}
                  onPress={(category) => {
                    setSelectedCategory(category);
                  }}
                />
              ))}
            </ScrollView>
          ) : index === news.length + 1 ? (
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://thehoya.com/privacy-policy/")
                }
              >
                <Text style={styles.footerText}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://thehoya.com/privacy-policy/")
                }
              >
                <Text style={styles.footerText}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
          ) : index === 1 ? (
            <TouchableOpacity
              style={styles.headline}
              onPress={() => navigation.navigate("Article", { id: item.id })}
            >
              {item.image_url ? (
                <ImageBackground
                  source={{ uri: item.image_url }}
                  style={styles.headlineImage}
                >
                  <LinearGradient
                    colors={[
                      "transparent",
                      "rgba(255, 255, 255, 0.5)",
                      "rgba(255, 255, 255, 1)",
                    ]}
                    style={{ height: "100%", width: "100%" }}
                  />
                  <Text style={[styles.title, styles.headlineTitle]}>
                    {item.title || "Untitled"}
                  </Text>
                </ImageBackground>
              ) : (
                <Text style={[styles.title]}>{item.title || "Untitled"}</Text>
              )}
              <Text style={[styles.date, styles.headlineDate]}>
                {new Date(item.date).toDateString()}
              </Text>
              {item.author && (
                <Text style={styles.author}>By: {item.author}</Text>
              )}
              <Text
                numberOfLines={3}
                style={[styles.preview, styles.headlinePreview]}
              >
                {item.content
                  ? item.content.replace(/<[^>]+>/g, "")
                  : "No content available."}
              </Text>
              <View style={styles.hr} />
            </TouchableOpacity>
          ) : (
            index > 1 && (
              <TouchableOpacity
                style={styles.article}
                onPress={() => navigation.navigate("Article", { id: item.id })}
              >
                {item.image_url ? (
                  <Image
                    source={{ uri: item.image_url }}
                    style={styles.image}
                  />
                ) : null}
                <Text style={styles.title}>{item.title || "Untitled"}</Text>
                <Text style={styles.date}>
                  {new Date(item.date).toDateString()}
                </Text>
                {item.author && (
                  <Text style={styles.author}>By: {item.author}</Text>
                )}
                <Text numberOfLines={3} style={styles.preview}>
                  {item.content
                    ? item.content.replace(/<[^>]+>/g, "")
                    : "No content available."}
                </Text>
              </TouchableOpacity>
            )
          )
        }
      />
    </View>
  );
}
