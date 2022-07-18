import React, { useState } from "react";
import { StyleSheet, View , Text , Button} from "react-native";
import { createAppContainer, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppLoading from "expo-app-loading";

import Untitled from "./src/screens/Untitled";
import { color } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from 'react-native-paper'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  UserHistory,
} from './src/screens'
import StatusUpdateScreen from "./src/screens/StatusUpdateScreen";


const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="UserHistory" component={UserHistory} />
          <Stack.Screen name="StatusUpdateScreen" component={StatusUpdateScreen} />
         
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}


// const DrawerNavigation = createDrawerNavigator({ Untitled: Untitled });

// const StackNavigation = createStackNavigator(
//   {
//     DrawerNavigation: {
//       screen: DrawerNavigation
//     },
//     Untitled: Untitled
//   },
//   {
//     headerMode: "none"
//   }
// );

// const AppContainer = createAppContainer(StackNavigation);

// function App() {
//   const [isLoadingComplete, setLoadingComplete] = useState(false);
//   if (!isLoadingComplete) {
//     return (
//       <AppLoading
//         startAsync={loadResourcesAsync}
//         onError={handleLoadingError}
//         onFinish={() => handleFinishLoading(setLoadingComplete)}
//       />
//     );
//   } else {
//     return isLoadingComplete ? <AppContainer /> : <AppLoading />;
//   }
// }
// async function loadResourcesAsync() {
//   await Promise.all([Font.loadAsync({})]);
// }
// function handleLoadingError(error) {
//   console.warn(error);
// }

// function handleFinishLoading(setLoadingComplete) {
//   setLoadingComplete(true);
// }

// const DrawerNavigation = createDrawerNavigator();
// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }


// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
// function MyDrawer(){
//   return (
//     <SafeAreaView style = {{flex : 1}}>
//       <NavigationContainer>
//         <Drawer.Navigator>
//           <Drawer.Screen name="Home" component={MyStack} options={{ headerShown: false }} />
//           <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//         </Drawer.Navigator>
//       </NavigationContainer>
//     </SafeAreaView>
  
//   )
// }
// function MyStack() {
//   return (
    
//       <Stack.Navigator >
//         <Stack.Screen name="Home" component={Untitled} options={{ headerShown: false }} />
//         <Stack.Screen name="Notifications" component={HomeScreen} options={{ headerShown: false }}/>
//       </Stack.Navigator>
//   );
// }


// function App() {
//   const [isLoadingComplete, setLoadingComplete] = useState(false);
//   if (!isLoadingComplete) {
//     return (
//       <AppLoading
//         startAsync={loadResourcesAsync}
//         onError={handleLoadingError}
//         onFinish={() => handleFinishLoading(setLoadingComplete)}
//       />
//     );
//   } else {
//     return isLoadingComplete ? <MyDrawer /> : <AppLoading />;
//   }
// }
// async function loadResourcesAsync() {
//   await Promise.all([Font.loadAsync({})]);
// }
// function handleLoadingError(error) {
//   console.warn(error);
// }

// function handleFinishLoading(setLoadingComplete) {
//   setLoadingComplete(true);
// }
// export default App;
