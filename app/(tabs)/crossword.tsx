import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  useColorScheme,
  View,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { fetchCrossword } from "../../helpers/loadArticles";

export default function CrosswordPage() {
  const [crossword, setCrossword] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const injectedThemeScript = useMemo(
    () => `
      (function () {
        var isDark = ${isDark ? "true" : "false"};
        var root = document.documentElement;
        var body = document.body;

        if (root) {
          root.classList.toggle('dark-mode', isDark);
          root.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }

        if (body) {
          body.classList.toggle('dark-mode', isDark);
          body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        }
      })();
      true;
    `,
    [isDark],
  );

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
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? "#000714" : "#fff" },
        ]}
      >
        <ActivityIndicator
          color={colorScheme === "dark" ? "#005ac1" : "#034da2"}
          size={"large"}
          style={styles.loading}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000714" : "#fff" },
      ]}
    >
      <WebView
        key={isDark ? "dark" : "light"}
        source={{
          uri:
            "https://puzzleme.amuselabs.com/pmm/crossword?&set=" +
            crossword +
            "&embed=wp&id=" +
            id,
        }}
        style={styles.webview}
        injectedJavaScriptBeforeContentLoaded={injectedThemeScript}
        injectedJavaScript={injectedThemeScript}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
});
