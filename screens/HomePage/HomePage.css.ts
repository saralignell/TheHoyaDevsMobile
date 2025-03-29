import { StyleSheet, Platform, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
    fontFamily: "SourceSerifPro_600SemiBold",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
    fontFamily: "SourceSerifPro_300Light",
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 5,
  },
  preview: {
    fontSize: 16,
    color: "#333",
    fontFamily: "SourceSerifPro_400Regular",
  },
  headline: {
    width: "100%",
    marginTop: 10,
  },
  headlineImage: {
    width: Dimensions.get("window").width,
    transform: [{ translateX: -10 }],
    height: 250,
    marginBottom: 20,
    backgroundColor: "#f5f5f5",
  },
  headlineTitle: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "SourceSerifPro_600SemiBold",
    position: "absolute",
    bottom: -20,
    left: 10,
    width: "90%",
    paddingHorizontal: 10,
  },
  hr: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 20,
    width: "90%",
    alignSelf: "center",
  },
  headlineDate: {
    paddingHorizontal: 10,
  },
  headlinePreview: {
    paddingHorizontal: 10,
  },
  footer: {
    padding: 15,
    paddingHorizontal: 60,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  footerText: {
    fontFamily: "SourceSerifPro_400Regular",
    color: "#034da2",
  },
});

export default styles;
