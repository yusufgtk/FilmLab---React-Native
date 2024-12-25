import { ActivityIndicator, Dimensions, Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MovieContext from '../context/MovieContext'
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MoviesListComponent from '../components/MoviesListComponent';

const { windowWidth, windowHeight } = Dimensions.get('window');
export default function MovieDetailsScreen({ route }) {
    const {id} = route.params;
    const { movieDetails, popularMovies, getMovieById, getPopularMovies, clearMovieDetails } = useContext(MovieContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(id){
            getMovieById(id);
            getPopularMovies();
            setLoading(false);
        }

        return () => clearMovieDetails();
        
    }, []);


    
    const goToLink = (uri) => {
        Linking.openURL(uri).catch((err) => console.log(err));
    }

    if(loading || !movieDetails){
        return(
            <View>
                <ActivityIndicator size='large' color='white'/>
            </View>
        );
    }

    return (
        <ScrollView style={styles.contianer}>
            <StatusBar barStyle='light-content' /> 
            <View style={styles.imageContainer}>
                <Image resizeMode='cover' style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}} />
                <LinearGradient
                colors={[ 'transparent', 'rgba(0, 0, 0, 1)']}
                style={styles.gradient}/>
            </View>
            <View style={styles.movieContent}>
                <View style={{marginBottom: 10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.titleStyle}>{movieDetails.title}</Text>
                    <Text style={[styles.textStyle, {backgroundColor: 'red', padding: 4, borderRadius: 10}]}>{movieDetails.vote_average}</Text>
                </View>
                <View style={{marginBottom: 10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.textStyle}>Süre: {movieDetails.runtime} dk</Text>
                    <Text style={styles.textStyle}>Çıkış: {movieDetails.release_date}</Text>
                </View>
                <View style={{marginBottom: 10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={styles.textStyle}>{movieDetails.overview}</Text>
                </View>
                
                <Text style={styles.textStyle}>Bütçe: {movieDetails.budget} $</Text>
                <Text style={styles.textStyle}>Hasılat: {movieDetails.revenue} $</Text>
                <Text style={styles.textStyle}>Orjinal dil: {movieDetails.original_language}</Text>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <Text style={[styles.textStyle, {marginEnd: 5}]}>Oy Sayısı: {movieDetails.vote_count}</Text>
                    <FontAwesome5 name="users" size={12} color="white" />
                </View>
                <TouchableOpacity onPress={() => goToLink(movieDetails.homepage)}>
                    <Text style={[styles.textStyle, {color:'#81BFDA'}]}>Daha fazlası için: {movieDetails.homepage}</Text>
                </TouchableOpacity>
                
                <View style={{marginVertical: 10, flexDirection: 'row', }}>
                    <Text style={styles.textStyle}>Türler: </Text>
                    {movieDetails.genres && movieDetails.genres.map((item) => (
                        <View key={item.id}>
                            <Text style={[styles.textStyle]}>{item.name}, </Text>
                        </View>
                    ))}
                </View>
                
            </View>

            <View style={{marginVertical: 15}}>
                <MoviesListComponent movies={popularMovies} title={'Popüler Filmler'}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    contianer: {
        flex:1,
        width: '100%',
        backgroundColor: 'black',

    },
    imageContainer:{
        position: 'relative',
        width: windowWidth,
        height: 450, // Genişliğin yarısı kadar yükseklik
    },  
    gradient:{
        position: 'absolute',
        bottom:0,
        width: '100%',
        height: '50%'
    },
    titleStyle:{
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    textStyle:{
        color: 'white',
        fontSize: 15,
        fontWeight: '400'
    },
    smallTextStyle:{
        color: 'white',
        fontSize: 12,
        fontWeight: '400'
    },
    image:{
        width: windowWidth,
        height: 450,
    },
    movieContent:{
        paddingHorizontal: 15
    }
})