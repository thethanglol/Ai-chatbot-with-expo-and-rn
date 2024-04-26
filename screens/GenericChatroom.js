import React, { useState, useRef, useEffect } from 'react';
import { ImageBackground, TouchableOpacity, StatusBar, View, TextInput, Button, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ChatOpenAI } from "@langchain/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

import BOTDATA from './Data';


import SubscribePopup from './SubscribePopPup';

import { adapty } from 'react-native-adapty';
import { createPaywallView } from '@adapty/react-native-ui';


const APIKEY = "000";

const memory = new ConversationSummaryMemory({
  memoryKey: "chat_history",
  llm: new ChatOpenAI({
    openAIApiKey: APIKEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0,

  }),
});

memory.prompt.template = 'قم بتلخيص خطوط المحادثة المقدمة تدريجيًا، مع إضافة ملخص جديد إلى الملخص السابق.\n' +
  '\n' +
  'مثال\n' +
  'الملخص الحالي:\n' +
  'يسأل الإنسان عن رأي الذكاء الاصطناعي في الذكاء الاصطناعي. يعتقد الذكاء الاصطناعي أن الذكاء الاصطناعي هو قوة من أجل الخير.\n' +
  '\n' +
  'خطوط جديدة للحوار:\n' +
  'الإنسان: لماذا تعتقد أن الذكاء الاصطناعي هو قوة من أجل الخير؟\n' +
  'الذكاء الاصطناعي: لأن الذكاء الاصطناعي سيساعد البشر على تحقيق إمكاناتهم الكاملة.\n' +
  '\n' +
  'ملخص جديد:\n' +
  'يسأل الإنسان عن رأي الذكاء الاصطناعي في الذكاء الاصطناعي. يعتقد الذكاء الاصطناعي أن الذكاء الاصطناعي هو قوة من أجل الخير لأنه سيساعد البشر على تحقيق إمكاناتهم الكاملة.\n' +
  'نهاية المثال\n' +
  '\n' +
  'الملخص الحالي:\n' +
  '{summary}\n' +
  '\n' +
  'خطوط جديدة للحوار:\n' +
  '{new_lines}\n' +
  '\n' +
  'ملخص جديد:';

