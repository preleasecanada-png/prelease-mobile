import * as React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ImageProps,
  PermissionsAndroid,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {Images} from '../../theme';
import styles from './Styles/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

function ProfilePhoto(props) {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);
  const bottomSheetRef = React.useRef(null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        return true;
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const pickPicture = () => {
    requestCameraPermission().then(response => {
      response &&
        ImagePicker.openPicker({
          width: 110,
          height: 110,
          cropping: true,
        }).then(image => {
          setUri(image.path);
          props.onChange?.(image);
        });
    });
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.profileEditContent}>
        <Image
          source={uri ? {uri} : Images.UserImage}
          resizeMode="cover"
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.userEditImageBtn}
          onPress={() => props.handleSheetChanges(250, 250)}>
          <Icon name="camera" size={14} />
          {/* <Image
            source={Images.EditIcon}
            resizeMode="contain"
            style={styles.userEditImage}
          /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProfilePhoto;
