import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';
import API from '../services/GlobalAPI';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import ProductCardView from '../components/ProductCardView';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(false); 
  const [productResults, setProductResults] = useState([]);
  const numColumns = 2;

  useEffect(() => {
    fetchAllProducts();
  }, [searchQuery]);

  const fetchAllProducts = async () => {
    try {
      const response = await API.requestGET_SP('/products/all');

      if (response) {
        setProductResults(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const translationMap = {
    "table": "bàn",
  };

  // const recommendedProductList = [
  //   {
  //     id: '0',
  //     image:
  //       'https://th.bing.com/th/id/R.1bee6d4bc26e55bd466f7e52a14649f2?rik=iEWQcHhdRwed1A&pid=ImgRaw&r=0',
  //     name: 'bàn',
  //   },
  //   {
  //     id: '1',
  //     image:
  //       'https://th.bing.com/th/id/R.bbb193f0e0465f56dbf902b530acea78?rik=bRfwk29PpnO8DQ&riu=http%3a%2f%2fpngimg.com%2fuploads%2fbed%2fbed_PNG17395.png&ehk=pNB%2bkWfzJitTo5PyEMeMpvnOZVuAmhSCNo1%2bfwEfUAY%3d&risl=&pid=ImgRaw&r=0',
  //     name: 'giường',
  //   },
  //   {
  //     id: '3',
  //     image:
  //       'https://th.bing.com/th/id/R.28ce8a5bd1e631b8cce64181e3505d3f?rik=4m37lXNm6omsZg&pid=ImgRaw&r=0',
  //     name: 'ghế',
  //   },
  //   {
  //     id: '4',
  //     image:
  //       'https://th.bing.com/th/id/R.11e91286e0e4212e01a11d678a589fd3?rik=DZcWWA3yzXDgiQ&pid=ImgRaw&r=0',
  //     name: 'đèn',
  //   },
  //   {
  //     id: '5',
  //     image:
  //       'https://p7.hiclipart.com/preview/73/595/750/sink-bathroom-set-the-sink.jpg',
  //     name: 'bồn tắm',
  //   },
  // ]

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          const source = { uri: response.assets[0].uri };
          searchWithImage(source.uri);
        } else {
          console.log("No URI returned from Image Picker");
        }
      }
    });
  };

  const convertImageToBase64 = (uri) => {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          console.error("Error converting image to Base64:", error);
          reject(error);
        });
        
    });
  };
  
  
  const searchWithImage = async (imageUri) => {
    try {
      const imageBase64 = await convertImageToBase64(imageUri);
      const base64EncodedImage = imageBase64.split(',')[1];
  
      const body = {
        requests: [
          {
            image: {
              content: base64EncodedImage
            },
            features: [
              { type: "LABEL_DETECTION" }
            ],
            imageContext: {
              languageHints: ["vi"]
            }
          }
        ]
      };
  
      const apiKey = 'AIzaSyAO49E_lWfOEAcl1i-x_r4nBlaZdeI9IGI';
      const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, body);
  
      const labels = response.data.responses[0].labelAnnotations;
      const originalLabel = labels[0].description;

      let translatedLabel = originalLabel;
      if (translationMap[originalLabel.toLowerCase()]) {
        translatedLabel = translationMap[originalLabel.toLowerCase()];
      }

      setSearchQuery(translatedLabel);
    } catch (error) {
      if (error.response) {
        console.log("Error Data:", error.response.data);
        console.log("Error Status:", error.response.status);
        console.log("Error Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Error Request:", error.request);
      } else {
        console.log("Error Message:", error.message);
      }
      console.log("Error Config:", error.config);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await API.requestPOST_SP('/products/search', { name: query });
      if (response) {
        setProductResults(response);
      } else {
        setProductResults([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchSearchResults(searchQuery);
    } else {
      setProductResults([]);
    }
  }, [searchQuery]);


  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={productResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ProductCardView item={item} />}
          numColumns={numColumns}
          ListHeaderComponent={
            <>
              <View style={styles.searchContainer}>
                <TouchableOpacity>
                  <Feather name="search" size={24} style={styles.searchIcon} />
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                  <TextInput
                    value={searchQuery}
                    placeholder="Tìm kiếm sản phẩm"
                    onChangeText={(text) => {
                        setSearchQuery(text); 
                    }}
                    style={styles.searchInput}
                  />
                </View>

                <View>
                  <TouchableOpacity style={styles.searchBtn} onPress={selectImage}>
                    <Ionicons
                      name="camera-outline"
                      size={SIZES.xLarge}
                      color={COLORS.offwhite}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          }
          contentContainerStyle={{
            paddingHorizontal: SIZES.small,
            paddingTop: SIZES.small,
          }}
        />
      </SafeAreaView>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  header: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: 'regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  itemList: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    textAlign: 'center',
    borderRadius: 600,
    padding: 6,
  },
  searchResultList: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    padding: 6, 
    paddingLeft: 10, 
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray3, 
  }
});
