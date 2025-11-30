import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Share,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";
import { fetchGames } from "../../helpers/loadArticles";
import { useNavigation } from "@react-navigation/native";
import styles from "../../components/GamesPage.css";
import { Ionicons } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";

export default function GamesPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const gamesData = await fetchGames();
        setGames(gamesData);
      } catch (err) {
        console.error("Error fetching games:", err);
        setError("Failed to fetch games.");
      } finally {
        setLoading(false);
      }
    };

    fetchGamesData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#034da2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  const parseGameDate = (dateString: string) => {
    const date = new Date(dateString);
    // return day of the week abbreviated and month/day
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });
  };

  const parseGameTime = (timeString: string) => {
    if (!timeString) return "TBD";
    if (timeString.toLowerCase() === "tbd") return "TBD";

    let fixedTimeString = timeString.replaceAll(".", "").toUpperCase();
    if (fixedTimeString.indexOf(":") === -1) {
      // create a substing, since this will have AM or PM at the end
      const ampm = fixedTimeString.slice(-2);
      const hours = fixedTimeString.slice(0, -3);
      fixedTimeString = `${hours}:00 ${ampm}`;
    }
    return fixedTimeString;
  };

  const renderGameItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gameCard}
      onPress={() => {
        if (item.media.tickets) {
          Linking.openURL(item.media.tickets);
        } else if (item.media.video) {
          Linking.openURL(item.media.video);
        } else if (item.media.stats) {
          Linking.openURL(item.media.stats);
        } else {
          // No media available
          console.log("No media available for this game.");
        }
      }}
    >
      <View style={styles.gameHeader}>
        <Text style={styles.sportTitle}>{item.sport.title}</Text>
      </View>
      {item.opponent.name !== "NCAA Championships" ? (
        <View style={styles.infoSection}>
          <View style={styles.teamInfo}>
            {item.result.status === null &&
              item.result.team_score === null &&
              item.result.opponent_score === null && (
                <SvgUri
                  uri="https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/guhoyas.com/images/responsive_2022/logo_secondary.svg"
                  width={40}
                  height={40}
                  style={{ marginBottom: 5 }}
                />
              )}
            <Text style={styles.teamName}>Hoyas</Text>
            {item.result.status !== null &&
              (item.result.team_score !== null ||
                item.result.opponent_score !== null) && (
                <Text style={styles.gameScore}>{`${
                  item.result.team_score ?? 0
                }`}</Text>
              )}
          </View>
          <View style={styles.timeSection}>
            <Text style={styles.gameTime}>{parseGameDate(item.date)}</Text>
            <Text style={[styles.gameTime, { marginBottom: 5 }]}>
              {parseGameTime(item.time)}
            </Text>
            {item.location_indicator == "H" ? (
              <Ionicons name="home" size={20} color="#034da2" />
            ) : item.location_indicator == "N" ||
              item.location_indicator == "A" ? (
              <Ionicons name="home-outline" size={20} color="#555" />
            ) : null}
          </View>
          <View style={styles.teamInfo}>
            {item.result.status === null &&
              item.result.team_score === null &&
              item.result.opponent_score === null && (
                <Image
                  source={{ uri: "https://guhoyas.com" + item.opponent.image }}
                  style={styles.teamLogo}
                />
              )}
            <Text style={styles.teamName}>{item.opponent.name}</Text>
            {item.result.status !== null &&
              (item.result.team_score !== null ||
                item.result.opponent_score !== null) && (
                <Text style={styles.gameScore}>{`${
                  item.result.opponent_score ?? 0
                }`}</Text>
              )}
          </View>
        </View>
      ) : (
        <View style={styles.championshipContainer}>
          <View style={styles.fullWidthCenter}>
            <Image
              source={{ uri: "https://guhoyas.com" + item.opponent.image }}
              style={[
                styles.teamLogo,
                { marginRight: 10, width: 60, height: 60 },
              ]}
            />
            <Text style={[styles.teamName, { fontSize: 20 }]}>
              {item.opponent.name}
            </Text>
          </View>
          <Text style={styles.championshipsNote}>
            {parseGameDate(item.date)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.gamesList}
      />
    </View>
  );
}
