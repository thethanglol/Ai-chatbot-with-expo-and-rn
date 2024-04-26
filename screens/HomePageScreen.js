import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated, Button, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NewsletterPopup from './MailListSubscription';
import LottieView from 'lottie-react-native';
import SettingsPopup from './SettingPopUp';
import remoteConfig from '@react-native-firebase/remote-config';

const WelcomeComponent = ({ navigation }) => {

  useEffect(() => {
    remoteConfig()
    .setDefaults({
      customnumber: '1.0.5',
    })
    .then(() => remoteConfig().fetchAndActivate())
    .then(fetchedRemotely => {
      if (fetchedRemotely) {
        console.log('Configs were retrieved from the backend and activated.');
        const awesomeNewFeature = remoteConfig().getValue('customnumber');
        console.log(awesomeNewFeature.asNumber())
      } else {
        console.log(
          'No configs were fetched from the backend, and the local configs were already activated',
        );
        const awesomeNewFeature = remoteConfig().getValue('customnumber');

        console.log(awesomeNewFeature)

      }
    });
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisibleSettings, setModalVisibleSettings] = useState(false);

  const [isAccepted, setisAccepted] = useState(false);

  const userAcceptedAgreementManual = async () => {
    try {
      setisAccepted(true);
      await AsyncStorage.setItem('isAccepted', JSON.stringify(true));

    } catch (error) {
      console.error('Error saving input field state:', error);
    }
  }

  useEffect(() => {

    // Load input field state from AsyncStorage on component mount
    const autoUserAcceptedAgreement = async () => {
      try {
        const isAcceptedAgreement = await AsyncStorage.getItem('isAccepted');

        if (isAcceptedAgreement !== null) {
          setisAccepted(true);
        }

      } catch (error) {
        console.error('Error loading input field state:', error);
      }
    };

    autoUserAcceptedAgreement();

    return () => {
      // Clean up any side effects
    };
  }, []);



  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const Sizefade1 = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0.3,
        duration: 3000,
        useNativeDriver: true,
      }
    ).start(); // Add .start() to start the animation
    Animated.timing(
      scaleAnim,
      {
        toValue: 4,
        duration: 3000,
        useNativeDriver: true,
      }
    ).start(() => {
      // Animation is finished, reset values and start the animation again
      // Reset scaleAnim value
      opacityfade1(); // Start the opacity animation again
    });
  };

  const opacityfade1 = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }
    ).start(); // Add .start() to start the animation
    Animated.timing(
      scaleAnim,
      {
        toValue: 2,
        duration: 3000,
        useNativeDriver: true,
      }
    ).start(() => {
      // Animation is finished, reset values and start the animation again
      // Reset scaleAnim value
      Sizefade1(); // Start the opacity animation again
    });
  };

  useEffect(() => {
    
    Sizefade1();
  }, []);





  return (

    <LinearGradient
      colors={['#ff6ec4', '#7873f5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >

<TouchableOpacity onPress={() => setModalVisibleSettings(true)} style={{zIndex:99,alignSelf: 'flex-end',}}>
      <View style={{ backgroundColor: 'white',marginRight:10, padding: 8, width: 40, aspectRatio: 1 / 1,  marginBottom: 10, borderRadius: 10 }}>
        <ImageBackground resizeMode="cover" source={require('../assets/settings-icon.png')} style={{ flex: 1 }} />
      </View>
</TouchableOpacity>


      <View style={styles.wrapper}>


        <Animated.View
          style={{
            backgroundColor: '#EED3D9',
            width: 150,
            height: 150,
            borderRadius: 75,
            position: 'absolute',
            top: 40,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        />

        <Image
          source={require('../assets/newlogo.jpg')} // Provide the path to your image
          style={styles.image}
          resizeMode="cover"
        />







        <Text style={[styles.welcomeTitle]}>
          {'مرحبا بك!'}
        </Text>

        <Text style={[styles.margin, styles.welcomeDesc]}>
          {'هل أنت مستعد للذكاء الاصطناعي؟'}
        </Text>


        <TouchableOpacity onPress={() => { navigation.navigate('Main'); userAcceptedAgreementManual() }}>
          <View style={styles.btn}>
            <Text style={styles.btnDesc}>
              {'ابدأ المحادثة ->'}
            </Text>

          </View>
        </TouchableOpacity>

      </View>



      <NewsletterPopup modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ backgroundColor: 'white', padding: 10, borderRadius: 100 }}>


        <View title="Open" style={{ backgroundColor: '#F6820D', padding: 20, borderRadius: 50, }}>
          <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>{'إشترك في مجلتنا الأسبوعية هنا!'}</Text>
        </View>

      </TouchableOpacity>
      {!isAccepted && <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{'من خلال المتابعة فإنك تقبل سياسة الخصوصية'}</Text>}
      
      <SettingsPopup modalVisibleSettings={modalVisibleSettings} setModalVisibleSettings={setModalVisibleSettings} />


    </LinearGradient>


  );
};

const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {

    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,

    position: 'relative',

  },
  margin: {
    marginBottom: 70
  },
  welcomeTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 20
  },
  welcomeDesc: {
    color: 'white',
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center'
  },
  btn: {
    paddingHorizontal: 70,
    paddingVertical: 40,
    backgroundColor: '#DFDFDF',
    borderRadius: 70,
    elevation: 20,
    shadowColor: 'white'


  },
  btnDesc: {
    color: 'black',
    fontSize: 32,
    fontWeight: '900'
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 70,
    borderRadius: 30

  }
});

export default WelcomeComponent;
