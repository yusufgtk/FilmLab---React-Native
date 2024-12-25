import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MovieContext from '../context/MovieContext';
import SearchListComponent from '../components/SearchListComponent';

export default function SearchScreen({ route }) {
    const searchText = route.params.searchText;
    const { searchMovies, getSearchMoviesByKeyword } = useContext(MovieContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSearchMoviesByKeyword(searchText);
    }, [searchText]);

    useEffect(() => {
        if (searchMovies && searchMovies.length > 0) {
            setLoading(false);
        } else {
            setLoading(false); 
        }
        // console.log(`reducer: ${searchMovies}`);
    }, [searchMovies]); 

    const loadMoreItems = () => {
        console.log('Load more items');
        getSearchMoviesByKeyword(searchText);
    }

    if (loading) {
        return <Text>Loading...</Text>; 
    }

    return (
        <View style={styles.container}>

            <SearchListComponent movies={searchMovies} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'black',
        padding: 5
    },
    
})