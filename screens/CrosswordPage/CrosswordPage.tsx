import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { fetchCrossword } from "../../helpers/loadArticles";

export default function CrosswordPage() {
  const [crossword, setCrossword] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const loadCrossword = async () => {
      const data = await fetchCrossword();
      let url = data.content.match(/data-set=(.*)data-puzzle/)[1];
      url = url.substring(1, url.length - 2);

      let tempId = data.content.match(/data-id=(.*)data-set/)[1];
      tempId = tempId.substring(1, tempId.length - 2);

      setCrossword(url);
      setId(tempId);
    };

    loadCrossword();
  }, []);

  if (!crossword || !id) {
    return null;
  }

  return (
    <WebView
      source={{
        uri:
          "https://puzzleme.amuselabs.com/pmm/crossword?&set=" +
          crossword +
          "&embed=wp&id=" +
          id,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
