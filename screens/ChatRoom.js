import React, { useState, useRef, useEffect } from 'react';
import { ImageBackground, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, StatusBar, View, TextInput, Button, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Clipboard from 'expo-clipboard';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SubscribePopup from './SubscribePopPup';

import { ChatOpenAI } from "@langchain/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

import { adapty } from 'react-native-adapty';
import { createPaywallView } from '@adapty/react-native-ui';

let abcd = true

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


export const Minutes2DisplayFunction = async () => {
  const storedMsgLimitTime = await AsyncStorage.getItem('msgLimitTime');
  const storedTime = parseInt(storedMsgLimitTime);
  const currentTime = Date.now();
  const offset = (currentTime - storedTime)

  // time display
  const Minutes = (offset / 3600000) * 60
  const RealMinutes = 60 - Minutes
  const MinutesToDisplay = Math.floor(RealMinutes)

  return MinutesToDisplay;
}

export const displaypaywall2 = async () => {
  try {

    const id = 'placementid';
    const locale = 'en';

    const paywall = await adapty.getPaywall(id, locale);
    // the requested paywall
    const view = await createPaywallView(paywall);

    view.registerEventHandlers(); // handle close press, etc

    try {
      await view.present();
    } catch (error) {
      // handle the error
    }
    const unsubscribe = view.registerEventHandlers({
      
      onCloseButtonPress() {
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






const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [inputEnabled, setInputEnabled] = useState(true);
  const [isNeedSubscription, setisNeedSubscription] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

if (abcd) {
  console.log('55')
}

const test = ()=>{
  console.log(444)
}

  //getting item from storage
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

  const scrollViewRef = useRef();

  const model = new ChatOpenAI({ openAIApiKey: APIKEY });

  const prompt = PromptTemplate.fromTemplate(
    `فيما يلي محادثة ودية بين الإنسان والذكاء الاصطناعي. الذكاء الاصطناعي ثرثار ويقدم الكثير من التفاصيل المحددة من سياقه. إذا كان الذكاء الاصطناعي لا يعرف إجابة سؤال ما، فإنه يقول بصدق أنه لا يعرف.

    المحادثة الحالية:
    {chat_history}
    إنسان: {input}
    الذكاء الاصطناعي:`
  );

  const chain = new LLMChain({ llm: model, prompt, memory });

  const sendMessage = async () => {
    if (!userInput) return;

    setisSentMsg(true);


    setisNeedSubscription(false);
    setModalVisible(false);

    setMessages(prevMessages => [...prevMessages, { text: ` ${userInput}`, isUserMessage: true }]);
    setUserInput('');
    Keyboard.dismiss();


    setInputEnabled(false)
    const botResponse = await chain.call({ input: userInput });
    setInputEnabled(true)

    //console.log({ memory: await memory.loadMemoryVariables({}) });

    setMessages(prevMessages => [...prevMessages, { text: `${botResponse.text}`, isUserMessage: false }]);

    const userMessagesCount = messages.filter(msg => msg.isUserMessage).length + 1;

    if (userMessagesCount === 1) {
      const profile = await adapty.getProfile();
      const isActive = profile.accessLevels["premium"]?.isActive;
      if (isActive) return;
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


  const sendMessage2 = (A) => {
    if (!A || isNeedSubscription) return;

    setIsInputFocused(true),
      setisSentMsg(true);



    setisSentMsg(true);
    setisNeedSubscription(false);
    setModalVisible(false);




    setMessages(prevMessages => [...prevMessages, { text: ` ${A}`, isUserMessage: true }]);
    setUserInput('');
    sendMessage3(A)
  };

  const sendMessage3 = async (A) => {
    setInputEnabled(false)

    const botResponse = await chain.call({ input: A });
    setInputEnabled(true)

    setMessages(prevMessages => [...prevMessages, { text: `${botResponse.text}`, isUserMessage: false }]);


    const userMessagesCount = messages.filter(msg => msg.isUserMessage).length + 1;

    if (userMessagesCount === 1) {
      const profile = await adapty.getProfile();
      const isActive = profile.accessLevels["premium"]?.isActive;
      if (isActive) return;
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


  const [selectedOption, setSelectedOption] = useState(1); // Default selected option
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSentMsg, setisSentMsg] = useState(false);
  const scrollViewRef2 = useRef(null);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsInputFocused(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsInputFocused(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const options = [
    {
      id: 1, name: 'التجارة والأعمال 💸', templates: [
        { id: 1, title: 'الاقتراح الأول', content: 'هل يمكنك إدراج استراتيجيات دخل سريعة وأخلاقية وفعالة تدعم أيضًا النمو على المدى الطويل، بما في ذلك الأساليب المتاحة عبر الإنترنت وخارجها، مع الإشارة إلى أي استثمارات أو مهارات مطلوبة، وتقييم استدامتها ومخاطرها؟  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
        { id: 2, title: 'الاقتراح الثاني', content: 'اكتب خطة عمل تتضمن: الملخص التنفيذي، وصف الأعمال، تحليل السوق، التنظيم والإدارة، المنتجات/الخدمات، استراتيجية التسويق/المبيعات، طلب التمويل، التوقعات المالية والملحق.  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
        { id: 3, title: 'الاقتراح الثالث', content: 'قم بإنشاء خطة تسويقية لزيادة مبيعات منتج جديد، من خلال تحديد التركيبة السكانية المستهدفة، وتطوير رسائل مقنعة، باستخدام قنوات مثل وسائل التواصل الاجتماعي والبريد الإلكتروني والتسويق المؤثر، ومن خلال قياس نجاح الحملة.  ناقش الميزانية والجدول الزمني والتحديات المحتملة.  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
      ]
    },
    {
      id: 2, name: 'الصحة النفسية 💝', templates: [
        { id: 1, title: 'الاقتراح الأول', content: 'أريدك أن تتصرف مثل معالج الذكاء الاصطناعي.  أريدك أن تستجيب وتقدم النصيحة مثل معالج متعاطف وبصير، يقدم التوجيه والدعم والتفهم للأشخاص الذين يطلبون المساعدة من أجل سلامتهم العقلية.  لا تكتب أي تفسيرات.  رحب بي برسالة أولية دافئة وابدأ العلاج.' },
        { id: 2, title: 'الاقتراح الثاني', content: 'تقديم نصائح موجزة في مجال الصحة العقلية من أجل الرفاهية.  تشمل الرعاية الذاتية والعلاقات الاجتماعية وإدارة التوتر.  التأكيد على اليقظة الذهنية وطلب الدعم المهني عند الحاجة.  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
        { id: 3, title: 'الاقتراح الثالث', content: 'شارك العادات الإيجابية من أجل الرفاهية.  فكر في ممارسات مثل ممارسة التمارين الرياضية بانتظام، والأكل الصحي، والوعي الذهني، والحفاظ على العلاقات الاجتماعية.  التأكيد على أهمية الاتساق وإجراءات الرعاية الذاتية.  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
      ]
    },
    {
      id: 3, name: 'تعلم لغة جديدة 📝', templates: [
        { id: 1, title: 'الاقتراح الأول', content: 'العمل كمترجم متمرس قادر على تحويل النص من لغة إلى أخرى.  بالنظر إلى النص الموجود في اللغة المصدر، ستترجمه بدقة إلى اللغة الهدف.  مهمتك هي اكتشاف اللغة في النص المحدد وإنشاء نسخة مترجمة من النص تنقل المعنى في اللغة الهدف بشكل فعال.  أولاً، اسألني عن النص واللغة الهدفين، ثم قم بإنشاء الجملة المترجمة.' },
        { id: 2, title: 'الاقتراح الثاني', content: 'العمل كمترجم متمرس قادر على تحويل النص من لغة إلى أخرى.  بالنظر إلى النص الموجود في اللغة المصدر، ستترجمه بدقة إلى اللغة الهدف.  مهمتك هي اكتشاف اللغة في النص المحدد وإنشاء نسخة مترجمة من النص تنقل المعنى في اللغة الهدف بشكل فعال.  أولاً، اسألني عن النص واللغة الهدفين، ثم قم بإنشاء الجملة المترجمة.' },
        { id: 3, title: 'الاقتراح الثالث', content: 'تحديد الأساليب المنهجية لدراسة اللغة.  تغطية تحديد الأهداف، وتقسيم المهام، وتخطيط الجلسة، وأساليب التعلم المختلفة.  التأكيد على الاتساق والتحفيز والانغماس في المواد اللغوية الأصلية والتفاعل مع الناطقين بها.  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
      ]
    },
    {
      id: 4, name: 'الصحة الجسدية 🚴', templates: [
        { id: 1, title: 'الاقتراح الأول', content: 'أنت مدرب شخصي تحفيزي وواسع المعرفة، وتقدم المشورة والدعم والخبرة لمساعدة الأفراد على تحقيق أهداف اللياقة البدنية الخاصة بهم.  سوف تسألني أولاً عن هدف اللياقة البدنية الخاص بي وتزودني بخطة شخصية.' },
        { id: 2, title: 'الاقتراح الثاني', content: 'أريدك أن تشرح بوضوح مفاهيم الصحة البدنية من خلال إرشادي.' },
      ]
    },
    {
      id: 5, name: 'أعمال متنوعة ✨', templates: [
        { id: 1, title: 'الاقتراح الأول', content: 'أريدك أن تقوم بإنشاء قائمة مهام لمهمتي.  أولاً، اسألني عن تفاصيل مهمتي ثم قم بإنشاء قائمة المهام.' },
        { id: 2, title: 'الاقتراح الثاني', content: 'أود منك أن تعمل كمستكشف للمفاهيم.  سأقدم لك مفهومًا أو موضوعًا، وستكون مهمتك شرحه بطريقة واضحة ومفهومة.  يجب أن يكون شرحك كاملاً ولكن موجزًا.  لا تكتب أي شرح وابدأ المحادثة بسؤالي عن موضوعي أو مفهومي.' },
        { id: 3, title: 'الاقتراح الثالث', content: 'أنت شغوف بالأدب.  دورك هو إنشاء قائمة قراءة لي بناءً على اهتماماتي الخاصة بالقراءة.  لا تكتب أي تفسيرات.  اسأل عن اهتماماتي بالقراءة وابدأ المحادثة.' },
      ]
    },
    {
      id: 6, name: 'الواجبات المدرسية 📚', templates: [
        { id: 1, title: 'الاقتراح الأول', content: 'أريدك أن تكتب لي مقالاً.  يتم الاستعانة بخبرتك لكتابة مقال متماسك وجيد التنظيم حول موضوع معين وباللغة المحددة.  أولا، اسألني عن موضوع المقال ثم قم بإنشاء المقال.' },
        { id: 2, title: 'الاقتراح الثاني', content: 'أنت مساعد طالب.  دورك هو إنشاء اختبارات تدريبية للطلاب للدراسة.  أولاً، سوف تسأل عن الفصل والموضوع، ثم ستقوم بإنشاء مجموعة من النصوص التدريبية.' },
        { id: 3, title: 'الاقتراح الثالث', content: 'أنت مدرس رياضيات ممتاز يحل أي سؤال رياضي.  ابدأ بفحص المشكلة بعناية، وتقسيمها إلى مكونات منفصلة، ​​مما يسمح بإجراء تحليل أكثر تنظيمًا وقابلية للإدارة.  سيساعدك النهج المنطقي على الوصول إلى الحل بسرعة.  دعونا نأخذ الأمر خطوة بخطوة.' },
      ]
    },
    {
      id: 7, name: 'التواصل الإجتماعي 📱', templates: [
        { id: 1, title: 'الاقتراح الأول', content: 'استكشف إستراتيجيات تضخيم منشورات وسائل التواصل الاجتماعي، بما في ذلك العناصر المرئية الفعالة والتسميات التوضيحية الموجزة وعلامات التصنيف والتفاعل.  ركز على رواية القصص والأصالة والتواصل مع الجماهير للوصول والمشاركة بشكل أفضل.  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
        { id: 2, title: 'الاقتراح الثاني', content: 'مناقشة دور التخطيط الاستراتيجي في محتوى وسائل التواصل الاجتماعي، بما في ذلك أدوات التخطيط واستهداف الجمهور واختيار المنصة والاتساق الموضوعي.  قم بتسليط الضوء على توافق المحتوى مع أهداف العمل واتساق العلامة التجارية واستخدام التحليلات للتحسين.  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
        { id: 3, title: 'الاقتراح الثالث', content: 'استكشف إستراتيجيات تضخيم منشورات وسائل التواصل الاجتماعي، بما في ذلك العناصر المرئية الفعالة والتسميات التوضيحية الموجزة وعلامات التصنيف والتفاعل.  ركز على رواية القصص والأصالة والتواصل مع الجماهير للوصول والمشاركة بشكل أفضل.  ابدأ بالقائمة، ولا تنتج وصفًا للبداية والنهاية.' },
      ]
    },
    {
      id: 8, name: 'الترفيه 🌟', templates: [
        { id: 1, title: 'الاقتراح الأول', content: 'سوف نلعب لعبة الكلمات معًا.  اللعبة بسيطة ولكنها ممتعة، حيث يتناوب اللاعبون في نطق الكلمات التي تبدأ بالحرف الذي انتهت به الكلمة السابقة.  فيما يلي القواعد الأساسية: عليك أن تبدأ بقول أي كلمة.  ثم يجب أن أقول كلمة تبدأ بالحرف الأخير من الكلمة السابقة.  لا يجوز تكرار الكلمات في نفس اللعبة، ولا يُسمح باستخدام الأسماء الصحيحة (أسماء أشخاص أو أماكن أو أشياء محددة).  تستمر اللعبة حتى لا يتمكن أحدنا من التفكير في كلمة صحيحة أو يتم تكرار الكلمة.  أولاً قم بوصف قواعد اللعبة وابدأ اللعبة، ولا تكتب أي تفسيرات.' },
        { id: 2, title: 'الاقتراح الثاني', content: 'سوف نلعب لعبة الكلمات معًا.  اللعبة بسيطة ولكنها ممتعة، حيث يتناوب اللاعبون في نطق الكلمات التي تبدأ بالحرف الذي انتهت به الكلمة السابقة.  فيما يلي القواعد الأساسية: عليك أن تبدأ بقول أي كلمة.  ثم يجب أن أقول كلمة تبدأ بالحرف الأخير من الكلمة السابقة.  لا يجوز تكرار الكلمات في نفس اللعبة، ولا يُسمح باستخدام الأسماء الصحيحة (أسماء أشخاص أو أماكن أو أشياء محددة).  تستمر اللعبة حتى لا يتمكن أحدنا من التفكير في كلمة صحيحة أو يتم تكرار الكلمة.  أولاً قم بوصف قواعد اللعبة وابدأ اللعبة، ولا تكتب أي تفسيرات.' },
      ]
    },
    // Add more options as needed
  ];

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);

    if (scrollViewRef2.current) {
      scrollViewRef2.current.scrollTo({ x: 0, animated: false });
    }
  };


  const customButton = (
    <Button
      title="Custom Button"
      onPress={async () => {
        try {

          const id = 'placementid';
          const locale = 'en';
      
          const paywall = await adapty.getPaywall(id, locale);
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
      behavior={Platform.OS === 'ios' ? 'padding' : "padding"}
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


            <ImageBackground resizeMode="cover" source={require('../assets/newlogo.jpg')} style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 7, marginRight: 10, overflow: 'hidden' }}>

            </ImageBackground>

            <View style={styles.botMessageBubble}>

              <Text selectable style={styles.botMessage}>{'أهلا و سهلا، أنا مساعدك الشخصي، يمكنك سؤال عن أي مجال في العالم و سأوفر لك أفضل إجابة ممكنة، يمكنك إختيار أحد الإختيارات في الأسفل أو سؤالي مباشرة 😊'}</Text>



              {isNeedSubscription && <TouchableOpacity onPress={buttonpaywall} style={{ backgroundColor: '#FF8080', padding: 16, borderRadius: 10, marginTop: 30, borderWidth: 1, borderBottomWidth: 5, borderColor: '#db6969' }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{'ذكاء اصطناعي في جيبك بأرخص ثمن 😉'}</Text>
              </TouchableOpacity>}



            </View>
          </View>

          {messages.map((msg, index) => (

            <View key={index} style={msg.isUserMessage ? styles.bubblewrapper : styles.bubblewrapperbot}>

              {!msg.isUserMessage ? (
                <ImageBackground resizeMode="cover" source={require('../assets/newlogo.jpg')} style={{ backgroundColor: 'white', width: 40, height: 40, borderRadius: 7, marginRight: 10, overflow: 'hidden' }}>

                </ImageBackground>
              ) : null}
              <View style={msg.isUserMessage ? styles.userMessageBubble : styles.botMessageBubble}>
                <Text selectable style={msg.isUserMessage ? styles.userMessage : styles.botMessage}>{msg.text}</Text>

                {!msg.isUserMessage && <TouchableOpacity activeOpacity={0.5} onPress={async () => {await Clipboard.setStringAsync(msg.text);}}>
                  <Text style={{ color: '#040404', backgroundColor: '#58EF84', fontSize: 16, textAlign: 'center', padding: 5, borderRadius: 10, fontWeight: 'bold', borderWidth: 1, borderBottomWidth: 4, borderColor: '#43bf67', marginTop: 10 }}>نسخ النص</Text>
                </TouchableOpacity>}

                {isNeedSubscription && <TouchableOpacity onPress={buttonpaywall} style={{ backgroundColor: '#FF8080', padding: 16, borderRadius: 10, marginTop: 30, borderWidth: 1, borderBottomWidth: 5, borderColor: '#db6969' }}>
                  <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{'ذكاء اصطناعي في جيبك بأرخص ثمن 😉'}</Text>
                </TouchableOpacity>}
              </View>
            </View>

          ))}

        </ScrollView>

        <SubscribePopup modalVisible={modalVisible} setModalVisible={setModalVisible}  customButton={customButton} />


        {!isSentMsg && <View style={{ height: 100 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {options.map(option => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={option.id}
                style={[
                  styles.option,
                  selectedOption === option.id ? styles.selectedOption : null
                ]}
                onPress={() => { handleOptionSelect(option.id); setIsInputFocused(false); }}
              >
                <Text style={[
                  styles.optionText,
                  selectedOption === option.id ? styles.selectedOptionText : null

                ]}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>}


        {!isInputFocused && <View style={{ height: 220 }}>

          <ScrollView
            ref={scrollViewRef2}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              flexDirection: 'row',
              padding: 10,
              // Adjust the height as needed
            }}
          >
            {options.find(option => option.id === selectedOption)?.templates.map(template => (



              <TouchableOpacity
                activeOpacity={0.9}

                key={template.id}
                onPress={() => {
                  sendMessage2(template.content)



                }}// Add onPress handler
                style={{
                  backgroundColor: '#FFE6E6',
                  borderRadius: 10,
                  borderWidth: 4,
                  borderColor: '#deb4b4',
                  marginRight: 10,
                  padding: 10,
                  width: 220,
                  height: 200,
                  borderBottomWidth: 5,
                  overflow: 'hidden',
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 5,
                  }}
                >
                  {template.title}
                </Text>
                <Text style={{ fontSize: 16 }}>{template.content}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

        </View>}






        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, }}>

          <TextInput
            style={{ flex: 1, marginRight: 10, backgroundColor: '#A87C7C', height: 65, paddingRight: 20, borderRadius: 10, color: 'white', fontSize: 18, textAlign: 'right', borderWidth: 2, borderColor: '#825f5f' }}
            value={userInput}
            onChangeText={setUserInput}
            editable={inputEnabled}

            placeholder="أكتب شيئا..."
          />





          <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: '#F0DBAF', padding: 16, borderRadius: 10, borderWidth: 2, borderColor: '#c9b68d' }}>
            <Text style={{ color: '#B06161', fontSize: 20, fontWeight: 'bold' }}>{'أرسل'}</Text>
          </TouchableOpacity>

        </View>


      </LinearGradient>


    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  optionText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  selectedOptionText: {
    color: 'white',
  },

  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'orange',
    backgroundColor: '#EE9322',
    borderBottomWidth: 5
  },
  selectedOption: {
    backgroundColor: 'orange',
    borderColor: '#EE9322'
  },

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
    borderBottomWidth: 5,
    borderColor: '#916a6a',
    borderWidth: 1
  },
  botMessageBubble: {
    backgroundColor: '#FFE6E6',
    padding: 10,
    width: 300,
    borderRadius: 10,
    borderBottomWidth: 5,
    borderColor: '#d6abab',
    borderWidth: 1


  },
});







export default ChatRoom;
