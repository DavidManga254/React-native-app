import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComingSoon } from "../../components/coming";

//the drawer 
const Drawer = createDrawerNavigator();

export function Cartegories(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen options={{headerShown:false}} name="comingsoon" component={ComingSoon}/>
        </Drawer.Navigator>
    )
}