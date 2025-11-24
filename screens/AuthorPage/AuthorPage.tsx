import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { fetchArticlesByAuthor, fetchAuthor } from "../../helpers/loadArticles";
import { useNavigation } from "@react-navigation/native";
import styles from "./AuthorPage.css";
import { LinearGradient } from "expo-linear-gradient";

interface Author {
  id: number;
  name: string;
  title: string;
  bio: string;
  url: string;
  profile_photo?: string;
}

export default function AuthorPage({ route }) {
  const { author } = route.params;
  const [authorData, setAuthorData] = useState<Author | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Fetching data for author ID:", author);
    const fetchAuthorData = async () => {
      try {
        const data = await fetchAuthor(author);
        setAuthorData(data);
      } catch (err) {
        console.error("Error fetching author data:", err);
        setError("Failed to fetch author data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchArticlesData = async () => {
      try {
        const articlesData = await fetchArticlesByAuthor(author);
        console.log(
          `Fetched ${articlesData.length} articles for author ID:`,
          author
        );
        setArticles(articlesData);
      } catch (err) {
        console.error("Error fetching articles by author:", err);
        setError("Failed to fetch articles by author.");
      }
    };

    fetchAuthorData();
    fetchArticlesData();
  }, [author]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#034da2" />
      </View>
    );
  }

  if (authorData) {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.photoContainer}>
            <Image
              source={{ uri: authorData.profile_photo }}
              style={styles.profilePhoto}
            />
            <View style={styles.photoOutline} />
          </View>
          <Text style={styles.header}>{authorData.name}</Text>
          <Text style={styles.bio}>{authorData.bio}</Text>
          {articles.length > 0 &&
            articles.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.article}
                onPress={() =>
                  navigation.navigate("Article", { id: article.id })
                }
              >
                {article.image_url ? (
                  <Image
                    source={{ uri: article.image_url }}
                    style={styles.image}
                  />
                ) : null}
                <Text style={styles.title}>{article.title || "Untitled"}</Text>
                <Text style={styles.date}>
                  {new Date(article.date).toDateString()}
                </Text>
                {article.author && (
                  <Text style={styles.author}>By: {article.author}</Text>
                )}
                <Text numberOfLines={3} style={styles.preview}>
                  {article.content
                    ? article.content.replace(/<[^>]+>/g, "")
                    : "No content available."}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
    );
  }
}
