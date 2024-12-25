import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import MovieCardComponent from './MovieCardComponent';

export default function MoviesListComponent({ movies, title }) {
    useEffect(() => {
        // console.log(movies);
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.title}> { title }</Text>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCardComponent movie={ item }/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 20
    },
    title:{
        fontSize: 20,
        marginLeft: 5,
        marginBottom: 10,
        color: 'white'
    }
})