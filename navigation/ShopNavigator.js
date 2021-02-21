import React from 'react';
import { View, Button, Platform, SafeAreaView } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import colors from '../constants/colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : colors.primaryColor
}

const ProductNavigator = createStackNavigator({
    productOverview: ProductsOverviewScreen,
    productDetail: ProductDetailScreen,
    cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            size={23}
            color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrderNavigator = createStackNavigator({
    orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
            size={23}
            color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
})

const AdminNavigator = createStackNavigator({
    userProducts: UserProductsScreen,
    editScreen: EditProductScreen
}, {
    navigationOptions: { //configuring this here to be in Drawer
        drawerIcon: drawerConfig => <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
})

const AppNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Orders: OrderNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: colors.primaryColor
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return <SafeAreaView style={{flex: 1}}>
            <View style={{ flex: 1, paddingTop: 20 }}>
                <DrawerItems {...props} />
                <Button title={'Logout'} onPress={() => {
                    dispatch(logout());
                    props.navigation.navigate('Auth');
                    AsyncStorage.removeItem('userData')
                }} />
            </View>
        </SafeAreaView >
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: AppNavigator
})

export default createAppContainer(MainNavigator);
