import { Appearance, StyleSheet } from "react-native";
const colorScheme = Appearance.getColorScheme();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme === "dark" ? "#000714" : "#fff",
  },
  gamesList: {
    padding: 20,
  },
  gameCard: {
    backgroundColor: colorScheme === "dark" ? "#000714" : "#fff",
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#034da2",
    overflow: "hidden",
  },
  gameHeader: {
    backgroundColor: "#034da2",
    padding: 10,
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameHeaderDate: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "SourceSerifPro_400Regular",
  },
  sportTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "SourceSerifPro_600SemiBold",
  },
  gameTitle: {
    fontSize: 16,
    marginVertical: 8,
    fontFamily: "SourceSerifPro_400Regular",
    paddingHorizontal: 10,
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  teamInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  teamLogo: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "SourceSerifPro_600SemiBold",
    color: colorScheme === "dark" ? "#fff" : "#333",
  },
  timeSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gameTime: {
    fontSize: 16,
    fontFamily: "SourceSerifPro_600SemiBold",
    color: colorScheme === "dark" ? "#fff" : "#333",
  },
  gameLocation: {
    fontSize: 14,
    fontFamily: "SourceSerifPro_400Regular",
    color: colorScheme === "dark" ? "#fff" : "#333",
  },
  extraInfo: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: colorScheme === "dark" ? "#f9f9f9" : "#007140",
  },
  fullWidthCenter: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  championshipContainer: {
    alignItems: "center",
    padding: 20,
  },
  championshipsNote: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "SourceSerifPro_400Regular",
  },
  gameScore: {
    fontSize: 26,
    fontFamily: "SourceSerifPro_400Regular",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
  },
});

export default styles;
