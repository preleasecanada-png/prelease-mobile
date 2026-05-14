import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
  Day
} from 'react-native-gifted-chat';
import { Container, Header } from '../../components';
import ReplayMsg from './ReplayMsg';
import initialMessages from './ChatMsg';
import styles from './Styles/ChatStyle';
import { Colors, Fonts, Icons, Images } from '../../theme';
import { isSameDay } from 'react-native-gifted-chat/lib/utils';
import HeadNavbar from '../../components/Header/HeadNavbar';
import HeaderMain from '../../components/HeaderMain';
import { FeatherIcon } from '../../theme/icons';
import LogoHeading from '../../components/SignUpLogIn/LogoHeading';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import SeverintyPills from '../../components/SeverintyPills';
import { useKeyboardStatus } from '../../hooks/useKeyboardStatus';
import { AIAssistantService } from '../../services';

// avtar
// export const renderAvatar = (props) => (
//   <Avatar
//     {...props}
//     containerStyle={{ left: { marginRight: 0 }, right: {} }}
//   // imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
//   />
// );

const emptyText = `Hello, I am Prelease AI, your personal AI-powered places searching assistant designed to enhance your
booking experience in Canada.`

export const renderBubble = (props) => {
  if (props.currentMessage._id === 2) {
    return <ReplayMsg msgText={props.currentMessage.text} />;
  } else {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.white,
            borderColor: Colors.lightGray,
            borderWidth: 1,
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
            borderBottomStartRadius: 0,
            borderBottomEndRadius: 12
          },
          right: {
            backgroundColor: Colors.primary,
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
            borderBottomStartRadius: 12,
            borderBottomEndRadius: 0,
            borderWidth: 1,
            borderColor: Colors.primary
          }
        }}
        textStyle={{
          left: {
            color: Colors.black,
            fontSize: 16,
            ...Fonts.style.normalText
          },
          right: {
            color: Colors.white,
            fontSize: 16,
            ...Fonts.style.normalText
          }
        }}
      />
    );
  }
};

function ChatDetailsScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { keyboardVisibilityControl } = useKeyboardStatus();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await AIAssistantService.history();
      const rows = res?.data || [];
      if (rows.length > 0) {
        const loaded = rows.slice().reverse().map((h, idx) => ({
          _id: h.id || idx,
          text: h.content,
          createdAt: new Date(h.created_at),
          user: h.role === 'user'
            ? { _id: 1 }
            : { _id: 2, name: 'Pre-AI', avatar: Icons.app_icon },
        }));
        setMessages(loaded);
      }
    } catch (e) {
      console.error('Failed to load AI history:', e);
    }
  };

  const clearHistory = async () => {
    try {
      await AIAssistantService.clearHistory();
      setMessages([]);
    } catch (e) {
      console.error('Failed to clear AI history:', e);
    }
  };

  const onSend = useCallback(async (newMessages = []) => {
    const userMsg = Array.isArray(newMessages) ? newMessages[0] : newMessages;
    const formatted = {
      _id: userMsg._id || Math.random().toString(36).substr(2, 9),
      text: userMsg.text,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((prev) => GiftedChat.append(prev, [formatted]));
    setIsTyping(true);

    try {
      const res = await AIAssistantService.chat(userMsg.text);
      const aiText = res?.reply || 'Sorry, I could not process your request.';
      const aiMsg = {
        _id: Math.random().toString(36).substr(2, 9),
        text: aiText,
        createdAt: new Date(),
        user: { _id: 2, name: 'Pre-AI', avatar: Icons.app_icon },
      };
      setMessages((prev) => GiftedChat.append(prev, [aiMsg]));
    } catch (e) {
      console.error('AI chat error:', e);
      setMessages((prev) => GiftedChat.append(prev, [{
        _id: Math.random().toString(36).substr(2, 9),
        text: 'Sorry, something went wrong. Please try again.',
        createdAt: new Date(),
        user: { _id: 2, name: 'Pre-AI' },
      }]));
    }
    setIsTyping(false);
  }, []);

  const renderTicks = () => {
    return (
      <>
        <Text style={styles.msgSeenText}>Read</Text>
      </>
    );
  };
  const renderInputToolbar = (props) => {
    return (
      <View style={styles.chatInputBgContainerStyle}>
        {/* <View style={styles.inputBorderView} /> */}
        <InputToolbar
          {...props}


          containerStyle={styles.chatInputContainerStyle}
        />
      </View>
    );
  };

  const renderDay = (props) => {
    if (
      props.currentMessage.createdAt &&
      !isSameDay(props.previousMessage, props.previousMessage)
    ) {
      return (
        <View style={styles.dateRowStyle}>
          <View style={[styles.dateRowLins, styles.dateRowLeftLine]} />
          <Day
            {...props}
            textStyle={styles.dateTextStyle}
            containerStyle={styles.dateTextContainerStyle}
          />
          <View style={[styles.dateRowLins, styles.dateRowRightLine]} />
        </View>
      );
    }
  };
  const renderSend = (props) => (
    <Send onSend={onSend} {...props} containerStyle={[styles.chatSendBtnContainer]}>
      <Image
        style={styles.chatSendBtnImg}
        resizeMode="contain"
        source={Images.ChatSendGray}
      />
    </Send>
  );

  const suggestionMessages = [
    {
      _id: 3,
      text: 'How can I assist you?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'User 2',
        avatar: 'https://placeimg.com/140/140/people'
      }
    },
    {
      _id: 4,
      text: 'Find cozy cabins in the Canadian Rockies for a winter getaway.',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'User 2',
        avatar: 'https://placeimg.com/140/140/people'
      }
    },
  ];
  const renderSuggestionMessages = ({ item }) => {
    const onPress=()=>{
      console.log('suggestion message pressed')
      onSend(
        {
          _id: 1,
          text: item?.text,
          createdAt: new Date(),
          user: {
            _id: 1,
            // name: 'User 2',
            // avatar: 'https://placeimg.com/140/140/people'
          },
        }

      )
      // navigation.navigate('SearchScreen', {
      //   location: item.location,
      //   locationName: item.locationName,
      //   searchType: 'place',
      // })
    }
    return (
      <Pressable key={item._id} style={styles.suggestionItem} onPress={onPress}>
        <Text style={styles.suggestionText}>{item.text}</Text>
      </Pressable>
    )
  }

  return (
    <Container style={styles.container}>
      <HeaderMain
        absolute={false}
        leftIcon="chevron-thin-left"
        leftIconPress={() => navigation.goBack()}
        rightIcon={<FeatherIcon name={'more-vertical'} size={25} color={Colors.black} />}
        rightIconPress={() => { }}
        centerImageColor={Colors.lightWhite}
        containerStyle={{
          paddingHorizontal: 20,
        }}
        customRightIcon={true}
      />
      {/* <Header
        transparent
        hasBackBtn
        title="Orchad Row House"
        onBackPress={() => navigation.goBack()}
      /> */}
      <View style={styles.container}>
        <GiftedChat
          scrollToBottom
          alwaysShowSend
          wrapInSafeArea
          renderAvatar={() => null}
          messages={messages}
          showAvatarForEveryMessage={false}
          placeholder="Search for places with AI..."
          isTyping={isTyping}
          user={{
            _id: 1
          }}
          messagesContainerStyle={messages.length == 0 && { transform: [{ scaleY: -1 }] }}
          // inverted={messages.length !== 0}
          renderBubble={renderBubble}
          renderTicks={renderTicks}
          renderDay={renderDay}
          parsePatterns={(linkStyle) => [
            {
              pattern: /#(\w+)/,
              style: linkStyle,
              onPress: (tag) => { }
              // console.log(`Pressed on hashtag: ${tag}`)
            }
          ]}
          textInputStyle={styles.textInputStyle}
          renderInputToolbar={renderInputToolbar}
          renderChatEmpty={
            () => (
              <View style={styles.chatEmptyView}>
                <SeverintyPills label={"Pre-Ai"} active={true} />

                <View style={[{ alignItems: "center", }]}>
                  <Image source={Icons.app_icon} resizeMode="contain" style={styles.logo} />
                  <Text style={styles.chatEmptyText}>{emptyText}</Text>
                </View>
                <View style={{
                  height: 60,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  alignContent: "flex-end",

                  // marginBottom: 'auto',
                }}>
                  <FlatList
                    horizontal
                    data={suggestionMessages}
                    renderItem={renderSuggestionMessages}
                    keyExtractor={(item) => item._id.toString()}
                    contentContainerStyle={{
                      marginBottom: 'auto',
                    }}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </View>
            )
          }
          // textInputProps={{
          //   value: text,
          //   onChangeText: (t) => setText(t)

          // }}
          renderSend={renderSend}
          timeTextStyle={[
            styles.chatMsgTimeText,
            {
              left: {
                color: Colors.darkerGray
              },
              right: {
                color: Colors.white
              }
            }
          ]}
          dateFormat={'ddd, DD/MM'}
          onSend={onSend}
        />
      </View>
    </Container>
  );
}

export default ChatDetailsScreen;
