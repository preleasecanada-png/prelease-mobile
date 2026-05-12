import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Container from '../Container'
import HeaderMain from '../HeaderMain'
import { Colors, Images } from '../../theme'
import { imageUrl } from '../../services/api'
import { FeatherIcon } from '../../theme/icons'
import Content from '../Content'
import CommanHeadingScreen from '../CommanHeading'
import { navigate } from '../../navigation/ReduxNavigation';
import cStyles from './Styles/Index';
import SummaryList from '../SummaryList'

const Checkout = ({ navigation, route }) => {
    const { item } = route?.params || {};
    const property = item || {};
    const imgPath = property?.property_images?.[0]?.original;
    const imageSource = imgPath
        ? { uri: imageUrl(imgPath) }
        : Images.SliderHomeHouseImageOne;

    return (
        <Container>
            <HeaderMain
                absolute={false}
                leftIcon="chevron-thin-left"
                leftIconPress={() => navigation.goBack()}
                rightIcon={<FeatherIcon name={'bell'} size={25} color={Colors.black} />}
                rightIconPress={() => { }}
                centerImageColor={Colors.lightWhite}
                containerStyle={{
                    paddingHorizontal: 20,
                }}
                customRightIcon={true}
            />
            <Content hasHeader contentContainerStyle={cStyles.container}>
                <CommanHeadingScreen
                    headingText
                    heading="Checkout"
                    commanHeadingContainerStyle={cStyles.commanHeadingContainerStyle}
                    navigation={navigate}
                />

                <View style={localStyles.propertyCard}>
                    <Image source={imageSource} style={localStyles.propertyImg} resizeMode="cover" />
                    <View style={localStyles.propertyInfo}>
                        <Text style={localStyles.propertyTitle} numberOfLines={1}>{property.title || 'Property'}</Text>
                        <Text style={localStyles.propertyAddr} numberOfLines={1}>{[property.address, property.city].filter(Boolean).join(', ')}</Text>
                        {property.price && (
                            <Text style={localStyles.propertyPrice}>${Number(property.price).toLocaleString()} / month</Text>
                        )}
                    </View>
                </View>

                <SummaryList
                    heading={"Lease Summary"}
                    data={[
                        { title: "Property", value: property.title || '—' },
                        { title: "Location", value: property.city || property.address || '—' },
                        { title: "Monthly Rent", value: property.price ? `$${Number(property.price).toLocaleString()}` : '—' },
                        { title: "Bedrooms", value: property.bedrooms ? String(property.bedrooms) : '—' },
                        { title: "Bathrooms", value: property.bathrooms ? String(property.bathrooms) : '—' },
                    ]}
                />
            </Content>
        </Container>
    )
}

const localStyles = StyleSheet.create({
    propertyCard: { flexDirection: 'row', borderRadius: 12, borderWidth: 1, borderColor: '#eee', overflow: 'hidden', marginBottom: 16 },
    propertyImg: { width: 100, height: 90 },
    propertyInfo: { flex: 1, padding: 10, justifyContent: 'center' },
    propertyTitle: { fontSize: 15, fontWeight: '600' },
    propertyAddr: { fontSize: 12, color: '#666', marginTop: 2 },
    propertyPrice: { fontSize: 14, fontWeight: '700', color: '#D80621', marginTop: 4 },
});

export default Checkout
