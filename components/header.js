import { View,Text,Pressable,Image} from "react-native";
import { StyleSheet } from "react-native";
import { vw } from "react-native-expo-viewport-units";
import { Appbar } from "react-native-paper";
import { Drawer } from "react-native-paper";
//stylesheet
const styles = StyleSheet.create({
    head:{
        backgroundColor :"#202136",
        flexDirection:'row',
        justifyContent:'space-between'
    },
    parentView:{
        flex:1,
        flexDirection:'row'
    },
    parentView2:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    leftpress:{
        width:'20%',
        marginRight:'10%'
    },
    image:{
        width:'100%',
    }


    
})

//header of the app
 export function AppHeader(){
    return(
        <Appbar mode="small">
            <Appbar.BackAction onPress={() => {}} />
            <Appbar.Content />
            <Appbar.Action icon="magnify" onPress={() => {}}  />
            <Appbar.Action icon="home" onPress={() => {}}  />

        </Appbar>
    )
    
 }