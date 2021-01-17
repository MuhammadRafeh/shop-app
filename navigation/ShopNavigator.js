import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import colors from '../constants/colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ProductNavigator = createStackNavigator({
    productOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS ===  'android' ? colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : colors.primaryColor
    }
});

export default createAppContainer(ProductNavigator);