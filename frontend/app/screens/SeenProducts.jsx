import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {COLORS, SIZES} from '../constants';
import ProductCardView from '../components/ProductCardView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-virtualized-view';

const SeenProducts = ({navigation}) => {
    const route = useRoute();
  const recentlyViewedProductList = route.params;
  const numColumns = 2;
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.goBackBtn}
            />
            <View style={styles.header}>
              <Text style={styles.headerText}>Sản phẩm đã xem</Text>
            </View>
          </View>
          <View style={styles.seenProductsContainer}>
            <FlatList
              data={recentlyViewedProductList}
              keyExtractor={item => item._id}
              renderItem={({item, index}) => (
                <ProductCardView item={item} key={index._id} />
              )}
              contentContainerStyle={{
                columnGap: SIZES.medium - 5,
                rowGap: SIZES.medium - 5,
              }}
              numColumns={numColumns}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SeenProducts;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginVertical: SIZES.large,
  },
  header: {
    position: 'absolute',
    alignItems: 'center',
    left: '25%',
    right: '25%',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: SIZES.xLarge - 2,
    color: COLORS.black,
    paddingBottom: 5,
  },
  goBackBtn: {
    paddingLeft: 10,
  },
  seenProductsContainer: {
    alignItems: 'center',
  },
});
