//First screen when we load our app
import React from 'react';
import { FlatList, Text } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import PRODUCTS from '../../data/dummy-data';

const ProductsOverviewScreen = props => {
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
                />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

export default ProductsOverviewScreen;
