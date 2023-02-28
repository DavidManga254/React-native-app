import { View,Text } from "react-native";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Displayer } from "./displayer";
import { GameData } from "./game";

//stylesheet
const styles = StyleSheet.create({
    parentview:{
        width:'100%',
        height:'100%',
        backgroundColor:'black',
        justifyContent:'center'
    },
    searchbar:{
        width:'80%',
        marginLeft:'10%',
    }
})

const Stack = createStackNavigator()


function SearchGame({route,navigation}){
    //value to hold game to be searched
    const [game,setGame] = useState('')

    
    function viewresult(name){
        navigation.navigate('searchresult',{
            name:name
        });
    }
    function handleEndEditing() {
        viewresult(game);
    }

    return(
        <View style={styles.parentview}>
            <View>
                <TextInput
                    onEndEditing={handleEndEditing}
                    style={styles.searchbar}
                    value={game}
                    placeholder={'Search Game'}
                    onChangeText={text => setGame((text))}
                    right={<TextInput.Icon icon='magnify'/> }
                    mode={'flat'}
                />
            </View>
        </View>
        
    )
}

export function SearchSection({route,navigation}){
    return(
            <Stack.Navigator >
                <Stack.Screen options={{headerShown:false}} component={SearchGame} name='Searcher'/>
                <Stack.Screen options={{headerShown:false}} component={Displayer} name='searchresult'/>
                <Stack.Screen options={{headerShown:false}} component={GameData} name='searchresultdetails'/>
            </Stack.Navigator>
    )
}