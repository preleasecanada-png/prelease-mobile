import * as React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import SearchInput from '../../components/SearchInput/Index';
import {Container, Content, Header} from '../../components';
import {chatUserIdData} from '../../assets/data';
import styles from './Styles/ChatStyle';
import CommanHeadingScreen from '../../components/CommanHeading';
import {navigate} from '../../navigation/ReduxNavigation';
import LineSeperator from '../../components/LineSeperator';
import {Colors} from '../../theme';
import {alignSelf, width} from 'styled-system';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import HeaderMain from '../../components/HeaderMain';
import {SceneMap, TabView} from 'react-native-tab-view';

function ChatAISCreen({navigation}) {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {
      key: 'all',
      title: 'All',
      unreadCount: 2,
      active: true,
    },
    {
      key: 'unread',
      title: 'Unread',
      unreadCount: 1,
      active: false,
    },
    {
      key: 'read',
      title: 'Read',
      unreadCount: 0,
      active: false,
    },
    {
      key: 'saved',
      title: 'Saved',
      unreadCount: 0,
      active: false,
    },
  ]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.chatListLink, !item?.read && styles.unReadChatItem]}
      onPress={() => navigation.navigate('chatDetails')}>
      <ImageBackground
        imageStyle={styles.chatListUserImg}
        source={item.userImage}
        resizeMode="contain"
        style={styles.chatListUserImg}>
        {item.online && <View style={styles.onlineStatus} />}
      </ImageBackground>

      <View style={styles.chatListLinkText}>
        <Text style={styles.chatListLinkNameText}>{item.userName}</Text>
        <Text
          style={[
            styles.chatListDateText,
            !item?.read && styles.unreadChatListDateText,
          ]}>
          {item.date} {item.time}
        </Text>
        <Text numberOfLines={1} style={styles.chatText}>
          {item.text}
        </Text>
        {/* <Text style={styles.chatListLinkLastSeenText}>{item.userLastSeen}</Text> */}
      </View>
    </TouchableOpacity>
  );

  const renderTabItems = React.useCallback(
    (item, itemIndex) => {
      return (
        <TouchableOpacity
          onPress={() => setIndex(itemIndex)}
          style={[
            styles.tabButton,
            index == itemIndex && styles.activedtabButton,
          ]}>
          <Text
            style={[
              styles.tabButtonText,
              index == itemIndex && styles.activetabButtonText,
            ]}>
            {item?.title}
          </Text>
        </TouchableOpacity>
      );
    },
    [index],
  );

  const renderTabBar = React.useCallback(
    props => {
      return (
        <View style={styles.tabsContainer}>
          {props.navigationState.routes.map((item, index) =>
            renderTabItems(item, index),
          )}

          <TouchableOpacity style={[styles.searchButton]}>
            <FeatherIcon
              name="search"
              size={22}
              style={styles.searchIconLeft}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [index],
  );

  const renderContent = React.useCallback(() => {
    return (
      <Content contentContainerStyle={styles.container}>
        <FlatList
          bounces={false}
          data={chatUserIdData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={
            <LineSeperator
              style={{
                height: 1,
                backgroundColor: Colors.boxShadowLighterBlack,
                paddingHorizontal: 20,
                width: '80%',
                alignSelf: 'center',
              }}
            />
          }
        />
      </Content>
    );
  }, [chatUserIdData]);

  const renderUnreadContent = React.useCallback(() => {
    return (
      <Content contentContainerStyle={styles.container}>
        <FlatList
          bounces={false}
          data={chatUserIdData.filter(item => item.read == false)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={
            <LineSeperator
              style={{
                height: 1,
                backgroundColor: Colors.boxShadowLighterBlack,
                paddingHorizontal: 20,
                width: '80%',
                alignSelf: 'center',
              }}
            />
          }
        />
      </Content>
    );
  }, [chatUserIdData]);
  const renderReadContent = React.useCallback(() => {
    return (
      <Content contentContainerStyle={styles.container}>
        <FlatList
          bounces={false}
          data={chatUserIdData.filter(item => item.read == true)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={
            <LineSeperator
              style={{
                height: 1,
                backgroundColor: Colors.boxShadowLighterBlack,
                paddingHorizontal: 20,
                width: '80%',
                alignSelf: 'center',
              }}
            />
          }
        />
      </Content>
    );
  }, [chatUserIdData]);

  const renderSavedContent = React.useCallback(() => {
    return (
      <Content contentContainerStyle={styles.container}>
        <FlatList
          bounces={false}
          data={chatUserIdData.filter(item => item.saved == true)}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={
            <LineSeperator
              style={{
                height: 1,
                backgroundColor: Colors.boxShadowLighterBlack,
                paddingHorizontal: 20,
                width: '80%',
                alignSelf: 'center',
              }}
            />
          }
        />
      </Content>
    );
  }, [chatUserIdData]);

  const AllRoute = () => (
    <Content contentContainerStyle={styles.container}>
      {renderContent()}
    </Content>
  );

  const UnreadRoute = () => (
    <Content contentContainerStyle={styles.container}>
      {renderUnreadContent()}
    </Content>
  );
  const ReadRoute = () => (
    <Content contentContainerStyle={styles.container}>
      {renderReadContent()}
    </Content>
  );

  const SavedRoute = () => (
    <Content contentContainerStyle={styles.container}>
      {renderSavedContent()}
    </Content>
  );

  const renderScene = SceneMap({
    all: AllRoute,
    unread: UnreadRoute,
    read: ReadRoute,
    saved: SavedRoute,
  });

  const openDrawer = React.useMemo(() => {
    return navigation?.openDrawer || navigation.getParent().openDrawer;
  }, [navigation]);

  return (
    <Container
      safeAreaView
      conatinerStyle={{
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}>
      <HeaderMain
        absolute={false}
        leftIcon={<FeatherIcon name={'menu'} size={25} color={Colors.black} />}
        leftIconPress={openDrawer}
        rightIcon={
          <FeatherIcon name={'more-vertical'} size={25} color={Colors.black} />
        }
        rightIconPress={() => {}}
        centerImageColor={Colors.lightWhite}
        containerStyle={{
          paddingHorizontal: 20,
        }}
        customRightIcon={true}
        customLeftIcon={true}
      />

      <View style={{marginTop: 20, paddingHorizontal: 15}}>
        <CommanHeadingScreen
          headingText
          heading="Messages"
          commanHeadingContainerStyle={styles.commanHeadingContainerStyle}
          commanHeadingTextStyle={styles.commanHeadingTextStyle}
          navigation={navigate}
        />
      </View>

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
        onIndexChange={setIndex}
      />
    </Container>
  );
}

export default ChatAISCreen;
