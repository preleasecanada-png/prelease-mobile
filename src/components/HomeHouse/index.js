import * as React from 'react';
import DestionationSlider from '../DestionationSlider';
import styles from './Styles/index';
import {Content} from '..';
import VerticalFullList from '../Lists/VerticalFullList';
import CommanText from '../SignUpLogIn/CommanText';
import {View, ActivityIndicator, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {PropertyService} from '../../services';
import {propertyImageUrl} from '../../services/api';
import {Colors} from '../../theme';

function HomeHouse({onMoreBtnPress}) {
  const navigation = useNavigation();
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await PropertyService.list();
      const list = res?.data?.data || res?.data || [];
      const mapped = list.map(p => ({
        id: String(p.id),
        title: p.title || 'Property',
        text: [p.city, p.state, p.country].filter(Boolean).join(', '),
        date: p.set_your_price
          ? `$${Number(p.set_your_price).toLocaleString()} / month`
          : '',
        noOfGuestPrice: p.set_your_price
          ? `$${Number(p.set_your_price).toLocaleString()} / month`
          : '',
        ratingText: p.avg_rating ? String(p.avg_rating) : '—',
        image: propertyImageUrl(p)
          ? {uri: propertyImageUrl(p)}
          : require('../../assets/images/HouseImageOne.png'),
        raw: p,
      }));
      setProperties(mapped);
    } catch (e) {
      console.error('Failed to load properties:', e);
    }
    setLoading(false);
  };

  const onCategoryClick = item =>
    navigation.navigate('PopularDetails', {item: item.raw || item});

  return (
    <>
      <Content contentContainerStyle={styles.container}>
        <View style={styles.flexRow}>
          <CommanText
            commanText={'Popular'}
            commanTextstyle={styles.commanHeadingTextStyle}
          />
          <CommanText
            commanText={' Destinations'}
            commanTextstyle={[
              styles.commanHeadingTextStyle,
              styles.commanHeadingTextStyle2,
            ]}
          />
        </View>
        <DestionationSlider fullSliderWidth={true} />

        <View style={styles.flexRow}>
          <CommanText
            commanText={'Featured'}
            commanTextstyle={styles.commanHeadingTextStyle}
          />
          <CommanText
            commanText={' Places'}
            commanTextstyle={[
              styles.commanHeadingTextStyle,
              styles.commanHeadingTextStyle2,
            ]}
          />
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={{marginTop: 20}}
          />
        ) : properties.length > 0 ? (
          <VerticalFullList
            data={properties}
            onCategoryClick={onCategoryClick}
          />
        ) : (
          <Text
            style={{
              textAlign: 'center',
              color: '#999',
              marginTop: 20,
              fontSize: 14,
            }}>
            No properties available
          </Text>
        )}
      </Content>
    </>
  );
}

export default HomeHouse;
