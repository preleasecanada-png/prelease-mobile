import { FlatList, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Colors, Fonts } from '../../theme'
import Content from '../../components/Content'
import CommanHeadingScreen from '../../components/CommanHeading'
import CommonSearchInput from '../../components/CommonSearchInput/Index'
import { navigate } from '../../navigation/ReduxNavigation'
import { TouchableOpacity } from 'react-native'
import { AntDesignIcon, OcticonsIcon } from '../../theme/icons'
import { useNavigation } from '@react-navigation/native'
import { PropertyService } from '../../services'

const SearchLocationScreen = ({
    containerStyle,
    focus = true,
    showCard=true,
}) => {
    const navigation = useNavigation()
    const [input, setInput] = React.useState('')
    const [results, setResults] = React.useState([])
    const [searching, setSearching] = React.useState(false)
    const debounceRef = React.useRef(null)

    const handleSearch = (text) => {
        setInput(text)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (!text.trim()) { setResults([]); return; }
        debounceRef.current = setTimeout(async () => {
            setSearching(true)
            try {
                const res = await PropertyService.search(text.trim())
                const list = res?.data?.data || res?.data || []
                setResults(Array.isArray(list) ? list : [])
            } catch (e) { console.error(e); }
            setSearching(false)
        }, 500)
    }

    const onCategoryClick = (item) => navigation.navigate('PopularDetails', { item })

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onCategoryClick(item)} style={styles.suggestionsList}>
            <View style={styles.iconView}>
                <OcticonsIcon
                    name='location'
                    size={18}
                    color={Colors.black}
                />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.suggestionsSearchText}>{item.title || 'Property'}</Text>
                <Text style={{ fontSize: 12, color: '#999' }}>{[item.address, item.city].filter(Boolean).join(', ')}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
            <View style={[styles.container, showCard && styles.cardContainer ]}>
                <CommonSearchInput
                    searchInputStyle={[styles.searchInputContainerStyle]}
                    placeholder={'Search Destinations'}
                    surfaceStyle={containerStyle}
                    onChangeText={handleSearch}
                    inputStyle={styles.searchInputStyle}
                    focus={true}
                />
                {input.trim().length > 0 && (
                    <View style={styles.searchSuggestions}>
                        <Content style={styles.suggestionsListContainer}>
                            {searching ? (
                                <ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: 20 }} />
                            ) : results.length > 0 ? (
                                <FlatList
                                    data={results}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => String(item.id)}
                                    bounces={false}
                                />
                            ) : (
                                <Text style={{ textAlign: 'center', color: '#999', marginTop: 30, fontSize: 14 }}>No results found</Text>
                            )}
                        </Content>
                    </View>
                )}
            </View>
    )
}


export default SearchLocationScreen

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white,

    },
    cardContainer: {
        marginTop: 20,
        flex: 1,
        borderRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        elevation: 7,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2
        },

    },
    suggestionsListContainer: {
        backgroundColor: Colors.white,
        marginBottom: '-23rem'
    },
    searchSuggestions: {
        width: '100%',
        // paddingHorizontal: '20rem',
        height: '100% - 138rem',
        paddingBottom: '35rem',
        backgroundColor: Colors.white,
    },
    searchInputContainerStyle: {
        marginHorizontal: 'auto',
        width: '100% - 40rem',
        // backgroundColor: Colors.lightGray,
        // marginBottom: '33rem'
    },
    searchInputStyle: {
        backgroundColor: Colors.lightGray,
        // marginBottom: '33rem'
    },
    suggestionsList: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: '15rem',
        marginBottom: '5rem',
        // borderBottomWidth: '2rem',
        borderColor: Colors.white,
        paddingHorizontal: '3rem'
    },
    suggestionsSearchIcon: {
        width: '14rem',
        height: '14rem'
    }, suggestionsSearchText: {
        paddingLeft: '12rem',
        lineHeight: '24rem',
        color: Colors.lightBlackTextOpacity,
        fontSize: Fonts.size.medium,
        ...Fonts.style.normalText
    },
    iconView: {
        padding: 10,
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
    },
    recentSearchesHeading: {
        fontSize: Fonts.size.medium,
        lineHeight: '24rem',
        color: Colors.black,
        marginLeft: '10rem',
        ...Fonts.style.normalText,
    }
})