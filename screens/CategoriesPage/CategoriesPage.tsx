import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { FetchArticlesByCategory } from "../../helpers/loadArticles";
import styles from "./CategoriesPage.css";
import { useNavigation } from "@react-navigation/native";

interface Article {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  content?: string;
}

export default function categoriespage() {
  const [data, setData] = useState<{ [key: string]: Article[] }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const subcategories = [
    "Student-Life",
    "Academics",
    "Grad",
    "City News",
    "Viewpoint",
    "Editorial",
    "Column",
    "Review",
    "Features",
  ];
  const navigation = useNavigation();

  const fetchData = async (
    subcategory: string,
    pageNumber: number,
    limit: number
  ) => {
    if (loading[subcategory]) return; // Prevent concurrent fetches for the same subcategory

    setLoading((prevLoading) => ({ ...prevLoading, [subcategory]: true }));

    const newArticles = await FetchArticlesByCategory(
      subcategory,
      pageNumber,
      limit
    );
    setData((prevData) => ({
      ...prevData,
      [subcategory]: [...(prevData[subcategory] || []), ...newArticles],
    }));

    setLoading((prevLoading) => ({ ...prevLoading, [subcategory]: false }));
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (subcategories.length === 0) return;

      const initialPage = 1;
      const initialLimit = 10;

      const articlesPromises = subcategories.map((subcategory) =>
        fetchData(subcategory, initialPage, initialLimit)
      );

      await Promise.all(articlesPromises);
    };

    fetchInitialData();
  }, []);

  let keyIter = 0;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.subarticlecontainer}>
        {subcategories.map((subcategory) => (
          <View key={subcategory} style={styles.subarticle}>
            <Text style={styles.subarticleTitle}>{subcategory}</Text>
            <ScrollView
              horizontal
              scrollEventThrottle={16}
              contentContainerStyle={styles.horizontalScroll}
              showsHorizontalScrollIndicator={false}
            >
              {data[subcategory]?.map((article) => (
                <TouchableOpacity
                  key={article.id + Math.random()}
                  style={styles.articleCard}
                  onPress={() =>
                    navigation.navigate("Article", {
                      id: article.id,
                    })
                  }
                >
                  {article.image_url && (
                    <Image
                      source={{ uri: article.image_url }}
                      style={styles.image}
                    />
                  )}
                  <Text style={styles.title}>
                    {article.title || "Untitled"}
                  </Text>
                  <Text style={styles.date}>
                    {article.date
                      ? new Date(article.date).toDateString()
                      : "No date available"}
                  </Text>
                  {article.author && (
                    <Text style={styles.author}>By: {article.author}</Text>
                  )}
                  <Text numberOfLines={3} style={styles.preview}>
                    {article.content
                      ? article.content.replace(/<[^>]+>/g, "") // Remove HTML tags
                      : "No content available."}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