const ChatRoom_Persona_1 = () => {

  useEffect(() => {
    const adaptycustompayment = async () => {
      try {
        const profile = await adapty.getProfile();
        console.log(profile)

        const isActive = profile.accessLevels["premium"]?.isActive;
        if (isActive) {
          console.log('isActive')
        }
      } catch (error) {
        console.log('notAvtive')
      }
    }
    adaptycustompayment()
  }, []);

  const route = useRoute();
  const { botId } = route.params;
  console.log(botId)
  const { profilePic, systemPrompt, welcomeMessage } = BOTDATA[botId];
  console.log(systemPrompt)




  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [inputEnabled, setInputEnabled] = useState(true);
  const [isNeedSubscription, setisNeedSubscription] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollViewRef = useRef();

  useEffect(() => {

    // Load input field state from AsyncStorage on component mount
    const loadInputState = async () => {
      const profile = await adapty.getProfile();
      const isActive = profile.accessLevels["premium"]?.isActive;
      if (isActive) return;
      try {

        const storedMsgLimitTime = await AsyncStorage.getItem('msgLimitTime');
        const storedTime = parseInt(storedMsgLimitTime);
        const currentTime = Date.now();
        const offset = (currentTime - storedTime)

        if (offset > 3600000) {
          setisNeedSubscription(false);
          setModalVisible(false);
          setInputEnabled(true);
          await AsyncStorage.removeItem('msgLimitTime');
          await AsyncStorage.removeItem('inputEnabled');
        }


        const inputState = await AsyncStorage.getItem('inputEnabled');

        if (inputState !== null) {
          setInputEnabled(JSON.parse(inputState));
          setisNeedSubscription(true);
          setModalVisible(true);
        }

      } catch (error) {
        console.error('Error loading input field state:', error);
      }
    };

    loadInputState();

    return () => {
      // Clean up any side effects
    };
  }, []);

  const model = new ChatOpenAI({
    openAIApiKey: APIKEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  const prompt = PromptTemplate.fromTemplate(systemPrompt);

  const chain = new LLMChain({ llm: model, prompt, memory });

  const sendMessage = async () => {
    if (!userInput) return;

    setMessages(prevMessages => [...prevMessages, { text: ` ${userInput}`, isUserMessage: true }]);
    setUserInput('');
    Keyboard.dismiss();

    setInputEnabled(false)
    const botResponse = await chain.call({ input: userInput });
    setInputEnabled(true)
    console.log({ memory: await memory.loadMemoryVariables({}) });

    setMessages(prevMessages => [...prevMessages, { text: `${botResponse.text}`, isUserMessage: false }]);

    const userMessagesCount = messages.filter(msg => msg.isUserMessage).length + 1;

    if (userMessagesCount === 3) {
      const profile = await adapty.getProfile();
      const isActive = profile.accessLevels["premium"]?.isActive;
      if (isActive) return;
      console.log("not subscribed")
      //disable input field
      setInputEnabled(false);
      // Perform your action here
      console.log('User has sent 10 messages.');
      // For example, you can display an alert
      setModalVisible(true);
      setisNeedSubscription(true);

      //saving field state to storage
      try {
        await AsyncStorage.setItem('inputEnabled', JSON.stringify(false));
        await AsyncStorage.setItem('msgLimitTime', Date.now().toString());

      } catch (error) {
        console.error('Error saving input field state:', error);
      }
    }

  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const customButton = (
    <Button
      title="Custom Button"
      onPress={async () => {
        try {
          const id = 'placementid';
          const locale = 'en';
      
          const paywall = await adapty.getPaywall(id, locale);
                console.log('zzzzzzzzzzzz')

          // the requested paywall
          const view = await createPaywallView(paywall);

          view.registerEventHandlers(); // handle close press, etc
      
          try {
            await view.present();
          } catch (error) {
            // handle the error
          }
          const unsubscribe = view.registerEventHandlers({
            
            onPurchaseCompleted(profile) {
                setisNeedSubscription(false);
                setModalVisible(false);
                setInputEnabled(true);
      
              return true;
            },
      
          });
        
      
      
        } catch (error) {
          // handle the error
        }


      }}
    />
  );

  const buttonpaywall = async ()=>{
    try {
      const id = 'placementid';
      const locale = 'en';
  
      const paywall = await adapty.getPaywall(id, locale);
            console.log('zzzzzzzzzzzz')

      // the requested paywall
      const view = await createPaywallView(paywall);

      view.registerEventHandlers(); // handle close press, etc
  
      try {
        await view.present();
      } catch (error) {
        // handle the error
      }
      const unsubscribe = view.registerEventHandlers({
        
        onPurchaseCompleted(profile) {
            setisNeedSubscription(false);
            setModalVisible(false);
            setInputEnabled(true);
  
          return true;
        },
  
      });
    
  
  
    } catch (error) {
      // handle the error
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : "height"}
      style={{ flex: 1 }}
    >

      <LinearGradient
        colors={['#ff6ec4', '#7873f5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={{ flex: 1, paddingTop: StatusBar.currentHeight + 20, paddingHorizontal: 10, paddingBottom: 35 }}>


        <ScrollView style={{ flex: 1 }} ref={scrollViewRef} onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }>


          <View style={styles.bubblewrapperbot}>


            <ImageBackground resizeMode="cover" source={profilePic} style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, marginRight: 10, overflow: 'hidden' }}>

            </ImageBackground>

            <View style={styles.botMessageBubble}>
              <Text style={styles.botMessage}>{welcomeMessage}</Text>
              {isNeedSubscription && <TouchableOpacity onPress={buttonpaywall} style={{ backgroundColor: '#FF8080', padding: 16, borderRadius: 10, marginTop: 30, borderWidth: 1, borderBottomWidth: 5, borderColor: '#db6969' }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{'ذكاء اصطناعي في جيبك بأرخص ثمن 😉'}</Text>
              </TouchableOpacity>}
            </View>
          </View>

          {messages.map((msg, index) => (

            <View key={index} style={msg.isUserMessage ? styles.bubblewrapper : styles.bubblewrapperbot}>

              {!msg.isUserMessage ? (
                <ImageBackground resizeMode="cover" source={profilePic} style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, marginRight: 10, overflow: 'hidden' }}>

                </ImageBackground>
              ) : null}
              <View style={msg.isUserMessage ? styles.userMessageBubble : styles.botMessageBubble}>
                <Text style={msg.isUserMessage ? styles.userMessage : styles.botMessage}>{msg.text}</Text>
                {isNeedSubscription && <TouchableOpacity onPress={buttonpaywall} style={{ backgroundColor: '#FF8080', padding: 16, borderRadius: 10, marginTop: 30, borderWidth: 1, borderBottomWidth: 5, borderColor: '#db6969' }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{'ذكاء اصطناعي في جيبك بأرخص ثمن 😉'}</Text>
                </TouchableOpacity>}
              </View>
            </View>





          ))}
        </ScrollView>

        <SubscribePopup modalVisible={modalVisible} setModalVisible={setModalVisible} customButton={customButton}/>




        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>


          <TextInput
            style={{ flex: 1, marginRight: 10, backgroundColor: '#A87C7C', height: 65, paddingRight: 20, borderRadius: 10, color: 'white', fontSize: 18, textAlign: 'right' }}
            value={userInput}
            onChangeText={setUserInput}
            editable={inputEnabled}
            placeholder="أكتب شيئا..."
          />





          <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: '#F0DBAF', padding: 16, borderRadius: 10 }}>
            <Text style={{ color: '#B06161', fontSize: 20 }}>{'أرسل'}</Text>
          </TouchableOpacity>
        </View>


      </LinearGradient>


    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  userMessage: {
    fontSize: 20,
    textAlign: 'right', // Align user messages to the right
    color: 'white',
  },
  botMessage: {
    fontSize: 20, // Adjust the font size as needed
    textAlign: 'left', // Align bot messages to the left
    color: '#3E3232',
    textAlign: 'right' // Adjust color if needed
  },
  bubblewrapper: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  bubblewrapperbot: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'

  },
  userMessageBubble: {
    backgroundColor: '#A87C7C',
    padding: 10,
    width: 300,
    borderRadius: 10,
  },
  botMessageBubble: {
    backgroundColor: '#FFE6E6',
    padding: 10,
    width: 300,
    borderRadius: 10,

  },
});







export default ChatRoom_Persona_1;