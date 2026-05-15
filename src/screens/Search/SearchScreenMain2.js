import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  BottomSheetScrollView,
  BottomSheetView,
  WINDOW_HEIGHT,
} from '@gorhom/bottom-sheet';
import {Pressable, StatusBar, View} from 'react-native';
import {Container, Content} from '../../components';
import {TouchableOpacity} from 'react-native';
import {FeatherIcon} from '../../theme/icons';
import CommanBtnScreen from '../../components/CommanBtn';
import {Colors, Fonts, Images} from '../../theme';
import {Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import CurrentLocationScreen from '../CurrentLocation/CurrentLocationScreen';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-svg';
import SearchLocationScreen from '../SearchLocation';
import PopularDetailsScreen from '../PopularDetails/PopularDetailsScreen';
import SearchInputScreen from '../../components/SearchInput/Index';
import {height, paddingTop} from 'styled-system';

function SearchScreenMain2({navigation, route}) {
  const {title, date, noOfGuest} = route.params?.item;
  const bottomSheetRef = React.useRef(null);
  const [coordinates, setCordinates] = React.useState({
    latitude: 21.187090218083345,
    longitude: 72.79023272212653,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  });

  return (
    <Container
      containerStyle={{
        backgroundColor: Colors.white,
      }}>
      <View
        style={{
          backgroundColor: Colors.white,
          // marginTop: StatusBar.currentHeight,
          width: '90%',
          position: 'absolute',

          top: StatusBar.currentHeight,
          zIndex: 90,
          // marginHorizontal: 20
        }}>
        <SearchInputScreen
          leftIcon={'arrow-left'}
          searchInputStyle={{marginHorizontal: 20}}
          whereTo={title}
          placeholder={`${date} - ${noOfGuest} guests`}
          onLeftButtonPress={() => navigation.goBack()}
        />
      </View>
      <MapView style={styles.mapStyle} initialRegion={{...coordinates}}>
        <Marker
          draggable
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
          title={'Zluck Solutions'}
          description={'This is an IT Compnay'}
          image={Images.CurrentLocation}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
        />
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        // onChange={handleSheetChanges}
        snapPoints={[WINDOW_HEIGHT * 0.5, WINDOW_HEIGHT]}>
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          style={styles.bottomSheetContent}>
          <PopularDetailsScreen route={route} navigation={navigation} />
        </BottomSheetScrollView>
      </BottomSheet>
    </Container>
  );
}

const styles = EStyleSheet.create({
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  bottomSheetContent: {
    flex: 1,
    height: '100%',
    // paddingHorizontal: '15rem',
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: '5rem',
    },
    // alignItems: 'center',
  },
});

export default SearchScreenMain2;
