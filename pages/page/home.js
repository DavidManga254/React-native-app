import { View } from "react-native";
import { popularAndTrending } from "../../functions/fetchers";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Card,Text} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { GameData } from "./game";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
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

const Stack = createStackNavigator()

export function Home({route,navigation}){
    // variable to hold list of games
    const [games,setGames] = useState ([]);

    //activity indicator
    const [isLoading,setLoading] = useState(true);

    //set the games when the component mounts with an empty dependancy
    useEffect(()=>{
        popularAndTrending().then((response)=>{
            setGames(response);
        })
        setLoading(false)
    },[]);

    function getGame(slug){
        navigation.navigate('gameDetails',{
            slug:slug
        });
    }
    
    if (isLoading === true){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={60} animating={true} color={MD2Colors.red800} />
            </View>
            
        )
    }else{
        return(
            <View style={styles.major}>
            <Text style={styles.text}>BEST SELLERS</Text>
            <ScrollView>
                <View style={styles.parentcard}>
                    {
                        games.map((game)=>{
                            if(game.cover === undefined){
                                return null
                            }else{
                                return(
                                    <Card onPress={()=>getGame(game.slug)} elevation={5} style={styles.card} key={game.id}>
                                        
                                            <Image style={styles.cover} source={game.cover?{uri:'https:'+game.cover.url.replace('thumb','1080p')}:null} />
                                    
                                        
                                    </Card>
                                )
                            }
                            
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
    }
    
}

export function Home2({route,navigation}){
    return(
        <Stack.Navigator>
            <Stack.Screen options={{headerShown:false}} component={Home} name='homepage'/>
            <Stack.Screen options={{headerShown:false}} component={GameData} name = 'gameDetails'/>
        </Stack.Navigator>
    )
}