import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';



const SettingsPopup = ({ modalVisibleSettings, setModalVisibleSettings }) => {











 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position:'absolute',}}>
      {/* <Button title="Subscribe to Newsletter" onPress={() => setModalVisible(true)} /> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSettings}
        onRequestClose={() => setModalVisibleSettings(false)}
        statusBarTranslucent={true}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f6f6' }}>
          <View style={{ backgroundColor: 'white', padding: 20,paddingVertical:40,width:'100%',marginBottom:4, borderRadius: 25,borderWidth:5, borderColor:'#ececec' }}>

          </View>
          <View style={{ backgroundColor: 'white', padding: 20,paddingVertical:40,width:'100%',marginBottom:4, borderRadius: 25,borderWidth:5, borderColor:'#ececec' }}>

          </View>
          <View style={{ backgroundColor: 'white', padding: 20,paddingVertical:40,width:'100%',marginBottom:4, borderRadius: 25,borderWidth:5, borderColor:'#ececec' }}>

          </View>



          <TouchableOpacity onPress={()=>setModalVisibleSettings(false)} style={{width:'100%', marginTop:20, borderWidth:10, borderColor:'white', borderRadius:50}}>
            <View title="Cancel" style={{backgroundColor:'#FFA611', paddingVertical:10, borderRadius:50}}>
              <Text style={{ textAlign:"center", fontSize:18, color:'white'}}>{'عودة'}</Text>
              </View>

            </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

export default SettingsPopup;
