import * as React from 'react';
import { useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Content } from '../../components';
import SearchInput from '../../components/SearchInput/Index';
import MapView, { Marker } from 'react-native-maps';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/CurrentLocationStyle';
import { Colors, Images } from '../../theme';
import { navigate } from '../../navigation/ReduxNavigation';
import CommonSearchInput from '../../components/CommonSearchInput/Index';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { alignItems, backgroundColor, justifyContent } from 'styled-system';
import CurrentLocation from '.';
import CommanBtnScreen from '../../components/CommanBtn';
import HeaderMain from '../../components/HeaderMain';
import Icon from 'react-native-vector-icons/Entypo'
import SearchLocation from '../SearchLocation';

const CurrentLocationScreen = ({ navigation }) => {  // ref
  const bottomSheetRef = React.useRef(null);
  const [coordinates, setCordinates] = React.useState({
    latitude: 21.187090218083345,
    longitude: 72.79023272212653,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034
  })

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [input, setInput] = useState('');

  return (
    <Container>

      <TouchableOpacity
        style={{
          position: 'absolute', top: 10, left: 10, zIndex: 999,
          backgroundColor: Colors.opacityBlack, padding: 10, borderRadius: 50
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-thin-left" size={20} color={Colors.white} />
      </TouchableOpacity>
      <View style={{
        backgroundColor: 'transparent',
        // position: 'absolute',
        width: '80%',
        marginLeft: 35,
        // top: 0,
        zIndex: 999
      }}>
        <SearchLocation
          placeholderText={"Search Location"}
          showCard={false}
        />
      </View>
      <MapView
        style={styles.mapStyle}
        initialRegion={{ ...coordinates }}>
        <Marker
          draggable
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          }}
          title={'Zluck Solutions'}
          description={'This is an IT Compnay'}
          image={Images.CurrentLocation}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
        />
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[250, 250]}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={{ height: 250 - 100 }}>
            <CommanHeading
              headingText
              heading="My Location"
              navigation={navigate}
            />
            <CurrentLocation />
          </View>
          <CommanBtnScreen
            btnText={'Confirm location'}
            commanBtnStyle={styles.btnStyle}

          />

        </BottomSheetView>
      </BottomSheet>
    </Container>
  );
};
export default CurrentLocationScreen;
