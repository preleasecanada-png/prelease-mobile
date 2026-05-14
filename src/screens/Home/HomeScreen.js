import * as React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { Container, Content, Header } from '../../components';
import SearchInput from '../../components/SearchInput/Index';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Images, Colors, Icons } from '../../theme';
import HomeHouse from '../../components/HomeHouse';
import styles from './Styles/HomeStyle';
import { navigate } from '../../navigation/ReduxNavigation';
import CustomDrawer from '../../components/CustomDrawer';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TouchableHighlight } from 'react-native';
const { width, height } = Dimensions.get("window")

function HomeScreen({ navigation }) {
  const [index, setIndex] = React.useState(0);
  const [categoryIndex, setcategoryIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'all', title: 'All' },
    { key: 'house', title: 'House' },
    { key: 'flats', title: 'Flats' },
    { key: 'apartment', title: 'Apartment' },
    { key: 'villa', title: 'Villa' }
  ]);

  const renderTabBar1 = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicatorStyle}
        style={styles.tabBarStyle}
        // labelStyle={[styles.labelStyle]}
        renderLabel={(labelProps) => {
          return (
            <Text style={[styles.labelStyle, labelProps?.focused ? styles.activeLabelStyle : {}]}> {labelProps?.route?.title}</Text>
          )
        }}
        tabStyle={styles.tabStyle}
        activeColor={Colors.primary}
        pressColor={Colors.transparent}

      />
    )
  }
  const [isScrolling, setIsScrolling] = React.useState(false);
  const renderItem = (item, i, props) => {
    return (
      <View
        style={styles.tabView}>
        <TouchableHighlight
          style={[
            styles.tabItem,
            categoryIndex === i && { color: Colors.white, backgroundColor: Colors.primary }
          ]}
          onPress={() =>setcategoryIndex(i)}>

          <Animated.Text
            style={[styles.tabItemText, categoryIndex === i &&
              { color: Colors.white, backgroundColor: Colors.primary }]}>
            {item.title}
          </Animated.Text>
        </TouchableHighlight>
      </View>
    );
  }
  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (

      <View style={styles.tabBar}>

        <Carousel
          data={props.navigationState.routes}
          renderItem={({ item, index }) => renderItem(item, index, props)}
          sliderWidth={WINDOW_WIDTH}
          itemWidth={WINDOW_WIDTH / 4}
          itemHeight={WINDOW_WIDTH * 0.05}
          windowSize={1}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          sliderHeight={WINDOW_WIDTH * 0.05}
          activeSlideAlignment={'start'}
          onScrollBeginDrag={()=>setIsScrolling(true)}
          onScrollEndDrag={()=>setIsScrolling(false)}
          // loop
          // autoplay
          // onSnapToItem={(i) => setcategoryIndex(i)}
          lockScrollWhileSnapping={true}
          enableMomentum={true}
          decelerationRate={0.25}


          
        />
      </View>
    );
  };


  const HouseRoute = () => (
    <>
      <HomeHouse
        navigation={navigate}
        onMoreBtnPress={() => navigation.navigate('PopularDestionation')}
      />
    </>
  );

  const FlatsRoute = () => (
    <>
      <HomeHouse
        navigation={navigate}
        onCategoryClick={() => navigation.navigate('PopularDetails')}
        onMoreBtnPress={() => navigation.navigate('PopularDestionation')}
      />
    </>
  );

  const ApartmentRoute = () => (
    <>
      <HomeHouse
        navigation={navigate}
        onCategoryClick={() => navigation.navigate('PopularDetails')}
        onMoreBtnPress={() => navigation.navigate('PopularDestionation')}
      />
    </>
  );

  const VillaRoute = () => (
    <>
      <HomeHouse
        navigation={navigate}
        onCategoryClick={() => navigation.navigate('PopularDetails')}
        onMoreBtnPress={() => navigation.navigate('PopularDestionation')}
      />
    </>
  );

  const renderScene = SceneMap({
    all: HouseRoute,
    house: HouseRoute,
    flats: FlatsRoute,
    apartment: ApartmentRoute,
    villa: VillaRoute
  });

  return (
    <>
      <View style={{
        backgroundColor: Colors.white, paddingHorizontal: 20,
        flexDirection: "row", alignItems: "center",
        justifyContent: "space-between"
      }}>
        <TouchableOpacity style={{ borderWidth: 0.5, borderColor: Colors.gray, borderRadius: 50, padding: 10, marginTop: 10 }}
          onPress={() => navigation.openDrawer()}>

          <Icon name={'menu'} size={25} color={Colors.black} />
        </TouchableOpacity>

        <Image
          source={Icons.leave3x}
          resizeMode='contain'
          style={{ width: 100, height: 50, tintColor: Colors.primary, marginBottom: 10 }}
        />

        <TouchableOpacity style={{ borderWidth: 0.5, borderColor: Colors.gray, borderRadius: 50, padding: 10, marginTop: 10 }}
          onPress={() => navigation.navigate('Notification')}
        >
          <Icon name={'bell'} size={25} color={Colors.black} />
        </TouchableOpacity>
      </View>
      <Container>



        <View style={styles.searchNotifyContent}>
          <SearchInput
            searchInputStyle={styles.searchInputStyle}
            placeholder={`Anywhere • Any week • Add guests`}
          />
          {/* <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => navigation.navigate('Notification')}>
            <Image
              source={Images.NotificationImage}
              resizeMode="contain"
              style={styles.notificationIcon}
            />
            <View style={styles.penddingNotification} />
          </TouchableOpacity> */}
        </View>
        <View style={styles.tabViewStyle}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            swipeEnabled={false}
            onIndexChange={setIndex}
          />
        </View>
      </Container>
    </>
  );
}

export default HomeScreen;
