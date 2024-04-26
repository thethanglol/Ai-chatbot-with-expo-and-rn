import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { ref, set, push, child } from "firebase/database";
import { db } from '../components/config';


const NewsletterPopup = ({ modalVisible, setModalVisible }) => {
  const [email, setEmail] = useState('');
 // const [modalVisible, setModalVisible] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState(true);



  const validateEmail = (emailVar) => {

    if (emailVar != '') {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailVar);

    }

  };



  function create () {

    const newkey = push(child(ref(db), 'users')).key;

    set (ref (db, 'users/' + newkey), {
             email: email,
        });
    };


  const handleSubscribe = () => {
    if (validateEmail(email)) {

      // send email to database
      create();

      // hide modal
      setModalVisible(false);
      
    } else {setIsValidEmail(false)}
  };

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
          <View style={{ backgroundColor: '#F6820D', padding: 20,paddingVertical:40, borderRadius: 10, width:'90%',borderWidth:5, borderColor:'#FFA611' }}>

            <Text style={{color:'white', textAlign:'center', fontSize:24, marginBottom:20}}>{'ابقى على استطلاع دائم في اخر ما توصلت اليه تكنولوجيا الذكاء الاصطناعي.'}</Text>
            <TextInput
              style={{ borderWidth: 5,color:'white', borderColor: '#FFCB2B', padding: 10, marginVertical: 10, borderRadius:0 }}
              placeholder="أدخل بريدك الإلكتروني"
              onChangeText={text => {setEmail(text); setIsValidEmail(true);}}   
              value={email}
            />

                        {!isValidEmail && <Text style={{ color: 'red', textAlign:'center', marginBottom:10}}>{'يرجى إدخال عنوان بريد إلكتروني صالح'}</Text>}


            <TouchableOpacity onPress={handleSubscribe}>
            <View title="Subscribe" style={{backgroundColor:'#FFA611', paddingVertical:20}}>
              <Text style={{color:"white", textAlign:"center", fontSize:18}}>{'انضم الآن مجانا'}</Text>
              </View>

            </TouchableOpacity>


            <Text style={{color:'white', textAlign:'center', fontSize:19, marginVertical:20, backgroundColor:'#8B4000',padding:20,borderRadius:20}}>{'انضم اليوم إلى مجلتنا الإلكترونية توفر لك اكتشاف افضل التطبيقات و الأدوات التي بامكانها تحسين حياتك، توفير وقتك و الرفع من ابداعك، مدعومين بالذكاء الاصطناعي.'}</Text>

            <TouchableOpacity onPress={()=>setModalVisible(false)}>
            <View title="Cancel" style={{backgroundColor:'#FFCB2B', paddingVertical:10, borderRadius:50}}>
              <Text style={{color:"white", textAlign:"center", fontSize:18}}>{'العودة إلى الصفحة الرئيسية'}</Text>
              </View>

            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
};

export default NewsletterPopup;
