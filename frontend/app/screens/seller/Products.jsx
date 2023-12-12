import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductCardView from '../../components/ProductCardView';



const Products = () => {
    const productList = [
        {
          title: 'Ghế sofa',
          supplier: 'ZONO',
          price: 2000000,
          imageUrl:
            'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
          description: 'Ghế sofa',
        },
        {
          title: 'Ghế sofa',
          supplier: 'ZONO',
          price: 2000000,
          imageUrl:
            'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
          description: 'Ghế sofa',
        },
        {
          title: 'Ghế sofa',
          supplier: 'ZONO',
          price: 2000000,
          imageUrl:
            'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
          description: 'Ghế sofa',
        },
        {
          title: 'Ghế sofa',
          supplier: 'ZONO',
          price: 2000000,
          imageUrl:
            'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
          description: 'Ghế sofa',
        },
      ];
     return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Feather name="search" size={24} style={styles.searchIcon} />
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              value=""
            //   onPressIn={() => {
            //     navigation.navigate('Search');
            //   }}
              placeholder="Tìm kiếm sản phẩm"
              style={styles.searchInput}
            />
          </View>

          <View>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons
                name="camera-outline"
                size={SIZES.xLarge}
                color={COLORS.offwhite}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.allProductsWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.header}>Tất cả sản phẩm</Text>
              
              <TouchableOpacity>
              <Text style={{color: COLORS.gray1, paddingRight: SIZES.small}}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={productList}
              keyExtractor={item => item._id}
              maxToRenderPerBatch={3}
              renderItem={({item, index}) => (
                <ProductCardView item={item} key={index} />
              )}
              horizontal
              contentContainerStyle={{columnGap: SIZES.medium - 5}}></FlatList>
          </View>

          <View style={styles.bestSellProductWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.header}>Sản phẩm bán chạy</Text>
              
              <TouchableOpacity>
              <Text style={{color: COLORS.gray1, paddingRight: SIZES.small}}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={productList}
              keyExtractor={item => item._id}
              maxToRenderPerBatch={3}
              renderItem={({item, index}) => (
                <ProductCardView item={item} key={index} />
              )}
              horizontal
              contentContainerStyle={{columnGap: SIZES.medium - 5}}></FlatList>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;
const styles = StyleSheet.create({
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
  allProductsWrapper: {
    paddingLeft: 10,
    paddingTop: 15,
  },
  header: {
    fontWeight: 'bold',
    fontSize: SIZES.xLarge - 2,
    color: COLORS.black,
    paddingBottom: 5,
  },
  bestSellProductWrapper: {
    paddingLeft: 10,
    paddingTop: 15, 
  }
});
