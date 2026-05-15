import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import {Colors, Images} from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import {PropertyService} from '../../services';
import {imageUrl} from '../../services/api';

const CITIES = ['Montreal', 'Toronto', 'Vancouver', 'Edmonton', 'Ottawa'];
const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Condo',
  'Townhouse',
  'Studio',
  'Loft',
  'Duplex',
  'Room',
];

function SearchScreenMain({navigation}) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const debounceRef = React.useRef(null);

  const [selectedCity, setSelectedCity] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [minBedrooms, setMinBedrooms] = React.useState('');
  const [propertyType, setPropertyType] = React.useState('');

  const buildParams = (text, city, mPrice, xPrice, beds, pType) => {
    const p = [];
    if (text?.trim()) {
      p.push(`search=${encodeURIComponent(text.trim())}`);
    }
    if (city) {
      p.push(`city=${encodeURIComponent(city)}`);
    }
    if (mPrice) {
      p.push(`min_price=${mPrice}`);
    }
    if (xPrice) {
      p.push(`max_price=${xPrice}`);
    }
    if (beds) {
      p.push(`min_bedrooms=${beds}`);
    }
    if (pType) {
      p.push(`property_type=${encodeURIComponent(pType)}`);
    }
    return p.length ? p.join('&') : '';
  };

  const doSearch = async (text, city, mPrice, xPrice, beds, pType) => {
    const params = buildParams(text, city, mPrice, xPrice, beds, pType);
    if (!params) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setLoading(true);
    setHasSearched(true);
    try {
      const res = await PropertyService.list(params);
      const list = res?.data?.data || res?.data || [];
      setResults(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleTextChange = text => {
    setQuery(text);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      doSearch(
        text,
        selectedCity,
        minPrice,
        maxPrice,
        minBedrooms,
        propertyType,
      );
    }, 500);
  };

  const handleCityPress = city => {
    const next = selectedCity === city ? '' : city;
    setSelectedCity(next);
    doSearch(query, next, minPrice, maxPrice, minBedrooms, propertyType);
  };

  const applyFilters = () => {
    setShowFilters(false);
    doSearch(
      query,
      selectedCity,
      minPrice,
      maxPrice,
      minBedrooms,
      propertyType,
    );
  };

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms('');
    setPropertyType('');
    setShowFilters(false);
    doSearch(query, selectedCity, '', '', '', '');
  };

  const activeFilterCount = [
    minPrice,
    maxPrice,
    minBedrooms,
    propertyType,
  ].filter(Boolean).length;

  const renderItem = ({item}) => {
    const imgPath =
      item?.property_images?.[0]?.image_url ||
      item?.property_images?.[0]?.original;
    const imgSrc = imgPath
      ? {uri: imgPath.startsWith('http') ? imgPath : imageUrl(imgPath)}
      : Images.SliderHomeHouseImageOne;
    return (
      <TouchableOpacity
        style={sStyles.card}
        onPress={() => navigation.navigate('PopularDetails', {item})}>
        <Image source={imgSrc} style={sStyles.cardImg} resizeMode="cover" />
        <View style={sStyles.cardBody}>
          <Text style={sStyles.cardTitle} numberOfLines={1}>
            {item.title || 'Property'}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 2}}>
            <Icon name="map-pin" size={12} color="#999" />
            <Text style={sStyles.cardSub} numberOfLines={1}>
              {' '}
              {[item.city, item.state].filter(Boolean).join(', ')}
            </Text>
          </View>
          {item.set_your_price ? (
            <Text style={sStyles.cardPrice}>
              ${Number(item.set_your_price).toLocaleString()} / month
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={sStyles.container}>
      {/* Header */}
      <View style={sStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 8}}>
          <Icon name="arrow-left" size={22} color="#000" />
        </TouchableOpacity>
        <View style={sStyles.searchBox}>
          <Icon name="search" size={16} color="#999" />
          <TextInput
            style={sStyles.searchInput}
            value={query}
            onChangeText={handleTextChange}
            placeholder="Search properties, cities..."
            autoFocus
            placeholderTextColor="#aaa"
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setQuery('');
                setResults([]);
                setHasSearched(false);
              }}>
              <Icon name="x" size={16} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => setShowFilters(true)}
          style={sStyles.filterBtn}>
          <Icon
            name="sliders"
            size={18}
            color={activeFilterCount > 0 ? Colors.primary : '#555'}
          />
          {activeFilterCount > 0 && (
            <View style={sStyles.filterBadge}>
              <Text style={{color: '#fff', fontSize: 10}}>
                {activeFilterCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* City chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={sStyles.chipRow}
        contentContainerStyle={{paddingHorizontal: 12}}>
        {CITIES.map(city => (
          <TouchableOpacity
            key={city}
            onPress={() => handleCityPress(city)}
            style={[sStyles.chip, selectedCity === city && sStyles.chipActive]}>
            <Text
              style={[
                sStyles.chipText,
                selectedCity === city && sStyles.chipTextActive,
              ]}>
              {city}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={{marginTop: 40}}
        />
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
          contentContainerStyle={{padding: 12, paddingBottom: 30}}
          ListEmptyComponent={
            <View style={{alignItems: 'center', marginTop: 60}}>
              <Icon
                name={hasSearched ? 'search' : 'compass'}
                size={48}
                color="#ddd"
              />
              <Text style={{fontSize: 15, color: '#999', marginTop: 12}}>
                {hasSearched
                  ? 'No results found'
                  : 'Search for properties or cities'}
              </Text>
            </View>
          }
        />
      )}

      {/* Filter modal */}
      <Modal visible={showFilters} animationType="slide" transparent>
        <Pressable
          style={sStyles.modalOverlay}
          onPress={() => setShowFilters(false)}
        />
        <View style={sStyles.modalSheet}>
          <View style={sStyles.modalHandle} />
          <Text style={sStyles.modalTitle}>Filters</Text>

          <Text style={sStyles.filterLabel}>Price range ($ / month)</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            <TextInput
              style={[sStyles.filterInput, {flex: 1}]}
              placeholder="Min"
              keyboardType="numeric"
              value={minPrice}
              onChangeText={setMinPrice}
            />
            <TextInput
              style={[sStyles.filterInput, {flex: 1}]}
              placeholder="Max"
              keyboardType="numeric"
              value={maxPrice}
              onChangeText={setMaxPrice}
            />
          </View>

          <Text style={sStyles.filterLabel}>Min bedrooms</Text>
          <TextInput
            style={sStyles.filterInput}
            placeholder="e.g. 2"
            keyboardType="numeric"
            value={minBedrooms}
            onChangeText={setMinBedrooms}
          />

          <Text style={sStyles.filterLabel}>Property type</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 16}}>
            {PROPERTY_TYPES.map(t => (
              <TouchableOpacity
                key={t}
                onPress={() => setPropertyType(propertyType === t ? '' : t)}
                style={[
                  sStyles.chip,
                  propertyType === t && sStyles.chipActive,
                  {marginRight: 8},
                ]}>
                <Text
                  style={[
                    sStyles.chipText,
                    propertyType === t && sStyles.chipTextActive,
                  ]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity
              style={[sStyles.applyBtn, {backgroundColor: '#f0f0f0', flex: 1}]}
              onPress={resetFilters}>
              <Text style={{color: '#333', fontWeight: '600'}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[sStyles.applyBtn, {flex: 2}]}
              onPress={applyFilters}>
              <Text style={{color: '#fff', fontWeight: '600'}}>
                Apply filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const sStyles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    marginHorizontal: 8,
    gap: 6,
  },
  searchInput: {flex: 1, fontSize: 14, color: '#000'},
  filterBtn: {padding: 8, position: 'relative'},
  filterBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    maxHeight: 52,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  chipActive: {backgroundColor: Colors.primary, borderColor: Colors.primary},
  chipText: {fontSize: 13, color: '#555'},
  chipTextActive: {color: '#fff', fontWeight: '600'},
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  cardImg: {width: 100, height: 90},
  cardBody: {flex: 1, padding: 10, justifyContent: 'center'},
  cardTitle: {fontSize: 14, fontWeight: '700', color: '#111'},
  cardSub: {fontSize: 12, color: '#888', flex: 1},
  cardPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 4,
  },
  modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'},
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {fontSize: 18, fontWeight: '700', marginBottom: 16},
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 8,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 4,
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
});

export default SearchScreenMain;
