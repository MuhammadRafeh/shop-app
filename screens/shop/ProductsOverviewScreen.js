//First screen when we load our app
import React from 'react';
import { FlatList, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import PRODUCTS from '../../data/dummy-data';
import { addToCart } from '../../redux/actions';

const ProductsOverviewScreen = props => {
    const dispatch = useDispatch();
    return (
        <FlatList
            data={PRODUCTS}
            renderItem={({ item }) => (
                <ProductItem
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    handleViewDetail={() => {
                        props.navigation.navigate('productDetail', {
                            id: item.id,
                            title: item.title
                        })
                    }}
                    handleToCart={() => {
                        dispatch(addToCart(item))
                    }}
                />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
