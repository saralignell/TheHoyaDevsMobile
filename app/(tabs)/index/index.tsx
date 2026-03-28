import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  ScrollView,
  RefreshControl,
  Appearance,
  ActivityIndicator,
} from "react-native";
import { FetchArticlesByCategory } from "../../../helpers/loadArticles";
import styles from "./HomePage.css";
import SectionBadge from "../../../components/SectionBadge";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";

interface Article {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  content?: string;
  reading_time?: number;
}

const colorScheme = Appearance.getColorScheme();

export default function Index() {
  const { setIsReady } = useLocalSearchParams();
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("News");
  const [isFirstMount, setIsFirstMount] = useState(true);

  const router = useRouter();

  const categories = [
    "News",
    "Opinion",
    "Guide",
    "Sports",
    "Features",
    "Science",
  ];

  const fetchFeaturedNews = async () => {
    let category = selectedCategory;
    switch (selectedCategory) {
      case "News":
        category = "News - Top";
        break;
      case "Guide":
        const articles = await FetchArticlesByCategory(13266, 1);
        setNews(articles || []);
        return;
      default:
        break;
    }
    try {
      const articles = await FetchArticlesByCategory("News - Top", 1);
      setNews(articles || []);
      console.log("Featured news loaded");
    } catch (err) {
      console.error("Error fetching featured news:", err);
      if (isFirstMount) setError("Failed to fetch featured news.");
    } finally {
      setLoading(false);
      // set a 2 second delay before marking the app as ready
      setTimeout(() => {
        console.log("App is ready");
        //setIsReady(true);
      }, 2000);
    }
  };

  const fetchArticles = async () => {
    try {
      let category = selectedCategory;
      switch (selectedCategory) {
        case "News":
          category = "News - Top";
          break;
        case "Guide":
          const articles = await FetchArticlesByCategory(13266, 1);
          setNews(articles || []);
          return;
        default:
          break;
      }

      const articles = await FetchArticlesByCategory(category, 1);
      setNews(articles || []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to fetch articles.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setLoading(true);
    fetchArticles();
  };

  useEffect(() => {
    fetchFeaturedNews();
    setIsFirstMount(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!isFirstMount) {
      fetchArticles();
    }

    setIsFirstMount(false);

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      {news.length > 0 ? (
        <FlatList
          data={[{ id: 0 }, ...news, { id: 1 }]}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 0, minHeight: "100%" }}
          renderItem={({ item, index }) =>
            index === 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingTop: 10, paddingHorizontal: 10 }}
              >
                {categories.map((category) => (
                  <SectionBadge
                    key={category}
                    category={category}
                    selected={selectedCategory === category}
                    onPress={(category) => {
                      setSelectedCategory(category);
                      setLoading(true);
                    }}
                  />
                ))}
              </ScrollView>
            ) : index === news.length + 1 ? (
              <View style={styles.footer}>
                <View style={styles.footerContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://thehoya.com/privacy-policy-the-hoya-app/",
                      )
                    }
                  >
                    <Text style={styles.footerText}>Privacy Policy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://thehoya.com/terms-conditions-the-hoya-app/",
                      )
                    }
                  >
                    <Text style={styles.footerText}>Terms of Service</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.footerContainer}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://thehoya.com/")}
                  >
                    <Text style={styles.footerText}>© 2025 The Hoya</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL("https://www.hoyadevelopers.com/")
                    }
                  >
                    <Text style={styles.footerText}>
                      Built by Hoya Developers
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : index === 1 ? (
              <TouchableOpacity
                style={styles.headline}
                onPress={() => {
                  console.log("Navigating to article", item.id);
                  router.push(`/articles/${item.id}`);
                }}
              >
                {item.image_url ? (
                  <ImageBackground
                    source={{ uri: item.image_url }}
                    style={styles.headlineImage}
                  >
                    {colorScheme === "dark" ? (
                      <LinearGradient
                        colors={[
                          "transparent",
                          "rgba(0, 7, 20, 0.5)",
                          "rgba(0, 7, 20, 1)",
                        ]}
                        style={{ height: "100%", width: "100%" }}
                      />
                    ) : (
                      <LinearGradient
                        colors={[
                          "transparent",
                          "rgba(255, 255, 255, 0.5)",
                          "rgba(255, 255, 255, 1)",
                        ]}
                        style={{ height: "100%", width: "100%" }}
                      />
                    )}
                    <Text style={[styles.title, styles.headlineTitle]}>
                      {item.title || "Untitled"}
                    </Text>
                  </ImageBackground>
                ) : (
                  <Text style={[styles.title]}>{item.title || "Untitled"}</Text>
                )}
                <Text style={[styles.date, styles.headlineDate]}>
                  {new Date(item.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {item.reading_time} min read
                </Text>
                {item.author && (
                  <Text style={styles.author}>By: {item.author}</Text>
                )}
                <Text
                  numberOfLines={3}
                  style={[styles.preview, styles.headlinePreview]}
                >
                  {item.content
                    ? item.content.replace(/<[^>]+>/g, "").replace(/\n/g, " ")
                    : "No content available."}
                </Text>
                <View style={styles.hr} />
              </TouchableOpacity>
            ) : (
              index > 1 && (
                <TouchableOpacity
                  style={styles.article}
                  onPress={() => router.push(`/articles/${item.id}`)}
                >
                  {item.image_url ? (
                    <Image
                      source={{ uri: item.image_url }}
                      style={styles.image}
                    />
                  ) : null}
                  <Text style={styles.title}>{item.title || "Untitled"}</Text>
                  <Text style={styles.date}>
                    {new Date(item.date).toDateString()} • {item.reading_time}{" "}
                    min read
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
      ) : (
        <ActivityIndicator
          color={colorScheme === "dark" ? "#005ac1" : "#034da2"}
          style={styles.error}
          size={"large"}
        />
      )}
    </View>
  );
}
