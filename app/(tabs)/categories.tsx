import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { FetchArticlesByCategory } from "../../helpers/loadArticles";
import styles from "../../components/CategoriesPage.css";
import { useRouter } from "expo-router";

interface Article {
  id: number;
  title: string;
  date: string;
  image_url?: string;
  author?: string;
  content?: string;
}

export default function CategoriesPage() {
  const [data, setData] = useState<{ [key: string]: Article[] }>({});
  const inFlightBySubcategory = useRef<{ [key: string]: boolean }>({});
  const router = useRouter();

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

  const fetchData = async (
    subcategory: string,
    pageNumber: number,
    limit: number,
  ) => {
    if (inFlightBySubcategory.current[subcategory]) return;

    inFlightBySubcategory.current[subcategory] = true;
    try {
      const newArticles = await FetchArticlesByCategory(
        subcategory,
        pageNumber,
        limit,
      );

      if (!newArticles?.length) return;

      setData((prevData) => {
        const existing = prevData[subcategory] || [];
        const seen = new Set(existing.map((article) => article.id));
        const dedupedIncoming = newArticles.filter((article) => {
          if (seen.has(article.id)) return false;
          seen.add(article.id);
          return true;
        });

        if (!dedupedIncoming.length) return prevData;

        return {
          ...prevData,
          [subcategory]: [...existing, ...dedupedIncoming],
        };
      });
    } finally {
      inFlightBySubcategory.current[subcategory] = false;
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (subcategories.length === 0) return;

      const initialPage = 1;
      const initialLimit = 5;

      // start by loading just the first 3 subcategories
      const articlesPromises = subcategories
        .slice(0, 3)
        .map((subcategory) =>
          fetchData(subcategory, initialPage, initialLimit),
        );

      await Promise.all(articlesPromises);
    };

    const fetchMoreData = async () => {
      const initialPage = 1;
      const initialLimit = 5;

      // after a delay, load the remaining subcategories
      setTimeout(async () => {
        const articlesPromises = subcategories
          .slice(3)
          .map((subcategory) =>
            fetchData(subcategory, initialPage, initialLimit),
          );

        await Promise.all(articlesPromises);
      }, 2000); // 2 second delay
    };

    fetchInitialData().then(() => {
      fetchMoreData();
    });
  }, []);

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
                  key={`${subcategory}-${article.id}`}
                  style={styles.articleCard}
                  onPress={() => router.push(`/articles/${article.id}`)}
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
