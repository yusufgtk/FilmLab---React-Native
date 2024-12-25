import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
export default function SliderComponent({ movies }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [tempIndex, setTempIndex] = useState(false);
    const flatListRef = useRef(null);
    const navigation = useNavigation();
    useEffect(() => {
        const intervalId = setInterval(() => {
            var index = currentIndex;
            if(index >= movies.length-1) {
                index = 0;
            }else{
                index++;
            }
            setCurrentIndex(index);
        }, 3000);

        return () => clearInterval(intervalId); //dispose()
    }, [tempIndex]);

    useEffect(() => {
        if(movies.length > 0){
            if(flatListRef.current){
                flatListRef.current.scrollToIndex({index: currentIndex, animated: true});
                if(tempIndex){
                    setTempIndex(false);
                }else{
                    setTempIndex(true);
                }
            }
        }
        
    }, [currentIndex]);

    const goToMovieDetails = (movieId) => {
        navigation.navigate('MovieDetailsScreen', {id: movieId});
    }

    return (
        <View style={styles.container}>
        <FlatList 
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}  // Kaydırma çubuğunu gizler
            pagingEnabled   // Sayfa başına kaydırma yapılmasını sağlar
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => goToMovieDetails(item.id)}>
                    <View style={styles.imageContainer}>
                        <Image 
                            style={styles.image} 
                            source={{uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`}} 
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: 250,
        alignItems: 'center',

    },

    imageContainer:{
        width: windowWidth,
        height: 250,
        
    },
    image:{
        width: '100%',
        height: '100%',
        // borderRadius: 20,
        backgroundColor: 'white',
        resizeMode: 'cover',
        
    }
})