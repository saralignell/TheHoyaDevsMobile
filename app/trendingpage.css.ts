
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    fontSize: 18,
  },
  article: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  largeNumber: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman', 
    color: '#104c9c', // Adjust the color if needed
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 5,
  },
  preview: {
    fontSize: 16,
    color: '#333',
  },
});

export default styles;