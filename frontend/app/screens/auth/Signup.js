import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SIZES, COLORS} from '../../constants';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Signup = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [token, setToken] = useState(''); // Thêm state cho token
  const [roleID, setRoleID] = useState(''); 
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };


  
  const handleSignup = async () => {
    try {
      const loginData = {
        username: 'Admin',
        password: '123456',
      };

    const signupData = {
      username,
      email,
      address: location,
      password,
      firstName: 'DefaultFirstName', 
      lastName: 'DefaultLastName',   
      phone:phoneNumber,
      roleID,
      avatar: {
        public_id: 'string',
        url: 'string',
      },
    };
    const authResponse = await API.requestPOST_Login('/auth/login', loginData);
    setToken(authResponse.token)
    console.log(token)
    const response = await API.requestSignup(`/users/create?${token}`, signupData);

    
    if ( response.success) {
     
      console.log('Signup successful:', response.message);
      console.log('User details:', response.user);
      showMessage({
        message: 'Đăng ký thành công',
        type: 'success',
      });
      navigation.navigate('Login');
     

    } else {
  
      console.log('Signup failed:', response.message);
      
    }
  } catch (error) {
   
    console.error('Error during signup:', error);
   
  }

  };
const getAuthToken = async () => {
  const loginData = {
    username: 'Admin',
    password: '123456',
  };

  try {
    const authResponse = await API.requestPost_Role('/auth/login', loginData);
    setToken(authResponse)
    if (authResponse  && authResponse.userId) {
      console.log('Login successful:', authResponse);
      setRoleID(authResponse.userId);
      console.log('RoleID:', authResponse.userId); 
      // Lưu roleID vào state
    } else {
      console.log('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

/*Bước 2: Sử dụng useEffect để gọi API đăng nhập khi component được render
useEffect(() => {
  getAuthToken();
}, [])*/;


  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <Image
            source={require('../../../assets/images/background.png')}
            style={styles.cover}
          />
          <View style={{marginTop: 10}}>
          <Image
            source={require('../../../assets/images/background.png')}
            style={styles.cover}
          />
          <View style={{marginTop: 10}}>
            <View style={styles.wrapper}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="face-man-profile"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <TextInput placeholder="Username" 
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                />
              </View>
            </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <TextInput placeholder="Email" 
                onChangeText={(text) => setEmail(text)}
                value={email}
                />
              </View>
            </View>

    
            <View style={styles.wrapper}>
                <Text style={styles.label}>Phone number</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="phone-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput placeholder="Phone number"
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  />
                </View>
              </View>

            <View style={styles.wrapper}>
              <Text style={styles.label}>Location</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
                <TextInput placeholder="Location" 
                onChangeText={(text) => setLocation(text)}
                value={location}
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
                  <Feather name={rightIcon} size={25} style={styles.eyeIcon} />
                </TouchableOpacity>
                </View>
              </View>
            </View>

            <Pressable
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
                Đăng ký
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{marginTop: 15}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.black,
                  fontSize: 16,
                }}>
                Đã có tài khoản?{' '}
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.primary,
                    fontSize: 16,
                  }}>
                  Đăng nhập
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
            <Pressable
           onPress={() => {
            handleSignup();
            
          }}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 6,
                padding: 10,
                fontWeight:40
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Đăng ký
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{marginTop: 1}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: COLORS.black,
                  fontSize: 16,

                }}>
                Đã có tài khoản?{' '}
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.primary,
                    fontSize: 16,
                  }}>
                  Đăng nhập
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
    marginBottom: SIZES.Large,
  },
  title: {
    fontFamily: 'Poppins' /*bold/*/,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.Large,
  },
  wrapper: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: SIZES.small,
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
  passwordWrapper: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 45,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  eyeIcon: {
    zIndex: 999
  },
  iconStyle: {
    marginRight: 10,
  },
});
export default Signup;
