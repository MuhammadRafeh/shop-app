//First screen when we load our app
import React from 'react';
import { FlatList, Platform, Text, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import PRODUCTS from '../../data/dummy-data';
import { addToCart } from '../../redux/actions';

const ProductsOverviewScreen = props => {
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('productDetail', {
            id: id,
            title: title
        })
    }

    return (
        <FlatList
            data={PRODUCTS}
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onSelect={() => {
                        selectItemHandler(item.id, item.title)
                    }}
                >
                    <Button title='View Details' onPress={() => {
                        selectItemHandler(item.id, item.title)
                    }} />
                    <Button title='To Cart' onPress={() => {
                        dispatch(addToCart(item))
                    }} />
                </ProductItem>
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('cart')
                }}
            />
        </HeaderButtons>,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    }
}

export default ProductsOverviewScreen;
