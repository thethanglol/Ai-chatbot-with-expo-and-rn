


import 'react-native-polyfill-globals/auto';
// Required polyfills for async iterator symbols


import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeComponent from './screens/HomePageScreen'; // assuming this is your App.js
import BotsGridOptions from './screens/BotsGridOptions';
import ChatRoom from './screens/ChatRoom';
import SplashScreen2 from './screens/Splash';

import * as SplashScreen from 'expo-splash-screen';
import { adapty } from 'react-native-adapty';
import { createPaywallView } from '@adapty/react-native-ui';

if (__DEV__) {
  require("./ReactotronConfig");
}



{/* BotsPersonas here */ }


import ChatRoom_Persona_1 from './screens/GenericChatroom';
import ChatRoom_Persona_2 from './components/ChatRooms_Personas/cr2';
import ChatRoom_Persona_3 from './components/ChatRooms_Personas/cr3';
import ChatRoom_Persona_4 from './components/ChatRooms_Personas/cr4';
import ChatRoom_Persona_5 from './components/ChatRooms_Personas/cr5';
import ChatRoom_Persona_6 from './components/ChatRooms_Personas/cr6';
import ChatRoom_Persona_7 from './components/ChatRooms_Personas/cr7';
import ChatRoom_Persona_8 from './components/ChatRooms_Personas/cr8';
import ChatRoom_Persona_9 from './components/ChatRooms_Personas/cr9';

{/* BotsPersonas here */ }

{/* AnimePersonas here */ }


import ChatRoom_Anime_1 from './components/ChatRoom_Anime_Personas/ap1';
import ChatRoom_Anime_2 from './components/ChatRoom_Anime_Personas/ap2';
import ChatRoom_Anime_3 from './components/ChatRoom_Anime_Personas/ap3';
import ChatRoom_Anime_4 from './components/ChatRoom_Anime_Personas/ap4';
import ChatRoom_Anime_5 from './components/ChatRoom_Anime_Personas/ap5';
import ChatRoom_Anime_6 from './components/ChatRoom_Anime_Personas/ap6';
import ChatRoom_Anime_7 from './components/ChatRoom_Anime_Personas/ap7';

{/* AnimePersonas here */ }

import Rpg from './components/RPG/rpg';


import AnimeGridOptions from './screens/AnimeGridOptions';


SplashScreen.preventAutoHideAsync();


const Stack = createNativeStackNavigator();


// to do:
//         SplashScreen - done
//         Maillist collectors - done
//         resume Bots grid - done
//         Subscriptions - wip
//         force users to update - wip
//         prompt reviews after 3 app opening - wip
//         Date.now  offset
//         push notification firebase



function App() {

  useEffect(() => {

    const funcccccccc = async () => {
      try {
        await adapty.activate('public_live_aI2eCR09.HLs0UmN5mHqn4H6SWe5V');


      } catch (error) {
        // handle the error
      }
    }
    funcccccccc()
  }, []);

  useEffect(() => {



    const timerSplash = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 300); // Hide after 2 seconds

    return () => clearTimeout(timerSplash);
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {




    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4300); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const Opacity = useRef(new Animated.Value(0)).current;
  const opacity = () => {
    Animated.timing(
      Opacity,
      {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }
    ).start();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity();
    }, 4400); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (

    <View style={{ flex: 1, backgroundColor: "#1A193B" }}>

      {isLoading ? (
        <SplashScreen2 />
      ) : (

        <Animated.View style={{ flex: 1, opacity: Opacity }}>

          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={WelcomeComponent} options={{ headerShown: false }} />

              <Stack.Screen name="Main" component={BotsGridOptions} options={{ headerShown: false }} />

              <Stack.Screen name="AnimeGridOptions" component={AnimeGridOptions} options={{ headerShown: false }} />

              <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: false }} />

              {/* BotsPersonas here */}

              <Stack.Screen name="ChatRoom_Persona_1" component={ChatRoom_Persona_1} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Persona_2" component={ChatRoom_Persona_2} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Persona_3" component={ChatRoom_Persona_3} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Persona_4" component={ChatRoom_Persona_4} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Persona_5" component={ChatRoom_Persona_5} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Persona_6" component={ChatRoom_Persona_6} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Persona_7" component={ChatRoom_Persona_7} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Persona_8" component={ChatRoom_Persona_8} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Persona_9" component={ChatRoom_Persona_9} options={{ headerShown: false }} />

              {/* BotsPersonas here */}

              {/* AnimePersonas here */}

              <Stack.Screen name="ChatRoom_Anime_1" component={ChatRoom_Anime_1} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Anime_2" component={ChatRoom_Anime_2} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Anime_3" component={ChatRoom_Anime_3} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Anime_4" component={ChatRoom_Anime_4} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Anime_5" component={ChatRoom_Anime_5} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Anime_6" component={ChatRoom_Anime_6} options={{ headerShown: false }} />
              <Stack.Screen name="ChatRoom_Anime_7" component={ChatRoom_Anime_7} options={{ headerShown: false }} />


              {/* AnimePersonas here */}

              <Stack.Screen name="Rpg" component={Rpg} options={{ headerShown: false }} />


            </Stack.Navigator>
          </NavigationContainer>

        </Animated.View>



      )}



    </View>

  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A193B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});