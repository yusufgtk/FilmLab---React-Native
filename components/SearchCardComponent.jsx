import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function SearchCardComponent({ movie }) {
    const imgUri = movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3mdZeqdj67F9dysANqIr3w5etvUgvA1u1tw&s';
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetailsScreen', {id: movie.id})}>
            <View style={styles.container}>
                <View>
                    <Image style={styles.movieImage} source={{uri: imgUri}} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.movieTitle}>{ movie.title }</Text>
                    <Text style={styles.span}>{ movie.original_language }</Text>
                    <Text style={styles.span2}>{ movie.vote_average }</Text>
                    <Text style={styles.textStyle}>{ movie.release_date }</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        flexDirection: 'row',
        marginBottom: 20
    },
    movieImage:{
        width: 150,
        height: 150,
        objectFit: 'cover',
        
    },
    movieTitle:{
        fontSize: 15,
        color: 'white',
        fontWeight: '600',
        marginBottom: 5,
        textAlign: 'left',
        width: 200
    },
    span:{
        backgroundColor: 'red', 
        color: 'white', 
        fontSize: 12,
        alignSelf: 'baseline',
        padding: 4,
        borderRadius: 5,
        marginBottom: 5
    },
    span2:{
        backgroundColor: 'yellow', 
        color: 'black', 
        fontSize: 12,
        alignSelf: 'baseline',
        padding: 4,
        borderRadius: 5,
        marginBottom: 5
    },
    content:{
        paddingHorizontal: 10
    },
    textStyle:{
        color:'white',
        fontSize: 12,
        marginBottom: 5
    }
})