import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Pressable } from 'react-native';

interface LoadMoreProps {
  loading: boolean;
  hasMore: boolean;
  onPress: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ loading, hasMore, onPress }) => {
  if (!hasMore) {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>No more articles</Text>
      </View>
    );
  }

  return (
    <View style={styles.footer}>
      <Pressable
        onPress={onPress}
        disabled={loading}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          loading && styles.buttonDisabled
        ]}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.buttonText}>Loading...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Load More Articles</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPressed: {
    backgroundColor: '#0056b3',
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    backgroundColor: '#99c7ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  }
});

export default LoadMore;