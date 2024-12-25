import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function MovieCardComponent({ movie }) {
    const { id, title, backdrop_path, original_language, vote_average} = movie;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MovieDetailsScreen', {id: id})}>
            <View style={styles.container}>
                <Image style={styles.movieImage} source={{uri : `https://image.tmdb.org/t/p/w500${backdrop_path}`}} /> 
                <LinearGradient
                colors={['rgba(219, 211, 211, 0.3)', 'transparent']}
                style={{height: 100}}>
                    <View style={styles.content}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={styles.movieTitle}>{ title.length < 20 ? title : title.substring(0,16)}</Text>
                            <Text style={styles.span}>{ original_language }</Text>
                        </View>
                        <View style={{}}>
                            <Text style={styles.puan}>Puan: { vote_average }</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 150,
        height: 220,
        marginHorizontal: 10,
        borderRadius: 20
    },
    movieImage:{
        width: 150,
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        objectFit: 'cover',
        
    },
    content:{
        margin: 5
    },
    movieTitle:{
        fontSize: 15,
        color: 'white',
        fontWeight: '600',
        width: 115
    },
    span:{
        backgroundColor: 'red', 
        color: 'white', 
        fontSize: 12,
        alignSelf: 'baseline',
        padding: 4,
        borderRadius: 5
    },
    puan:{
        fontSize: 12,
        color: 'white'
    }
})