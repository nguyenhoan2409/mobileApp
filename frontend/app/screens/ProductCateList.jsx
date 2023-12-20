import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import {useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, SIZES} from '../constants';
import ProductCardView from '../components/ProductCardView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/GlobalAPI';

const ProductCateList = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;

  const [userToken, setUserToken] = useState('');
  const [productListByCategoryId, setProductListByCategoryId] = useState([]);
  useEffect(() => {
    const getProductListByCategoryId = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');

        setUserToken(value);
        // console.log(userToken);

        var response = await API.requestGET_SP(
          `/products/byCategory?categoryId=${item._id}&token=${value}`,
        );
        if (response) {
          setProductListByCategoryId(response);
        } else {
          showMessage({
            message: 'Lỗi',
            description: '',
            type: 'danger',
            position: 'top',
            duration: 2000,
            icon: props => (
              <AntDesign
                name="warning"
                size={22}
                color={COLORS.white}
                style={{padding: 10}}
                {...props}
              />
            ),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductListByCategoryId();
  }, []);

  const numColumns = 2;

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{paddingLeft: 7}}>
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>

            <View style={styles.headerWrapper}>
              <Text style={styles.header}>{item.name}</Text>
            </View>
          </View>

          <View style={styles.productListContainer}>
            <FlatList
              data={productListByCategoryId}
              keyExtractor={item => item._id}
              maxToRenderPerBatch={2}
              renderItem={({item, index}) => (
                <ProductCardView item={item} key={index} />
              )}
              contentContainerStyle={{
                columnGap: SIZES.medium - 5,
                rowGap: SIZES.medium - 5,
              }}
              numColumns={numColumns}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ProductCateList;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  headerContainer: {
    marginBottom: 10,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: 'bold',
  },
  productListContainer: {
    marginLeft: 10,
  }
});
