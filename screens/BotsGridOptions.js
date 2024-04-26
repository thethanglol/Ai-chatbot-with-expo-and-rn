import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';



export default function BotsGridOptions({ navigation }) {

  const handleButtonPress = (botId) => {
    navigation.navigate('ChatRoom_Persona_1', { botId });
  };

  return (



    <LinearGradient
      colors={['#ff6ec4', '#7873f5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }} style={styles.container}>

      <ScrollView contentContainerStyle={styles.wrapper}>




        <TouchableOpacity onPress={() => { navigation.navigate('ChatRoom') }}>
          <ImageBackground resizeMode="cover" style={[styles.main_bot]} source={require('../assets/logobg.jpg')}>


            <View style={{ width: 250 }}>
              <Text style={{ fontSize: 16, color: 'white', width: 'auto', textAlign: 'right', marginBottom: 10, }}>{'مساعدك الشخصي جاهز لاستقبال اسئلتك.'}</Text>
              <Text style={{ fontSize: 16, color: 'white', width: 'auto', textAlign: 'right', marginBottom: 10, }}>{'اساله ما تشاء، كيف ما تشاء.'}</Text>
              <Text style={{ fontSize: 16, color: 'white', width: 'auto', textAlign: 'right', marginBottom: 10, }}>{'كل المجالات، سواء مهنية او اكاديمية.'}</Text>
              <Text style={{ fontSize: 16, color: 'white', width: 'auto', textAlign: 'right', marginBottom: 10, }}>{'إجابات سريعة، نافعة، دائمة، و بدون انتظار.'}</Text>
              <Text style={{ fontSize: 16, color: 'white', width: 'auto', textAlign: 'right', marginBottom: 0, }}>{'متوفر في كل الأوقات.'}</Text>
            </View>




            <ImageBackground
              style={{
                width: 100, aspectRatio: 1 / 1,


                borderRadius: 15,
                overflow: 'hidden'
              }}
              source={require('../assets/newlogo.jpg')}
            >
            </ImageBackground>


            <Text style={[styles.main_bot_desc, { position: 'absolute', bottom: 0, backgroundColor: '#0a0838', padding: 10, paddingHorizontal: 25, borderRadius: 15, textAlign: 'center', width: '90%', borderWidth: 1, borderBottomWidth: 4, borderColor: '#00FFFF' }]}>{'اسأله ما تريد -->'}</Text>



          </ImageBackground>
        </TouchableOpacity>

        {/* rpg */}

        <TouchableOpacity onPress={() => { navigation.navigate('Rpg') }}>
          <View resizeMode="cover" style={styles.imagewrapper2}>
            <View style={{ backgroundColor: 'orange', flex: 1, borderRadius: 30, overflow: 'hidden', }}>
              <LottieView loop autoPlay source={require('../assets/gradient.json')} style={{ flex: 1, }} resizeMode='cover' />
              <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', verticalAlign: 'middle', position: 'absolute', width: '100%', height: '100%', }}>{'جرب لعبة الأدوار الخيالية!'}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* rpg */}

        {/* botsPersonas Options */}


        <TouchableOpacity onPress={() => { handleButtonPress(1) }}>
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_3.jpg')}>
            <Text style={styles.sec_bot_desc}>{'علم الفلك و المجرات ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { handleButtonPress(2) }}>
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_7.jpg')}>
            <Text style={styles.sec_bot_desc}>{' حكم و أقوال ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { handleButtonPress(3) }}>
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_9.jpg')}>
            <Text style={styles.sec_bot_desc}>{'العلوم والتكنولوجيا ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { handleButtonPress(4) }}>
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_5.jpg')}>
            <Text style={styles.sec_bot_desc}>{' قصص و روايات ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { handleButtonPress(5) }}>
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_6.jpg')}>
            <Text style={styles.sec_bot_desc}>{' الإقتصاد و الأعمال ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { handleButtonPress(6) }}>
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_8.jpg')}>
            <Text style={styles.sec_bot_desc}>{' التاريخ ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { handleButtonPress(7) }}>
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_4.jpg')}>
            <Text style={styles.sec_bot_desc}>{' نصائح قانونية ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { handleButtonPress(8) }}>
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_1.jpg')}>
            <Text style={styles.sec_bot_desc}>{' اللياقة البدنية ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { handleButtonPress(9) }} >
          <ImageBackground resizeMode="cover" style={styles.imagewrapper} source={require('../assets/PRODUCTION/ready 1/p_2.jpg')}>
            <Text style={styles.sec_bot_desc}>{' نصائح طبية ->'}</Text>
            <View style={{ backgroundColor: '#FFE6E6', padding: 20, borderRadius: 15, width: '90%', alignSelf: 'center', position: 'absolute', bottom: 25, borderWidth: 1, borderBottomWidth: 5, borderColor: '#deb4b4' }}>
              <Text style={{ color: '#3e3232', fontSize: 18, textAlign: 'center' }}>{'ابدأ محادثة مع الذكاء الاصطناعي'}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* botsPersonas Options */}

        {/* rpg */}

        <TouchableOpacity onPress={() => { navigation.navigate('Rpg') }} style={{ marginBottom: 170 }}>
          <View resizeMode="cover" style={styles.imagewrapper2}>
            <View style={{ backgroundColor: 'orange', flex: 1, borderRadius: 30, overflow: 'hidden', }}>
              <LottieView loop autoPlay source={require('../assets/gradient.json')} style={{ flex: 1, }} resizeMode='cover' />
              <Text style={{ color: 'white', fontSize: 24, textAlign: 'center', verticalAlign: 'middle', position: 'absolute', width: '100%', height: '100%', }}>{'جرب لعبة الأدوار الخيالية!'}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* rpg */}




      </ScrollView>






      <TouchableOpacity onPress={() => { navigation.navigate('AnimeGridOptions') }} style={{ backgroundColor: 'white', padding: 10, position: 'absolute', bottom: 100, width: '90%', borderRadius: 20 }}>

        <View style={{ backgroundColor: 'orange', padding: 20, borderRadius: 20 }}>
          <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>{'هل تشعر بالملل؟ تحدث مع شخصياتك المفضلة هنا ->'}</Text>
        </View>
      </TouchableOpacity>


      <View style={{ backgroundColor: '#FFF8ED', gap: 10, padding: 10, position: 'absolute', bottom: 0, width: '90%', borderRadius: 100, flexDirection: 'row' }}>

        <TouchableOpacity style={{ backgroundColor: '#58EF84', padding: 20, borderRadius: 100, flex: 1 }}>
          <Text style={{ fontSize: 16, color: 'black', textAlign: 'center' }}>{' ادعمنا هنا!'}</Text>

        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: '#E83573', padding: 20, borderRadius: 100, flex: 1 }}>
          <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>{' شارك رأيك هنا!'}</Text>

        </TouchableOpacity>

      </View>




    </LinearGradient>

  );
}

const styles = StyleSheet.create({

  container: {

    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  wrapper: {

    width: '100%',
    paddingHorizontal: 10,
    paddingTop: StatusBar.currentHeight + 20,

  },
  main_bot: {
    width: '100%',
    aspectRatio: 1 / 1,
    backgroundColor: 'grey',
    borderRadius: 30,
    marginBottom: 25,
    overflow: 'hidden',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  main_bot_desc: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,

  },


  imagewrapper: {

    justifyContent: 'flex-start',

    width: '100%',
    aspectRatio: 1 / 1,
    backgroundColor: 'black',
    marginBottom: 40,
    borderRadius: 30,
    overflow: 'hidden',

  },
  imagewrapper2: {

    width: '100%',
    aspectRatio: 16 / 7,
    backgroundColor: 'white',
    marginBottom: 40,
    borderRadius: 30,
    overflow: 'hidden',
    padding: 20

  },
  sec_bot_desc: {
    color: 'white',
    fontSize: 16,
    margin: 30,
    backgroundColor: '#0a0838',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 20,
  },


});
