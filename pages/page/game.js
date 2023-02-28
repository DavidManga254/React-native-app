import { View } from "react-native";
import { Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { useState,useEffect } from "react";
import { gameDetails } from "../../functions/fetchers";
import { Image } from "react-native";
import { formatDate } from "../../functions/date";
import * as Progress from 'react-native-progress'
import YoutubePlayer from "react-native-youtube-iframe";
import {Card} from "react-native-paper";
import { useRef } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { iconMaker } from "../../functions/icons";
import { storeData } from "../../functions/storefile";
import { getData } from "../../functions/storefile";
import { ImageBackground } from "react-native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { futureformatDate } from "../../functions/date";
import CountdownTimer from "../../components/countdown";

const styles = StyleSheet.create({
    parentag:{
        backgroundColor:'rgba(0,0,0,.65)',
        position:'relative'
    },
    cover2:{
        width:'100%',
        aspectRatio:2.5,
        resizeMode:'stretch',
        backgroundColor:'blue',
        padding:0,
        position:'absolute'
    },
    parenimage:{
        width:'100%'
    },
    content:{
        width:'100%',
        paddingLeft:'2.5%',
        paddingRight:'1.5%',
        paddingTop:'14%'
    },
    profileImage:{
        width:'45%',
        aspectRatio:.8,
        resizeMode:'stretch',
        backgroundColor:'blue',
        padding:0
    },
    companyView:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    companyButton:{
        marginBottom:'2%',
        color:'white'
    },
    platform:{
        color:'rgb(255,49,98)',
    },
    platformicon:{
        marginRight:'10%'
    },
    rating:{
        flexDirection:'row',
        position:'relative'
    },
    circle:{
        position:'absolute',
        bottom:0,
        marginLeft:'4%',
    },
    circle2:{
        position:'absolute',
        bottom:'10%',
        marginLeft:'42%',
        color:'white'
    },
    star:{
        position:'absolute',
        bottom:'35%',
        marginLeft:'5%',
        color:'white'
    },
    progress:{
        width:'50%'
    },
    screenshot:{
        width:'100%',
        aspectRatio:1.5,
        resizeMode:'stretch'
    },
    media:{
        width:'100%',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    media2:{
        width:'49%',
        marginRight:'1%',
        marginBottom:'3%'
    },
    youtube:{
        width:'100%',
        height:400
    },
    media3:{
        width:'100%',
        marginBottom:'3%'
        
    },
    card:{
        width:'30%',
        marginTop:'3%',
        marginLeft:'2%',
        backgroundColor:'#202136'
    },
    parentcard:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:'5%'
    },
    cover:{
        borderBottomLeftRadius:0,
        backgroundColor:'#202136',
        width:'100%',
        aspectRatio:16/21,
        resizeMode:'stretch'
    },
    text:{
        color:'white',
        marginBottom:'2%'
    },
    title:{
        color:'#caa538',
        fontSize:20,
        marginTop:'2%',
        marginBottom:'2%'
    },
    minititle:{
        fontSize:15,
        color:'#caa538'
    },
    snackbar:{
        backgroundColor:'blue',
        position:'absolute',
        height:'40%',
        zIndex:2
    },
    loading:{
        flex:1,
        backgroundColor:'black',
        alignContent:'center',
        justifyContent:'center'
    }
})
export function GameData({route,navigation}){
    //store the game details
    const [game,setGame] = useState(null);

    //snackbar state
    const [visible,setVisibility] = useState(false)

    //activity indicator
    const [isLoading,setLoading] = useState(true);
    //take game slug
    const {slug} = route.params;


    //function to store favorites
    async function storefav(gameobject){
        try{

            //get the data from async storage
            var gamelist = await getData('favlist');
            //push the current object into the array
            if(Array.isArray(gamelist)=== true){
                if(gamelist.includes(gameobject)){
                    gamelist = gamelist
                }else{
                    gamelist = [...gamelist,gameobject]
                }
                
            }
            //new list
            storeData('favlist',gamelist);
        }catch(error){
            console.log('error adding favorite',error)
        }
    }

    //scrollview reference
    const scrollviewTop = useRef()
    //navigator
    function getGame(slug){
        setLoading(true)
        navigation.navigate('gameDetails',{
            slug:slug,
            key:slug
        });
    }
    //fetch game details
    useEffect(()=>{
        gameDetails(slug).then((response)=>{
            setLoading(true)
            setGame(response);
            //scrollviewTop.current.scrollTo({ x: 0, y: 0, animated: true });
            setLoading(false)
        })
    },[slug]);

    if (isLoading === true){
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={60} animating={true} color={MD2Colors.red800} />
            </View>
            
        )
    }else{
        if(game !== null){
        
            return(
                <ImageBackground
                source={game.cover?{uri:'https:'+game.cover.url.replace('thumb','1080p')}:null}
                style={styles.backgroundImage}
        >
            <ScrollView style={styles.parentag} ref={scrollviewTop}>
                    <View styles={styles.parenimage}>
                    
                        <Image  style={styles.cover2} source={{uri:game.screenshots?'https:'+game.screenshots[(Math.floor(Math.random() * ((game.screenshots.length - 1) -  + 1)) + 0)].url.replace('thumb','1080p'):null}}/>
                    
                    <View style={styles.content} >
                        <View style={styles.rating}>
                            {
                                game.cover.url && <Image  style={styles.profileImage} source={game.cover?{uri:'https:'+game.cover.url.replace('thumb','1080p')}:null}/>
                            }
                            
                            <View style={styles.progress}>
                            <MaterialCommunityIcons onPress={()=>storefav({name:game.name,cover:'https:'+game.cover.url.replace('thumb','1080p'),slug:slug})} style={styles.star} name="star" size={14} color="black">Add to favorites</MaterialCommunityIcons>
                                <Progress.Circle
                                    style={styles.circle}
                                    size={70} 
                                    animated={true} 
                                    color={'#caa538'}
                                    thickness={5}
                                    progress={(Math.floor(parseInt(game.rating?game.rating:0)))/100}
                                    showsText={true}/>
                                <Text style={styles.circle2}>Rated by {game.rating_count?game.rating_count:0} players</Text>
                            </View>
                        </View>
                        
                        <Text style={styles.title}>
                            {
                                game.name.toUpperCase()
                            }
                        </Text>
                        <Text style={styles.minititle}>
                            RELEASE DATE: 
                        </Text><Text style={styles.text} >{ (Math.floor(Date.now() / 1000)) < game.first_release_date? futureformatDate(game.first_release_date): formatDate(game.first_release_date)}</Text>
                        <Text>
                            {
                                (Math.floor(Date.now() / 1000)) < game.first_release_date?<CountdownTimer futureTimestamp={game.first_release_date} />:null
                            }
                        </Text>
                        <View style={styles.companyView}>
                            {
                                game.involved_companies
                                ?
                                game.involved_companies.map((company,index)=>{
                                    if(index<3){
                                        return(
                                            <Text key={company.company.id} style={styles.companyButton}>
                                                {company.company.name}, </Text>
                                        )
                                    }
                                    
                                }):null
                            }
                        </View>
                        <View>
                        <Text style={styles.minititle}>
                            PLATFORMS:{
                                game.platforms.map((platform)=>{
                                    return(
                                        <MaterialCommunityIcons style={styles.platformicon} key={platform.id} name={iconMaker(platform.name)} size={24} color="rgb(255,49,98)" />
                                    )
                                })
                            }
                        </Text>
                        <Text style={styles.minititle}>
                            GENRES:{
                                game.genres.map((platform)=>{
                                    return(
                                        <Text  style={styles.platform} key={platform.id}> {platform.name},</Text>
    
                                    )
                                })
                            }
                        </Text>
                        <Text style={styles.minititle}>
                            STORYLINE
                        </Text>
                        <Text style={styles.text}>
                            {game.storyline?game.storyline:'Data Not Available'}
                        </Text>
                        <Text style={styles.minititle}>
                            SCREENSHOTS
                        </Text>
                        <View style={styles.media} >
                            {
                                game.screenshots?game.screenshots.map((image,index)=>{
                                    if(index < 4){
                                        return(
                                            <View style={styles.media2}  key={image.id}>
                                                <Image style={styles.screenshot}  source={{uri:'https:'+image.url.replace('thumb','1080p')}}/>
                                            </View>
                                            
                                        )
                                    }
                                    
                                }):null
                            }
                        </View>
                        <View style={styles.parenimage} >
                            {
                                game.videos?game.videos.map((video,index)=>{
                                    if(index<4){
                                        return(
                                            <View style={styles.media3}  key={video.id}>
                                                <YoutubePlayer
                                                    style={styles.youtube}
                                                    height={215}
                                                    play={false}
                                                    videoId={video.video_id}
                                                    webViewStyle={ {opacity:0.99}}
                                                />
                                            </View>
                                            
                                        )
                                    }
                                    
                                }):null
                            }
                        </View>
                        <Text style={styles.minititle}>
                            SIMILAR GAMES
                        </Text>
                        <View style={styles.parentcard}>
                                    {
                                        game.similar_games?game.similar_games.map((game,index)=>{
                                            if(game.cover !== undefined && index<9){
                                                return(
                                                    <Card onPress={()=>{getGame(game.slug)}} elevation={5} style={styles.card} key={game.id}>
                                                        <Image style={styles.cover}   source={{uri:'https:'+game.cover.url.replace('thumb','1080p')}}/>
                                                    </Card>
                                            )
                                            }
                                            
                                        }):null
                                    }
                                </View>
                            </View>
                        </View>
                                </View>
                                
                                </ScrollView>
        </ImageBackground>
                
                
            )
        }
    }
    
    
}