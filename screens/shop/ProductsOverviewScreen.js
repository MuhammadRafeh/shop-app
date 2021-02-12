//First screen when we load our app
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Platform, Text, Button, StyleSheet, ActivityIndicator, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import colors from '../../constants/colors';
import { addToCart, fetchProducts } from '../../redux/actions';

const ProductsOverviewScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [errMssg, setErrMssg] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('productDetail', {
            id: id,
            title: title
        })
    }
    const loadProducts = useCallback(async () => {
        setIsRefreshing(true);
        setErrMssg(null);
        try {
            await dispatch(fetchProducts());
        } catch (err) {
            setErrMssg(err);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setErrMssg]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => { setIsLoading(false) });
    }, [loadProducts])

    useEffect(() => {
        const listener = props.navigation.addListener('willFocus', loadProducts)

        return () => {
            listener.remove();
        }

    }, [loadProducts])

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size={24} color={colors.primaryColor} />
        </View>
    }

    if (errMssg) {
        return <View style={styles.centered}>
            <Text>Some Error Occured! Maybe Start by adding Some.</Text>
            <Button title='Refresh' onPress={loadProducts} />
        </View>
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onSelect={() => {
                        selectItemHandler(item.id, item.title)
                    }}
                >
                    <Button color={colors.primaryColor} title='View Details' onPress={() => {
                        selectItemHandler(item.id, item.title)
                    }} />
                    <Button color={colors.primaryColor} title='To Cart' onPress={() => {
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen;
