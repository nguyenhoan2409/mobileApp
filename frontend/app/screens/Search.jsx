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

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(false); 
  useEffect(() => {
    if (searchText.length == 0) {
        setVisible(true);
        setVisible1(false)
    } else {
        setVisible(false); 
        setVisible1(true); 
    }
  }, [searchText]);
  const recommendedProductList = [
    {
      id: '0',
      image:
        'https://th.bing.com/th/id/R.1bee6d4bc26e55bd466f7e52a14649f2?rik=iEWQcHhdRwed1A&pid=ImgRaw&r=0',
      name: 'bàn',
    },
    {
      id: '1',
      image:
        'https://th.bing.com/th/id/R.bbb193f0e0465f56dbf902b530acea78?rik=bRfwk29PpnO8DQ&riu=http%3a%2f%2fpngimg.com%2fuploads%2fbed%2fbed_PNG17395.png&ehk=pNB%2bkWfzJitTo5PyEMeMpvnOZVuAmhSCNo1%2bfwEfUAY%3d&risl=&pid=ImgRaw&r=0',
      name: 'giường',
    },
    {
      id: '3',
      image:
        'https://th.bing.com/th/id/R.28ce8a5bd1e631b8cce64181e3505d3f?rik=4m37lXNm6omsZg&pid=ImgRaw&r=0',
      name: 'ghế',
    },
    {
      id: '4',
      image:
        'https://th.bing.com/th/id/R.11e91286e0e4212e01a11d678a589fd3?rik=DZcWWA3yzXDgiQ&pid=ImgRaw&r=0',
      name: 'đèn',
    },
    {
      id: '5',
      image:
        'https://p7.hiclipart.com/preview/73/595/750/sink-bathroom-set-the-sink.jpg',
      name: 'bồn tắm',
    },
  ]
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Feather name="search" size={24} style={styles.searchIcon} />
            </TouchableOpacity>
            <View style={styles.searchWrapper}>
              <TextInput
                value={searchText}
                placeholder="Tìm kiếm sản phẩm"
                onChangeText={(text) => {
                    setSearchText(text); 
                }}
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

          {visible && (
            <View style={{marginLeft: 10}}>
              <Text style={styles.header}>Đề xuất cho bạn</Text>
              <FlatList
                data={recommendedProductList}
                keyExtractor={item => item._id}
                renderItem={({item, index}) => (
                  <TouchableOpacity>
                    <Text style={styles.itemList} key={index}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                horizontal
                contentContainerStyle={{
                  columnGap: SIZES.medium - 5,
                }}></FlatList>
            </View>
          )}

          {visible && (
            <View style={{marginLeft: 10, marginTop: 10}}>
              <Text style={styles.header}>Tìm kiếm gần đây</Text>
              <FlatList
                data={recommendedProductList}
                keyExtractor={item => item._id}
                renderItem={({item, index}) => (
                  <TouchableOpacity>
                    <Text style={styles.itemList} key={index}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                horizontal
                contentContainerStyle={{
                  columnGap: SIZES.medium - 5,
                }}></FlatList>
            </View>
          )}

          {visible1 && (
            <View>
                <FlatList
                data={recommendedProductList}
                keyExtractor={item => item._id}
                nestedScrollEnabled={true}
                scrollEnabled={false}
                renderItem={({item, index}) => (
                  <TouchableOpacity>
                    <Text style={styles.searchResultList} key={index}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={{
                  columnGap: SIZES.medium - 5,
                }}></FlatList>
            </View>
          )}
        </ScrollView>
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
