import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import { Container } from '../../components';
import MapView, { Marker } from 'react-native-maps';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/CurrentLocationStyle';
import { Colors, Images } from '../../theme';
import { navigate } from '../../navigation/ReduxNavigation';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import CommanBtnScreen from '../../components/CommanBtn';
import Icon from 'react-native-vector-icons/Entypo';

const DEFAULT_REGION = {
  latitude: 45.5017,
  longitude: -73.5673,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const CurrentLocationScreen = ({ navigation }) => {
  const bottomSheetRef = React.useRef(null);
  const [coordinates, setCoordinates] = React.useState(DEFAULT_REGION);
  const [address, setAddress] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const handleSheetChanges = React.useCallback(() => {}, []);

  React.useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          { title: 'Location Permission', message: 'This app needs access to your location.' }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setLoading(false);
          return;
        }
      } catch (e) {
        setLoading(false);
        return;
      }
    }
    getCurrentPosition();
  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        fetchAddress(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        console.warn('Geolocation error:', error.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      const addr = data?.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setAddress(addr);
    } catch (e) {
      setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    }
  };

  return (
    <Container>
      <TouchableOpacity
        style={localStyles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevron-thin-left" size={20} color={Colors.white} />
      </TouchableOpacity>

      {loading ? (
        <View style={localStyles.loadingCenter}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={localStyles.loadingText}>Getting your location…</Text>
        </View>
      ) : (
        <MapView style={styles.mapStyle} region={coordinates}>
          <Marker
            draggable
            coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}
            title="My Location"
            description={address}
            image={Images.CurrentLocation}
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setCoordinates(prev => ({ ...prev, latitude, longitude }));
              fetchAddress(latitude, longitude);
            }}
          />
        </MapView>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[200, 200]}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={{ paddingHorizontal: 16, flex: 1 }}>
            <CommanHeading headingText heading="My Location" navigation={navigate} />
            <Text style={localStyles.addressText} numberOfLines={3}>
              {address || 'Fetching address…'}
            </Text>
          </View>
          <CommanBtnScreen
            btnText="Confirm location"
            commanBtnStyle={styles.btnStyle}
            onBtnPress={() => navigation.goBack()}
          />
        </BottomSheetView>
      </BottomSheet>
    </Container>
  );
};

const localStyles = StyleSheet.create({
  backBtn: {
    position: 'absolute', top: 50, left: 16, zIndex: 999,
    backgroundColor: Colors.primary, padding: 10, borderRadius: 50,
  },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, fontSize: 14, color: '#666' },
  addressText: { fontSize: 14, color: '#444', marginTop: 4, lineHeight: 20 },
});

export default CurrentLocationScreen;
