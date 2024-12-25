import { RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MovieContext from '../context/MovieContext'
import MoviesListComponent from '../components/MoviesListComponent';
import SliderComponent from '../components/SliderComponent';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function HomeScreen({ navigation }) {
    const { popularMovies, newMovies, upcomingMovies, topRatedMovies, turkeyMovies, getPopularMovies, getNewMovies, getUpcomingMovies, getTopRatedMovies, getTurkeyMovies } = useContext(MovieContext);
    const [refreshStatus, setRefreshStatus] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        getPopularMovies();
        getNewMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        getTurkeyMovies();
        // console.log(popularMovies);
    }, []);
    const onRefresh = () => {
        setRefreshStatus(true);
        getPopularMovies();
        getNewMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        getTurkeyMovies();
        setRefreshStatus(false);
    }

    const goToSearchScreen = () => {
        if(!searchText) return;
        navigation.navigate('SearchScreen', {searchText: searchText});
        setSearchText('');
    }
    return (
        <ScrollView style={styles.container}
        refreshControl={<RefreshControl refreshing={refreshStatus} onRefresh={onRefresh} tintColor={'white'}/>}>
            
            <StatusBar barStyle='light-content'/>
            {newMovies ? 
            <SliderComponent movies={newMovies}/> 
            :<Text>Loading...</Text>}

            <View style={styles.searchContainer}>
                <TextInput placeholder='Film ara...' placeholderTextColor='red' style={styles.textInputStyle} value={searchText} onChangeText={(text) => setSearchText(text)} />
                <TouchableOpacity onPress={() => goToSearchScreen()}>
                    <AntDesign name="search1" size={24} color="red" />
                </TouchableOpacity>
            </View>

            {popularMovies.length > 0 ?
            <MoviesListComponent movies={popularMovies} title={'Popüler Filmler'} />
            :<Text>Loading...</Text>}

            {topRatedMovies.length > 0 ?
            <MoviesListComponent movies={topRatedMovies} title={'En Yüksek Puanlı Filmler'} />
            :<Text>Loading...</Text>}

            {upcomingMovies.length > 0 ?
            <MoviesListComponent movies={upcomingMovies} title={'Çok Yakında'} />
            :<Text>Loading...</Text>}

            {turkeyMovies.length > 0 ?
            <MoviesListComponent movies={turkeyMovies} title={'Yerli Filmler'} />
            :<Text>Loading...</Text>}


            
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#000',
    },
    searchContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
        marginBottom: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 20
    },
    textInputStyle:{
        fontSize: 16,
        fontWeight: '500',
        color: 'red',
        flex:1,
        marginEnd: 10
    }
})