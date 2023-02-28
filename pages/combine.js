import { Home2 } from "./page/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SearchSection } from "./page/search";
import { Profile } from "./page/profile";
import { getData,storeData } from "../functions/storefile";
import { Cartegories } from "./page/cartegories";

async function setFav(){
    var favList = await getData('favlist');
   
    if(favList === null){
        storeData('favlist',[]);
    }
}
setFav();

const Tab = createBottomTabNavigator();
const screenOptions = {
    headerShown:false,
    
}

export function CombinePages(){
    return(
        <NavigationContainer >
            <Tab.Navigator>
                <Tab.Screen options={{
                        headerShown:false,
                        tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" size={24} color="black" />
                        ),
                }} name="Home" component={Home2}  />


                <Tab.Screen options={{
                        headerShown:false,
                        tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" size={24} color="black" />
                        ),
                }} name="Search" component={SearchSection}/>

                <Tab.Screen options={{
                        headerShown:false,
                        tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="view-grid" size={24} color="black" />
                        ),
                }} name="Cartegories" component={Cartegories}/>

                <Tab.Screen options={{
                        headerShown:false,
                        tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" size={24} color="black" />
                        ),
                }} name="Profile" component={Profile}/>

            </Tab.Navigator>
        </NavigationContainer>
        
    )
    
}