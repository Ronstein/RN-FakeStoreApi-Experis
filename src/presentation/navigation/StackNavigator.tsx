import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { HomeScreen, LoadingScreen, LoginScreen, ProductScreen } from '../screens';


export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    HomeScreen: undefined;
    ProductScreen: { productId: number };
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
    return {
        cardStyle: {
            opacity: current.progress,
        }
    }
}

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation, }} name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation, }} name="LoginScreen" component={LoginScreen} />
            <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation, }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    );
}