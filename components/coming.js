import { View } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Card,Text} from "react-native-paper";
import { SafeAreaView } from "react-native";
import { getData } from "../functions/storefile";
import { comingSoon } from "../functions/fetchers";
import { createStackNavigator } from "@react-navigation/stack";
import { GameData } from "../pages/page/game";
import { Image } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Stack = createStackNavigator();


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
        backgroundColor:'#202136',
        flex:1
    },
    text:{
        color:'white'
    },
    loading:{
        flex:1,
        backgroundColor:'black',
        alignContent:'center',
        justifyContent:'center'
    }
})

export function Comingsoon({route,navigation}){
    // variable to hold list of games
    const [games,setGames] = useState ([]);

    //activity indicator
    const [isLoading,setLoading] = useState(true);

    
    //set the games when the component mounts with an empty dependancy
    useEffect(()=>{
        comingSoon().then((response)=>{
            setGames(response);
        })
        setLoading(false)
        
    },[]);

    function getGame(slug){
        navigation.navigate('comingsoondetails',{
            slug:slug,
            key:slug
        });
    }

    if (isLoading === true){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={60} animating={true} color={MD2Colors.red800} />
            </View>
            
        )
    }else{
        if(games.length>0){
        
            return(
                <SafeAreaView style={{flex:1}}>
                    <View style={styles.major}>
                    <Text style={styles.text}>Coming Soon</Text>
                    <ScrollView>
                        <View style={styles.parentcard}>
                            {
                                games.map((game,index)=>{
                                    if(game.cover === undefined){
                                        return null;
                                    }
                                    else{
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
                </SafeAreaView>
            )
        }
    }
    
    
    
}

export function ComingSoon({route,navigation}){
    return(
        <Stack.Navigator>

            <Stack.Screen options={{headerShown:false}} component={Comingsoon} name='coming'/>
            <Stack.Screen options={{headerShown:false}} component={GameData} name='comingsoondetails'/>
    
        </Stack.Navigator>
    )
}