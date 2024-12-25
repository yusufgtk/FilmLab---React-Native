import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SearchCardComponent from './SearchCardComponent'

export default function SearchListComponent({ movies }) {
    

    useEffect(() => {
        // console.log(`movies: ${ movies }`);
    }, []);

    
    if (!movies || movies.length === 0) {
        return <Text>No movies found</Text>;
    }
    return (
        <View>
            <FlatList
            ListHeaderComponent={<Text style={styles.title}>Arama Sonuçları</Text>}
            // onEndReached={loadMoreItems} // En sona ulaşıldığında tetiklenir
            // onEndReachedThreshold={0.1} // Listenin en altına %10 yaklaşıldığında tetikler
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SearchCardComponent movie={item}/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
        marginVertical: 20,
        alignSelf: 'center'
    }
})