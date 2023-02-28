import { View } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Card,Text} from "react-native-paper";
import { Image } from "react-native";
import { search } from "../../functions/fetchers";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

//stylesheet 
const styles = StyleSheet.create({
    card:{
        width:'31%',
        marginTop:'3%',
        marginLeft:'1.5%',
        backgroundColor:'black',
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
        color:'white'
    },
    loading:{
        flex:1,
        backgroundColor:'black',
        alignContent:'center',
        justifyContent:'center'
    },
    loading:{
        flex:1,
        backgroundColor:'black',
        alignContent:'center',
        justifyContent:'center'
    }
})

export function Displayer({route,navigation}){
    // variable to hold list of games
    const [games,setGames] = useState ([]);

     //activity indicator
     const [isLoading,setLoading] = useState(true);

    const{name} = route.params;
    //set the games when the component mounts with an empty dependancy
    useEffect(()=>{
        search(name).then((response)=>{
            setGames(response);
        })
        setLoading(false)
    },[]);

    function getGame(slug){
        navigation.navigate('searchresultdetails',{
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
                <View style={styles.major}>
                <Text style={styles.text}>Search results for {name}</Text>
                <ScrollView>
                    <View style={styles.parentcard}>
                        {
                            games.map((game)=>{
                                if (game.cover !== undefined){
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
    
}