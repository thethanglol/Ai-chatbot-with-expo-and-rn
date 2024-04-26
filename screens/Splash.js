import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground , TouchableOpacity, Image, Animated} from 'react-native';
import LottieView from 'lottie-react-native';



export default function SplashScreen2() {
 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const Sizefade1 = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }
    ).start(); // Add .start() to start the animation
    Animated.timing(
      scaleAnim,
      {
        toValue: 1.3,
        duration: 1400,
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
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }
    ).start();
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      Sizefade1();
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);
  
// second animation blob loop







 
  return (

<View style={{flex:1
    }}>

  <LottieView
              source={require('../assets/6eT3TIf7TR.json')}
              autoPlay
              loop={false}
              speed={0.8}
              resizeMode='cover'
              style={styles.container}
            /> 


<View style={{width: '100%',height:'100%', alignItems:'center',justifyContent:'center', position:'absolute'}}>





<Animated.View style={{        opacity: fadeAnim, transform: [{ scale: scaleAnim }],}}>

  <ImageBackground
        style={{width:150, aspectRatio: 1/1,



        borderRadius:300,
        overflow: 'hidden' }}
        source={require('../assets/newlogo.jpg')}
      /> 

</Animated.View>














</View>



           

</View>
          

           



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A193B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
