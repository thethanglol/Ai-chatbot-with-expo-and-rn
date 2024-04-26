import React, { useState, useRef, useEffect } from 'react';
import { ImageBackground, TouchableOpacity, StatusBar, View, TextInput, Button, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { ChatOpenAI } from "@langchain/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

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

const Rpg = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const scrollViewRef = useRef();

  const model = new ChatOpenAI({ openAIApiKey: APIKEY });

  const prompt = PromptTemplate.fromTemplate(
    `قم بإنشاء قصة آر بي جي، ضع 3 اختيارات في النهاية، يجب ألا تتجاوز القصة فقرة، ويجب ألا تتجاوز الاختيارات جملة. 
    
    المحادثة الحالية:
    {chat_history}

    أنا: {input}
    `
  );

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

  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);




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


            <ImageBackground resizeMode="cover" source={require('../../assets/PRODUCTION/rpg.jpg')} style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, marginRight: 10, overflow: 'hidden' }}>

            </ImageBackground>

            <View style={styles.botMessageBubble}>
              <Text style={styles.botMessage}>
                {'في عالمٍ مليءٍ بالسحر والمغامرات، وُلدت شخصيتك بقوةٍ غير عادية. كانت قدرتك على التحكم في العناصر تجعلك محل اهتمام الكثيرين. ومن بين هؤلاء الناس، كان هناك أولئك الذين يسعون لاستخدام قوتك لمصلحتهم، وآخرون يبحثون عن تدريبك وإرشادك. خلال رحلتك، تواجه الكثير من التحديات والمخاطر، ولكنك تتعلم من كل تجربة وتنمو بقوة. في يومٍ من الأيام، وصلت إلى مدينةٍ تحتفي في الغموض وتشتهر بأسرارها القديمة. تقابل هناك مجموعةً من المغامرين الذين يبحثون عن كنوزٍ مفقودة وقوى خفية. الآن، أمامك ثلاثة خيارات:\n' +
                  '\n' +
                  '1. الانضمام إلى فريق المغامرين والبحث عن الكنوز معهم، لاستكشاف الأسرار القديمة للمدينة.\n' +
                  '2. مساعدة السكان المحليين في حل مشكلةٍ ملحة تواجههم، وكسب احترامهم وثقتهم.\n' +
                  '3. العمل بمفردك واستكشاف المدينة بمفردك، في محاولة لاكتشاف أعماق الأسرار واكتساب المعرفة والقوة بمفردك.\n' +

                  'اختر بحكمة، لأن مستقبلك ومصيرك يعتمدان على قرارك.\n'}
              </Text>
            </View>
          </View>

          {messages.map((msg, index) => (

            <View key={index} style={msg.isUserMessage ? styles.bubblewrapper : styles.bubblewrapperbot}>

              {!msg.isUserMessage ? (
                <ImageBackground resizeMode="cover" source={require('../../assets/PRODUCTION/rpg.jpg')} style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 20, marginRight: 10, overflow: 'hidden' }}>

                </ImageBackground>
              ) : null}
              <View style={msg.isUserMessage ? styles.userMessageBubble : styles.botMessageBubble}>
                <Text style={msg.isUserMessage ? styles.userMessage : styles.botMessage}>{msg.text}</Text>
              </View>
            </View>





          ))}
        </ScrollView>




        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>


          <TextInput
            style={{ flex: 1, marginRight: 10, backgroundColor: '#A87C7C', height: 65, paddingRight: 20, borderRadius: 10, color: 'white', fontSize: 18, textAlign: 'right' }}
            value={userInput}
            onChangeText={setUserInput}
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







export default Rpg;