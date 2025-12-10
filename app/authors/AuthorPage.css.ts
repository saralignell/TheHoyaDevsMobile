import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    paddingBottom: 20,
    minHeight: Dimensions.get("window").height,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "SourceSerifPro_600SemiBold",
  },
  photoContainer: {
    position: "relative",
    width: 175,
    height: 175,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#034da2",
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  bio: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    fontFamily: "SourceSerifPro_400Regular",
    textAlign: "center",
  },
  article: {
    marginBottom: 15,
    width: 360,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#ccc",
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
});

export default styles;
