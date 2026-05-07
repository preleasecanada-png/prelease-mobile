import * as React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import { PropertyService } from '../../services';

function SearchScreenMain({ navigation }) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const debounceRef = React.useRef(null);

  const handleSearch = async (text) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!text.trim()) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await PropertyService.search(text.trim());
        const list = res?.data?.data || res?.data || [];
        setResults(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }, 500);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={sStyles.resultCard}
      onPress={() => navigation.navigate('PopularDetails', { item })}
    >
      <View style={sStyles.iconWrap}>
        <Icon name="map-pin" size={18} color={Colors.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={sStyles.title} numberOfLines={1}>{item.title || 'Property'}</Text>
        <Text style={sStyles.subtitle} numberOfLines={1}>
          {[item.address, item.city].filter(Boolean).join(', ')}
        </Text>
        {item.price && (
          <Text style={sStyles.price}>${Number(item.price).toLocaleString()} / month</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={sStyles.container}>
      <View style={sStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
          <Icon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <View style={sStyles.searchBox}>
          <Icon name="search" size={18} color="#999" style={{ marginRight: 8 }} />
          <TextInput
            style={sStyles.searchInput}
            value={query}
            onChangeText={handleSearch}
            placeholder="Search properties, cities..."
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); setResults([]); }}>
              <Icon name="x" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={
            query.length > 0 ? (
              <View style={{ alignItems: 'center', marginTop: 60 }}>
                <Icon name="search" size={48} color="#ccc" />
                <Text style={{ fontSize: 15, color: '#999', marginTop: 12 }}>No results found</Text>
              </View>
            ) : (
              <View style={{ alignItems: 'center', marginTop: 60 }}>
                <Icon name="compass" size={48} color="#ccc" />
                <Text style={{ fontSize: 15, color: '#999', marginTop: 12 }}>Search for properties or cities</Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
}

const sStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 50, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 10, paddingHorizontal: 12, height: 42, marginLeft: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#000' },
  resultCard: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  iconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fef2f2', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  title: { fontSize: 15, fontWeight: '600', color: '#000' },
  subtitle: { fontSize: 13, color: '#666', marginTop: 2 },
  price: { fontSize: 13, fontWeight: '600', color: '#D80621', marginTop: 2 },
});

export default SearchScreenMain;
