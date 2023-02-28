import { View,Image } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Card,Text} from "react-native-paper";
import { SafeAreaView } from "react-native";
import { getData } from "../functions/storefile";
import { createStackNavigator } from "@react-navigation/stack";
import { GameData } from "../pages/page/game";
import { useIsFocused } from "@react-navigation/native";


const Stack = createStackNavigator()
//stylesheet 
const styles = StyleSheet.create({
    card:{
        width:'31%',
        marginTop:'3%',
        marginLeft:'1.5%',
        backgroundColor:'#202136',
    },
    parentcard:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:'5%'
    },
    content:{
        marginTop:'3%'
    },
    cover:{
        width:'100%',
        aspectRatio:16/24,
        resizeMode:'stretch',
        borderBottomLeftRadius:0,
        backgroundColor:'#202136'
    },
    major:{
        backgroundColor:'black',
        flex:1
    },
    text:{
        color:'#caa538'
    },
    loading:{
        flex:1,
        backgroundColor:'black',
        alignContent:'center',
        justifyContent:'center'
    }
})

export function Favoritess({route,navigation}){
    // variable to hold list of games
    const [games,setGames] = useState ([]);

    const [forceUpdate, setForceUpdate] = useState(false);
    const isFocused = useIsFocused();

    async function getFavs(){
        var list = await getData('favlist')
        setGames(list)
    }
    //set the games when the component mounts with an empty dependancy
    useEffect(()=>{
        getFavs();
        if (isFocused) {
            setForceUpdate((prev) => !prev);
          }
        
    },[isFocused]);

    function getGame(slug){
        navigation.navigate('favoritesdetails',{
            slug:slug,
            key:slug
        });
    }
    if(games.length>0){
        
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={styles.major}>
                <Text style={styles.text}>FAVORITE GAMES</Text>
                <ScrollView>
                <View style={styles.parentcard}>
                    {
                        games.map((game)=>{
                            if(game.cover === undefined){
                                return null
                            }else{
                                return(
                                    <Card onPress={()=>getGame(game.slug)} elevation={5} style={styles.card} key={game.name}>
                                        
                                            <Image style={styles.cover} source={{uri:game.cover?game.cover:null}} />
                                    
                                        
                                    </Card>
                                )
                            }
                            
                        })
                    }
                </View>
            </ScrollView>
            </View>
            </SafeAreaView>
        )
    }
    
    
}


//stack screens for favourites

export function Favorites({route,navigation}){
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} component={Favoritess} name='favoriteslist'/>
            <Stack.Screen options={{headerShown:false}} component={GameData} name='favoritesdetails'/>
        </Stack.Navigator>
    )
}