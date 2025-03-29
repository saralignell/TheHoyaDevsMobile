import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { subcategories } from "../helpers/categories";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  category: string;
  onPress: (category: string) => void;
  selected: boolean;
}

export default function SectionBadge({ category, onPress, selected }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.badge, selected && styles.selected]}
        onPress={() => {
          onPress(category);
        }}
      >
        <Text style={[styles.text, selected && styles.selected]}>
          {category}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  badge: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    borderColor: "#034da2",
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#034da2",
    color: "#fff",
  },
  text: {
    color: "#034da2",
    fontFamily: "SourceSerifPro_600SemiBold",
  },
});
