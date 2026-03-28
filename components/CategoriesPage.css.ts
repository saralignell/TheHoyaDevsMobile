import { StyleSheet, Dimensions, Appearance } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme === "dark" ? "#000714" : "#fff",
  },
  maincontainer: {
    flex: 1,
    width: "100%",
  },
  scrollcontainer: {
    height: "7%",
    paddingHorizontal: 10,
  },
  categoriesheader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: screenWidth * 0.3,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: colorScheme === "dark" ? "#333" : "#d4d4d4",
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  subarticlecontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: colorScheme === "dark" ? "#000714" : "#fff",
  },
  subarticle: {
    marginBottom: 15,
  },
  subarticleTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "SourceSerifPro_600SemiBold",
    color: colorScheme === "dark" ? "#fff" : "#000",
  },
  horizontalScroll: {
    flexDirection: "row",
    alignSelf: "flex-start",
    minHeight: 300,
  },
  verticalArticleCard: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colorScheme === "dark" ? "#333" : "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  articleCard: {
    width: screenWidth * 0.7,
    alignSelf: "flex-start",
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colorScheme === "dark" ? "#000714" : "#fff",
    borderWidth: 0.5,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: screenWidth * 0.05,
    fontWeight: "bold",
    color: colorScheme === "dark" ? "#fff" : "#000",
    marginBottom: 5,
    fontFamily: "SourceSerifPro_600SemiBold",
  },
  date: {
    fontSize: screenWidth * 0.035,
    color: colorScheme === "dark" ? "#ccc" : "#777",
    marginBottom: 5,
    fontFamily: "SourceSerifPro_300Light",
  },
  author: {
    fontSize: screenWidth * 0.035,
    fontStyle: "italic",
    color: colorScheme === "dark" ? "#ccc" : "#555",
    marginBottom: 5,
  },
  preview: {
    fontSize: screenWidth * 0.04,
    color: colorScheme === "dark" ? "#ccc" : "#333",
    fontFamily: "SourceSerifPro_400Regular",
  },
  loading: {
    textAlign: "center",
    marginVertical: 40,
    fontSize: 18,
  },
});

export default styles;
