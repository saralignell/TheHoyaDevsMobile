import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from './ArticleScreen.css'; // Adjust the path as necessary
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Update the import path

export type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

interface Props {
  route: ArticleScreenRouteProp;
  navigation: any; // Add navigation prop
}

const ArticleScreen: React.FC<Props> = ({ route }) => {
  const { article } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {article.image_url && <Image source={{ uri: article.image_url }} style={styles.image} />}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.date}>{new Date(article.date).toDateString()}</Text>
      {article.author && <Text style={styles.author}>By: {article.author}</Text>}
      <Text style={styles.content}>{article.content.replace(/<[^>]+>/g, '')}</Text>
    </ScrollView>
  );
};

export default ArticleScreen;