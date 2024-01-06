import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView
} from 'react-native';
import React, {useState} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {SIZES, COLORS} from '../../constants';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import API from '../../services/GlobalAPI';
import getToken from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

const Login = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleLogin = async () => {
    const loginData = {
      username: userName,
      password: password,
    };
    const response = await API.requestPOST_Login('/auth/login', loginData);
    if (response && response.token) {
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userId', response.userId); 
      await AsyncStorage.setItem('userRoleId', response.userRoleId); 
      // async function getItem(item) {
      //   try {
      //     const value = await AsyncStorage.getItem(item);
      //     console.log(value);
      //     return value;
      //   } catch (error) {
      //     // Handle errors here
      //   }
      // }
      // getItem('userToken');
      if (response.userRoleId == '653a2551a823940702a4b910' || response.userRoleId == "653a2519a823940702a4b90a") {
        navigation.navigate('BottomTabSeller');
        setUserName('');
        setPassword('');
      } else {
        navigation.navigate('BottomTabBuyer');
        setUserName('');
        setPassword('');
      }
    } else {
      // setMessage('Email hoặc mật khẩu sai. Vui lòng kiểm tra lại.');
      showMessage({
        message: "Lỗi",
        description: "Username hoặc mật khẩu sai. Vui lòng kiểm tra lại.",
        type: "danger",
        position: 'top', 
        duration: 5000,
        icon: props => <AntDesign name='warning' size={22} color={COLORS.white} style={{padding: 10}}{...props} />,
      });
    }
  };

  
  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <Image
            source={require('../../../assets/images/background.png')}
            style={styles.cover}
          />
          {/* <Text style={styles.title}>Khám phá thế giới nội thất</Text> */}
          <View>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputWrapper}>
                <AntDesign
                  name="user"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <TextInput
                  placeholder="Enter username"
                  value={userName}
                  onChangeText={text => setUserName(text)}
                />
              </View>
            </View>

            
          

            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrapper}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="lock"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Enter password"
                    secureTextEntry={passwordVisibility}
                    value={password}
                    onChangeText={text => setPassword(text)}
                  />
                </View>

                <View>
                  <TouchableOpacity onPress={handlePasswordVisibility}>
                    <Feather
                      name={rightIcon}
                      size={25}
                      style={styles.eyeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Pressable
              onPress={handleLogin}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 6,
                padding: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Đăng nhập
              </Text>
            </Pressable>

            {/* {message ? (
              <Text style={styles.errorMessage}>{message}</Text>
            ) : null} */}

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={{marginTop: 15}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.black,
                  fontSize: 16,
                }}>
                Bạn chưa có tài khoản?{' '}
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.primary,
                    fontSize: 16,
                  }}>
                  Đăng ký
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  backbtn: {
    alignItems: 'center',
    position: 'absolute',
    //zIndex:999,
    top: SIZES.large - 10,
  },
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: 'contain',
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.xLarge,
  },
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  inputWrapper: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 10,
  },
  passwordWrapper: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 45,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyeIcon: {
    zIndex: 999,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
export default Login;
