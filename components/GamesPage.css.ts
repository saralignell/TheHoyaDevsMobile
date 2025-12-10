import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gamesList: {
    padding: 20,
  },
  gameCard: {
    backgroundColor: "#fff",
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
  },
  timeSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  gameTime: {
    fontSize: 16,
    fontFamily: "SourceSerifPro_600SemiBold",
  },
  gameLocation: {
    fontSize: 14,
    fontFamily: "SourceSerifPro_400Regular",
  },
  extraInfo: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#f9f9f9",
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
});

export default styles;
