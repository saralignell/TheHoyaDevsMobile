import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  maincontainer: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
  },
  scrollcontainer: {
    height: '7%',
    paddingHorizontal: 10,
  },
  categoriesheader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: screenWidth * 0.3,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#d4d4d4',
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subarticlecontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  subarticle: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  subarticleTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  verticalArticleCard: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  
  articleCard: {
    width: screenWidth * 0.7,
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  date: {
    fontSize: screenWidth * 0.035,
    color: '#777',
    marginBottom: 5,
  },
  author: {
    fontSize: screenWidth * 0.035,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 5,
  },
  preview: {
    fontSize: screenWidth * 0.04,
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default styles;