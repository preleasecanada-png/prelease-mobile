import * as React from 'react';
import { Image, Text, TouchableOpacity, View, FlatList, ImageBackground, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { Container, Content } from '../../components';
import styles from './Styles/ChatStyle';
import CommanHeadingScreen from '../../components/CommanHeading';
import { navigate } from '../../navigation/ReduxNavigation';
import LineSeperator from '../../components/LineSeperator';
import { Colors, Images } from '../../theme';
import FeatherIcon from 'react-native-vector-icons/Feather';
import HeaderMain from '../../components/HeaderMain';
import { ChatService } from '../../services';
import { imageUrl } from '../../services/api';
import { useSelector } from 'react-redux';

function ChatScreen({ navigation }) {
  const [conversations, setConversations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const currentUser = useSelector(s => s.app?.user);

  React.useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const res = await ChatService.conversations();
      const list = res?.data?.data || res?.data || [];
      setConversations(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('Failed to load conversations:', e);
      try {
        const res2 = await ChatService.getChats();
        const list2 = res2?.data?.data || res2?.data || [];
        setConversations(Array.isArray(list2) ? list2 : []);
      } catch (e2) { console.error(e2); }
    }
    setLoading(false);
    setRefreshing(false);
  };

  const getOtherUser = (conv) => {
    if (conv.user) return conv.user;
    if (conv.other_user) return conv.other_user;
    if (conv.sender_id === currentUser?.id) return conv.receiver || {};
    return conv.sender || {};
  };

  const renderItem = ({ item }) => {
    const other = getOtherUser(item);
    const userName = other?.name || (other?.first_name ? `${other.first_name} ${other.last_name || ''}`.trim() : 'User');
    const rawPic = other?.picture || other?.profile_picture;
    const profilePic = rawPic
      ? { uri: rawPic.startsWith('http') ? rawPic : imageUrl(rawPic) }
      : Images.UserImage;
    
    const lastMsgObj = item.last_message;
    let lastMsg = '';
    if (typeof lastMsgObj === 'object' && lastMsgObj) {
      lastMsg = typeof lastMsgObj.message === 'string' ? lastMsgObj.message : String(lastMsgObj.message || '');
    } else if (typeof lastMsgObj === 'string') {
      lastMsg = lastMsgObj;
    }
    
    const time = typeof lastMsgObj === 'object' ? lastMsgObj?.created_at : item.updated_at || item.created_at || '';
    const now = new Date();
    const msgDate = time ? new Date(time) : null;
    let formattedTime = '';
    if (msgDate) {
      const diffMs = now - msgDate;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      if (diffMins < 1) formattedTime = 'Just now';
      else if (diffMins < 60) formattedTime = `${diffMins}m`;
      else if (diffHours < 24) formattedTime = `${diffHours}h`;
      else if (diffDays < 7) formattedTime = `${diffDays}d`;
      else formattedTime = msgDate.toLocaleDateString();
    }
    
    const unread = (item.unread_count || 0) > 0;

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: item.is_pinned ? '#fff9e6' : (unread ? '#f4f9ff' : Colors.white),
          alignItems: 'center',
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: item.is_pinned ? '#ffe082' : '#f0f0f0'
        }}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('chatDetails', { chatUserId: other?.id, chatUserName: userName })}
        onLongPress={() => {
          Alert.alert(
            userName,
            'Options de la conversation',
            [
              { text: 'Annuler', style: 'cancel' },
              { text: item.is_pinned ? 'Desepingler' : 'Ã‰pingler en haut', onPress: async () => {
                  try {
                    await ChatService.pinConversation(other?.id);
                    fetchConversations();
                  } catch(e) { console.log(e); }
                } 
              },
              { text: unread ? 'Marquer comme lu' : 'Marquer comme non lu', onPress: async () => {
                  try {
                    if (unread) {
                      await ChatService.markAsRead(other?.id);
                    } else {
                      await ChatService.markAsUnread(other?.id);
                    }
                    fetchConversations();
                  } catch(e) { console.log(e); }
                } 
              },
              { text: 'Supprimer', style: 'destructive', onPress: () => {
                  Alert.alert('Confirmation', 'Etes-vous sur de vouloir supprimer tous les messages avec cette personne ?', [
                    { text: 'Non', style: 'cancel' },
                    { text: 'Oui, supprimer', style: 'destructive', onPress: async () => {
                        try {
                          await ChatService.deleteConversation(other?.id);
                          fetchConversations();
                        } catch(e) { console.log(e); }
                      }
                    }
                  ]);
                } 
              }
            ],
            { cancelable: true }
          );
        }}
      >
        <View style={{ position: 'relative' }}>
          <Image
            source={profilePic}
            style={{ width: 55, height: 55, borderRadius: 27.5, backgroundColor: '#eee' }}
            resizeMode="cover"
          />
          {unread && (
            <View style={{
              position: 'absolute',
              right: 0,
              bottom: 2,
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: Colors.primary,
              borderWidth: 2,
              borderColor: Colors.white
            }} />
          )}
        </View>
        
        <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, width: '100%' }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#000000', flex: 1, marginRight: 10 }} numberOfLines={1}>
              {userName}
            </Text>
            <Text style={{ fontSize: 12, color: unread ? '#0056D2' : '#888888', fontWeight: unread ? '600' : 'normal' }}>
              {formattedTime}
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: unread ? '#000000' : '#666666', fontWeight: unread ? '600' : 'normal', lineHeight: 20 }} numberOfLines={1}>
            {lastMsg || 'Attachment'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const openDrawer = React.useMemo(() => {
    return navigation?.openDrawer || navigation.getParent()?.openDrawer;
  }, [navigation]);

  if (loading) {
    return (
      <Container safeAreaView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </Container>
    );
  }

  return (
    <Container safeAreaView conatinerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
      <HeaderMain
        absolute={false}
        leftIcon={<FeatherIcon name={'menu'} size={25} color={Colors.black} />}
        leftIconPress={openDrawer}
        rightIcon={<FeatherIcon name={'more-vertical'} size={25} color={Colors.black} />}
        rightIconPress={() => {
          Alert.alert(
            'Options',
            'Que souhaitez-vous faire ?',
            [
              { text: 'Annuler', style: 'cancel' },
              { text: 'Marquer tout comme lu', onPress: () => { /* A implementer plus tard */ } },
              { text: 'Supprimer les messages', onPress: () => { /* A implementer plus tard */ }, style: 'destructive' }
            ],
            { cancelable: true }
          );
        }}
        centerImageColor={Colors.lightWhite}
        containerStyle={{ paddingHorizontal: 20 }}
        customRightIcon={true}
        customLeftIcon={true}
      />

      <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
        <CommanHeadingScreen
          headingText
          heading="Messages"
          commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
          commanHeadingTextStyle={styles.commanHeadingTextStyle}
          navigation={navigate}
        />
      </View>

      <View style={{ flex: 1, width: '100%' }}>
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 20 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchConversations(); }} tintColor={Colors.primary} />}
          ItemSeparatorComponent={() => (
            <LineSeperator style={{ height: 1, backgroundColor: '#E0E0E0', width: '90%', alignSelf: 'center' }} />
          )}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <FeatherIcon name="message-circle" size={48} color="#ccc" />
              <Text style={{ fontSize: 16, color: '#999', marginTop: 12 }}>No conversations yet</Text>
            </View>
          }
        />
      </View>
    </Container>
  );
}

export default ChatScreen;
