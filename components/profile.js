import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../pages/page/home";
import { Favorites } from "./favourites";
import { MaterialCommunityIcons } from '@expo/vector-icons';


//the drawer 
const Drawer = createDrawerNavigator();

export function MainProfile(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen options={{headerShown:false,drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards-heart" size={24} color="black" />
          ),}}  name="Favourites" component={Favorites}/>
        </Drawer.Navigator>
    )
}