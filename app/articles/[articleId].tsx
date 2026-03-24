import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Share,
  Image,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Appearance,
} from "react-native";
import { WebView } from "react-native-webview";
import { fetchArticle } from "../../helpers/loadArticles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { HeaderContext } from "../_layout";

type Article = {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  author_id?: number;
  link?: string;
  content: string[];
  isFeature?: boolean;
};

let ScreenHeight = Dimensions.get("window").height;
let colorScheme = Appearance.getColorScheme();

export default function ArticlePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [percentRead, setPercentRead] = useState(0);
  const params = useLocalSearchParams();
  const id = params.articleId;
  const router = useRouter();
  const { setOnArticlePage } = React.useContext(HeaderContext);

  useEffect(() => {
    setOnArticlePage(true);
    return () => {
      setOnArticlePage(false);
    };
  }, []);

  const onShare = async () => {
    if (!article) return;
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
        console.log("Raw fetched data:", fetchedData);
        const article: Article = {
          id: fetchedData.id,
          title: fetchedData.title,
          date: fetchedData.date,
          content: fetchedData.content.split("\n"),
          image_url: fetchedData.image_url,
          link: fetchedData.link,
          author: fetchedData.author,
          author_id: fetchedData.author_id,
          isFeature: fetchedData.isFeature,
        };
        console.log("Fetched article:", article.author_id);
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
  }, [params.articleId]);

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
      {article && !article.isFeature && (
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          overScrollMode="never"
          bounces={false}
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
            <View style={{ flex: 2, width: "80%", paddingHorizontal: 5 }}>
              <Text style={styles.date}>
                {new Date(article.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              {article.author && (
                <TouchableOpacity
                  onPress={() => router.push(`/authors/${article.author_id}`)}
                >
                  <Text style={styles.author}>By: {article.author}</Text>
                </TouchableOpacity>
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
          {article.content.map((paragraph, index) =>
            paragraph.startsWith("<p><img") ? (
              <View key={index} style={[styles.inlineImage]}>
                <Image
                  source={{ uri: paragraph.match(/src="([^"]+)"/)?.[1] || "" }}
                  style={styles.inlineImage}
                />
              </View>
            ) : paragraph.startsWith("<p><iframe") ? (
              <View key={index} style={{ height: 200, marginVertical: 10 }}>
                <WebView
                  source={{ uri: paragraph.match(/src="([^"]+)"/)?.[1] || "" }}
                  style={{ flex: 1 }}
                />
              </View>
            ) : paragraph.startsWith("<p><b") ? (
              <Text key={index} style={[styles.content, styles.boldSubtitle]}>
                {paragraph.replace(/<[^>]*>/g, "")}
              </Text>
            ) : (
              <Text key={index} style={styles.content}>
                {paragraph}
              </Text>
            ),
          )}
        </ScrollView>
      )}
      {article && article.isFeature && (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}
          overScrollMode="never"
        >
          <ImageBackground
            style={styles.featureHeader}
            source={{ uri: article.image_url }}
          >
            <View style={styles.featureShadow} />
            <Text style={styles.featureTitle}>
              {article?.title || "Untitled"}
            </Text>
            <View style={styles.headerHR} />
            <TouchableOpacity
              onPress={() => router.push(`/authors/${article.author_id}`)}
            >
              <Text style={styles.featureSubtitle}>{article.author}</Text>
            </TouchableOpacity>
            <View style={styles.featureShare}>
              <Ionicons
                name="share-outline"
                size={25}
                color="#fff"
                onPress={onShare}
              />
            </View>
          </ImageBackground>
          {article.content.map((paragraph, index) =>
            paragraph.startsWith("<p><img") ? (
              <View key={index} style={[styles.inlineImage]}>
                <Image
                  source={{ uri: paragraph.match(/src="([^"]+)"/)?.[1] || "" }}
                  style={styles.inlineImage}
                />
              </View>
            ) : paragraph.startsWith("<p><iframe") ? (
              <View key={index} style={{ height: 200, marginVertical: 10 }}>
                <WebView
                  source={{ uri: paragraph.match(/src="([^"]+)"/)?.[1] || "" }}
                  style={{ flex: 1 }}
                />
              </View>
            ) : paragraph.startsWith("<p><b") ? (
              <Text key={index} style={[styles.content, styles.boldSubtitle]}>
                {paragraph.replace(/<[^>]*>/g, "")}
              </Text>
            ) : (
              <Text key={index} style={styles.content}>
                {paragraph}
              </Text>
            ),
          )}
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
    backgroundColor: colorScheme === "dark" ? "#000714" : "#fff",
  },
  content: {
    fontSize: 18,
    color: colorScheme === "dark" ? "#fff" : "#333",
    fontFamily: "SourceSerifPro_400Regular",
    padding: 15,
    lineHeight: 26,
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
    color: colorScheme === "dark" ? "#fff" : "#000",
    marginBottom: 5,
    fontFamily: "SourceSerifPro_400Regular",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  date: {
    fontSize: 14,
    color: colorScheme === "dark" ? "#ccc" : "#555",
    padding: 10,
    paddingBottom: 5,
    fontFamily: "SourceSerifPro_400Regular",
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    color: colorScheme === "dark" ? "#ccc" : "#555",
    padding: 10,
    paddingTop: 0,
    fontFamily: "SourceSerifPro_400Regular_Italic",
  },
  featureHeader: {
    width: "100%",
    height: ScreenHeight - 80,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  featureShadow: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
  },
  featureTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingHorizontal: 20,
    fontFamily: "SourceSerifPro_400Regular",
  },
  featureSubtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontFamily: "SourceSerifPro_400Regular_Italic",
    paddingHorizontal: 20,
  },
  featureShare: {
    position: "absolute",
    bottom: 40,
    right: 40,
  },
  headerHR: {
    width: 60,
    height: 2,
    backgroundColor: "white",
    marginTop: 15,
    marginBottom: 15,
  },
  boldSubtitle: {
    fontWeight: "bold",
    marginBottom: -5,
    fontFamily: "SourceSerifPro_600SemiBold",
    fontSize: 20,
  },
  inlineImage: {
    width: "85%",
    height: 85,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: -5,
  },
});
