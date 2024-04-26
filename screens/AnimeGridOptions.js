import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground , TouchableOpacity, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function AnimeGridOptions({ navigation }) {
  return (

    

<LinearGradient
        colors={['#ff6ec4', '#7873f5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={styles.container}>

    <ScrollView contentContainerStyle={styles.wrapper}>



          



                            {/* AnimePersonas Options */}


<TouchableOpacity onPress={() => {navigation.navigate('ChatRoom_Anime_1')}} style={{marginBottom:40}}>
          <ImageBackground  resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/anime ready/a_2.jpg')}> 
          </ImageBackground>
</TouchableOpacity>


<TouchableOpacity onPress={() => {navigation.navigate('ChatRoom_Anime_2')}} style={{marginBottom:40}}>
          <ImageBackground  resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/anime ready/a_6.jpg')}> 
          </ImageBackground>
</TouchableOpacity>


<TouchableOpacity onPress={() => {navigation.navigate('ChatRoom_Anime_3')}} style={{marginBottom:40}}>
          <ImageBackground  resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/anime ready/a_3.jpg')}> 
          </ImageBackground>
</TouchableOpacity>


<TouchableOpacity onPress={() => {navigation.navigate('ChatRoom_Anime_4')}} style={{marginBottom:40}}>
          <ImageBackground  resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/anime ready/a_7.jpg')}> 
          </ImageBackground>
</TouchableOpacity>


<TouchableOpacity onPress={() => {navigation.navigate('ChatRoom_Anime_5')}} style={{marginBottom:40}}>
          <ImageBackground  resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/anime ready/a_5.jpg')}> 
          </ImageBackground>
</TouchableOpacity>


<TouchableOpacity onPress={() => {navigation.navigate('ChatRoom_Anime_6')}} style={{marginBottom:40}}>
          <ImageBackground  resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/anime ready/a_1.jpg')}> 
          </ImageBackground>
</TouchableOpacity>


<TouchableOpacity onPress={() => {navigation.navigate('ChatRoom_Anime_7')}} style={{marginBottom:90}}>
          <ImageBackground  resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/anime ready/a_4.jpg')}> 
          </ImageBackground>
</TouchableOpacity>

                              {/* AnimePersonas Options */}






    </ScrollView>






<TouchableOpacity onPress={() => {navigation.navigate('Main')}} style={{backgroundColor: 'orange', padding: 20, position: 'absolute', bottom:20, width: '70%',borderRadius:40}}>
      <Text style={{fontSize:16, color:'white',textAlign:'center'}}>{'back ->'}</Text>
</TouchableOpacity>




</LinearGradient>

  );
}

const styles = StyleSheet.create({

  container: {
    
    alignItems: 'center',
    backgroundColor: '#fff',
    flex:1,
  },
  wrapper: {
   
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: StatusBar.currentHeight + 20,
    
  },
  main_bot:{
    width:'100%',
    aspectRatio:1/1,
    backgroundColor:'grey',
    borderRadius:30,
    marginBottom:20,
    overflow:'hidden',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  main_bot_desc:{
    color:'white',
    fontSize:20,
    margin:10,
  },


  imagewrapper:{
    
    justifyContent: 'flex-end',
    
    width:'100%',
    aspectRatio: 1/1,
    backgroundColor:'black',
    marginBottom:20,
    borderRadius:30,
    overflow: 'hidden'
    
  },
  sec_bot_desc:{
    color:'white',
    fontSize:16,
    margin:30,
    backgroundColor:'#0a0838',
    alignSelf: 'flex-end', 
    padding:10,
    borderRadius:20,
  },

  
});
