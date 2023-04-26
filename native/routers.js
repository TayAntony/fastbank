import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Entypo, FontAwesome, Feather} from '@expo/vector-icons'
import Login from './pages/login'
import Cadastro from './pages/cadastro'
import Inicio from './pages/inicio'
import Home from './pages/home'
import BotaoLogin from "./components/botaoLogin";

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()
const Nav = createStackNavigator()

export default function Routers() {
    return (
        <NavigationContainer>
            <Nav.Navigator
            screenOptions={{
                tabBarStyle:{
                    backgroundColor: 'black',
                    backfaceVisibility: 'black',
                    borderTopColor: 'grey',
                    paddingBottom: 3,
                    paddingTop: 3
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'grey'
            }}
            >

            <Nav.Screen
                    name="Inicio"
                    component={Inicio} 
    
                    options={{ headerShown: false, tabBarIcon: ({size, color}) => {return  <AntDesign name="login" size={24} color="white" />},
                    tabBarStyle: {display: 'none'}
                }}
                />

                
                <Nav.Screen
                    name="Login"
                    component={Login} 
    
                    options={{ headerShown: false, tabBarIcon: ({size, color}) => {return  <AntDesign name="login" size={24} color="white" />},
                    tabBarStyle: {display: 'none'}
                }}
                />

                <Nav.Screen
                    name="Cadastro"
                    component={Cadastro} 
    
                    options={{ headerShown: false, tabBarIcon: ({size, color}) => {return  <AntDesign name="user" size={24} color="white" />},
                    tabBarStyle: {display: 'none'}
                }}
                />

                <Nav.Screen
                    name="Home"
                    component={Home}
                    
                    options={{ headerShown: false, tabBarIcon: ({size, color}) => {return  <FontAwesome name="home" size={24} color="white" />},
                        
                }}
                /> 
                
                <Nav.Screen
                    name="BotaoLogin"
                    component={BotaoLogin}
                    
                    options={{ headerShown: false, tabBarIcon: ({size, color}) => {return  <FontAwesome name="home" size={24} color="white" />},
                        
                }}
                /> 

            </Nav.Navigator>
        </NavigationContainer>
    )
    
}