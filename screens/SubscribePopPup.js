import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';

import { Minutes2DisplayFunction } from './ChatRoom';

import { adapty } from 'react-native-adapty';
import { createPaywallView } from '@adapty/react-native-ui';



const SubscribePopup = ({ modalVisible, setModalVisible, customButton}) => {

  const [minutesToDisplay, setMinutesToDisplay] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const minutes = await Minutes2DisplayFunction();
      setMinutesToDisplay(minutes);
      // console.log(minutes)
    };

    fetchData();
  }, []);









 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position:'absolute',}}>
      {/* <Button title="Subscribe to Newsletter" onPress={() => setModalVisible(true)} /> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent={true}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FED187' }}>
          <View style={{ backgroundColor: '#F6820D', padding: 20,paddingVertical:40, borderRadius: 80, width:'90%',borderWidth:5, borderColor:'#FFA611' }}>

            <Text style={{color:'white', textAlign:'center', fontSize:24, marginBottom:10}}>{'ذكاء اصطناعي في جيبك بأرخص ثمن 😉'}</Text>

            <Text style={{color:'white', textAlign:'center', fontSize:20, marginBottom:5, backgroundColor:'#FFA611', alignSelf: "center", padding:10,borderRadius:10, borderWidth:1, borderBottomWidth:5,borderColor:'white'}}>يرجى العودة بعد {!minutesToDisplay ? ('1 ساعة') : (minutesToDisplay + ' دقيقة') } </Text>
           






            <Text style={{color:'white', textAlign:'center', fontSize:19, marginVertical:20, backgroundColor:'#8B4000',padding:20,borderRadius:20}}>للاسف لقد استهلكت رسائلك المجانية، هذا الروبوت يستهلك كما كبيرا من الكهرباء للاشتغال في سيرفراتنا، انتظر {!minutesToDisplay ? ('1 ساعة') : (minutesToDisplay + ' دقيقة') } او ادعمنا هنا، نحن نحاول ان نوازن بين توفير الذكاء الاصطناعي للملايين من الناس مجانا بدون اعلانات ، ميزانيتنا محدودة و لا نود تحطيم سيرفراتنا و حواسيبنا 😊</Text>
            <TouchableOpacity onPress={()=>null} style={{marginBottom:40}}>
            <View title="Subscribe" style={{backgroundColor:'white', paddingVertical:20, borderRadius:10, borderWidth:1,borderBottomWidth:5, borderColor:"#DDDDDD"}}>
              <Text style={{color:"black", textAlign:"center", fontSize:18,fontWeight:"bold"}}>{'انضم و احذف الحدود 🚀'}</Text>
              </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setModalVisible(false)}>
            <View title="Cancel" style={{backgroundColor:'#FFA611', paddingVertical:10, borderRadius:50}}>
              <Text style={{ textAlign:"center", fontSize:18, color:'white'}}>{'عودة'}</Text>
              </View>

            </TouchableOpacity>

            {customButton}

          </View>
        </View>
      </Modal>

    </View>
  );
};

export default SubscribePopup;
