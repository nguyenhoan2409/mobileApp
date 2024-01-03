import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import API from '../../services/GlobalAPI';
import {showMessage} from 'react-native-flash-message';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../../constants';
import {Cloudinary} from '@cloudinary/url-gen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

const AddProduct = () => {
  const [imgURI, setImgURI] = useState('');
  // const [categoryList, setCategoryList] = useState([]);
  const route = useRoute(); 
  const categoryList = route.params;
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [quantity, setQuantity] = useState(''); 
  const [category, setCategory] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  

  const navigation = useNavigation();
  const cloudinaryUpload = photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'of6thnwp');
    data.append('cloud_name', 'dcv6lvrk1');
    fetch('https://api.cloudinary.com/v1_1/dcv6lvrk1/upload', {
      method: 'post',
      body: data,
    })
      .then(res => res.json())
      .then(data => {
        setImgURI(data.secure_url);
      })
      .catch(err => {
        console.log('An Error Occured While Uploading');
      });
  };
  const selectImage = () => {
    const options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          // const source = { uri: response.assets[0].uri };
          const uri = response.assets[0].uri;
          const type = response.assets[0].type;
          const name = response.assets[0].fileName;
          const source = {
            uri,
            type,
            name,
          };
          cloudinaryUpload(source);
        } else {
          console.log('No URI returned from Image Picker');
        }
      }
    });
  };

  const addProduct = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log(imgURI);
      var respone = await API.requestPOST_SP(
        `/products/create?token=${token}`,
        {
          name: name,
          description: description,
          originalPrice: price,
          discountPrice: 0,
          categoryId: category,
          shopId: '653f1f206a0c6f3b8ec6e1f5',
          images: [imgURI],
          quantityInStock: quantity,
        },
      );
      if (respone) {
        showMessage({
          message: 'Đã thêm sản phẩm thành công',
          description: '',
          type: 'success',
          position: 'top',
          duration: 2000,
          icon: props => (
            <AntDesign
              name="checkcircleo"
              size={22}
              color={COLORS.white}
              style={{padding: 10}}
              {...props}
            />
          ),
        });
        navigation.navigate('BottomTabSeller'); 
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Lỗi thêm sản phẩm',
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
  };

  // const getCategorylist = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('userToken');
  //     var respone = await API.requestGET_SP(`/categories/all?token=${token}`);
  //     if (respone) {
  //       setCategoryList(respone);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  

  // useEffect(() => {
  //   getCategorylist();
  // }, []);
  return (
    <>
      <ScrollView>
        <SafeAreaView>
          <View>
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
                <Text style={styles.headerText}>Thêm sản phẩm</Text>
              </View>
            </View>

            <View>
              <View style={styles.addProductInfoContainer}>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Tên sản phẩm</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons
                      name="label"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Tên sản phẩm"
                      value={name}
                      onChangeText={text => setName(text)}
                    />
                  </View>
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Mô tả</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      name="description"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Mô tả"
                      value={description}
                      onChangeText={text => setDescription(text)}
                    />
                  </View>
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Giá</Text>
                  <View style={styles.inputWrapper}>
                    <Entypo
                      name="price-tag"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Giá"
                      value={price}
                      onChangeText={text => setPrice(text)}
                    />
                  </View>
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Danh mục sản phẩm</Text>
                  <View>
                    {/* <MaterialIcons
                      name="category"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Danh mục"
                      // value={email}
                      // onChangeText={text => setEmail(text)}
                    /> */}
                    
                    <Dropdown
                      style={[
                        styles.dropdown,
                        isFocus && {borderColor: 'blue'},
                      ]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={categoryList}
                      search
                      maxHeight={300}
                      labelField="name"
                      valueField="_id"
                      placeholder={!isFocus ? 'Chọn danh mục' : '...'}
                      searchPlaceholder="Tìm kiếm danh mục..."
                      value={category}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setCategory(item._id);
                        setIsFocus(false);
                      }}
                      renderLeftIcon={() => (
                        <MaterialIcons
                      name="category"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyleDropDown}
                    />
                      )}
                    />
                  </View>
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Ảnh</Text>
                  <View>
                    <TouchableOpacity
                      style={styles.imageBtn}
                      onPress={() => {
                        selectImage();
                      }}>
                      <Text style={styles.imageTextBtn}>Chọn file</Text>
                    </TouchableOpacity>
                    {imgURI != '' && (
                      <Image source={{uri: imgURI}} style={styles.image} />
                    )}
                  </View>
                </View>

                <View style={styles.wrapper}>
                  <Text style={styles.label}>Số lượng</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      name="production-quantity-limits"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Số lượng"
                      value={quantity}
                      onChangeText={text => setQuantity(text)}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity style={styles.addProductBtn} onPress={() => {
                addProduct(); 
              }}>
                <Text style={styles.cartTitle}>Thêm sản phẩm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default AddProduct;
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
  addProductInfoContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  wrapper: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 5,
    marginEnd: 5,
    color: COLORS.black,
  },
  inputWrapper: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 45,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  addProductBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small,
    borderRadius: SIZES.large,
    marginTop: 10,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    textAlign: 'center',
  },
  imageBtn: {
    backgroundColor: COLORS.gray,
    width: 100,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTextBtn: {
    color: COLORS.white,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },


  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.white, 
  },
  icon: {
    marginRight: 5,
  },
  
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyleDropDown: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
