import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import colors from '../constants/colors';
import CartScreen from '../screens/shop/CartScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ProductNavigator = createStackNavigator({
    productOverview: ProductsOverviewScreen,
    productDetail: ProductDetailScreen,
    cart: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS ===  'android' ? colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : colors.primaryColor
    }
});

export default createAppContainer(ProductNavigator);