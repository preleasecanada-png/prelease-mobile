import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {
  View,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {Header} from '../../components';
import {Colors} from '../../theme';
import {ChatService} from '../../services';
import {useSelector} from 'react-redux';

export const renderBubble = props => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: {
        backgroundColor: '#E8E8E8',
        borderRadius: 15,
        padding: 5,
      },
      right: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
        padding: 5,
      },
    }}
    textStyle={{
      left: {
        color: '#000000',
        fontSize: 16,
        lineHeight: 20,
      },
      right: {
        color: '#FFFFFF',
        fontSize: 16,
        lineHeight: 20,
      },
    }}
  />
);

function ChatDetailsScreen({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(s => s.app?.user);
  const chatUserId = route?.params?.chatUserId;
  const chatUserName = route?.params?.chatUserName || 'User';

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      if (chatUserId) {
        const res = await ChatService.getChat(chatUserId);
        const chatList = res?.data?.data || res?.data || [];
        const mapped = chatList.map((msg, i) => {
          let msgText = '';
          if (typeof msg.message === 'string') {
            msgText = msg.message;
          } else if (typeof msg.text === 'string') {
            msgText = msg.text;
          } else if (msg.message && typeof msg.message === 'object') {
            msgText = msg.message.message || JSON.stringify(msg.message);
          } else {
            msgText = 'Empty message';
          }

          return {
            _id: msg.id || i,
            text: msgText,
            createdAt: msg.created_at ? new Date(msg.created_at) : new Date(),
            user: {
              _id: msg.sender_id || msg.user_id || 2,
              name: msg.sender?.name || chatUserName,
            },
          };
        });
        setMessages(mapped.reverse());
      }
    } catch (e) {
      console.error('Failed to load chat messages:', e);
    }
    setLoading(false);
  };

  const onSend = useCallback(
    async (newMessages = []) => {
      setMessages(prev => GiftedChat.append(prev, newMessages));
      const msg = newMessages[0];
      try {
        await ChatService.sendMessage(chatUserId, msg.text);
      } catch (e) {
        console.error('Failed to send message:', e);
      }
    },
    [chatUserId],
  );

  if (loading) {
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <Header
          transparent
          hasBackBtn
          title={chatUserName}
          onBackPress={() => navigation.goBack()}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: Colors.white}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={65}>
      <Header
        transparent
        hasBackBtn
        title={chatUserName}
        onBackPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        <GiftedChat
          messages={messages}
          placeholder="Message..."
          user={{_id: currentUser?.id || 1}}
          onSend={onSend}
          renderBubble={renderBubble}
          showAvatarForEveryMessage={false}
          renderAvatar={() => null}
          textInputProps={{
            style: {
              flex: 1,
              padding: 10,
              fontSize: 16,
              backgroundColor: '#f0f0f0',
              borderRadius: 20,
              margin: 10,
            },
          }}
          renderFooter={() => <View style={{height: 25}} />}
          bottomOffset={Platform.OS === 'ios' ? 30 : 0}
          listViewProps={{
            style: {backgroundColor: Colors.white, marginBottom: 15},
            contentContainerStyle: {paddingBottom: 15},
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default ChatDetailsScreen;
