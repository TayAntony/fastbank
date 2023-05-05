import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'

import { BlurView } from '@react-native-community/blur';

import Login from './pages/login'
import Cadastro from './pages/cadastro'
import Inicio from './pages/inicio'
import Home from './pages/home'
import Carteira from "./pages/carteira";
import Notificacoes from "./pages/notificacoes";
import Perfil from "./pages/perfil";

const Tab = createBottomTabNavigator()
const Nav = createStackNavigator()

function NavBar() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    backfaceVisibility: 'black',
                    borderTopColor: 'white',
                    paddingBottom: 10,
                    paddingTop: 0,
                    height: 70
                },
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'black',
            }}
            
        >
            <Tab.Screen
                name="Home"
                component={Home}

                options={{
                    headerShown: false, tabBarIcon: ({ size, color, focused }) => { return <FontAwesome name="home" size={36} color={ focused? "black" : "red"} /> },

                }}
            />

            <Tab.Screen
                    name="Carteira"
                    component={Carteira}
                    
                    options={{ 
                        headerShown: false, tabBarIcon: ({size, color}) => {return  <FontAwesome5 name="wallet" size={24} color="black" />},   
                }}
                /> 

            <Tab.Screen
                name="Notificações"
                component={Notificacoes}
                
                options={{ 
                    headerShown: false, tabBarIcon: ({size, color}) => {return  <Ionicons name="notifications" size={32} color="black" />},   
                }}
                />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                
                options={{ 
                    headerShown: false, tabBarIcon: ({size, color}) => {return  <FontAwesome name="user-circle-o" size={30} color="black" />},   
                }}
                /> 
        </Tab.Navigator>
    )

}

export default function Routers({ navigation }) {
    return (
        <NavigationContainer>
            <Nav.Navigator
            initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                }}>
                    <Nav.Screen 
                    name="Home"
                    component={NavBar}
                    options={{ title: false, headerShown: false }}
                    />

                <Nav.Screen
                    name="Inicio"
                    component={Inicio}
                    options={{ title: false, headerShown: false }}
                />

                <Nav.Screen
                    name="Login"
                    component={Login}
                />

                <Nav.Screen
                    name="Cadastro"
                    component={Cadastro}
                />
                
            </Nav.Navigator>
        </NavigationContainer>
    )
}