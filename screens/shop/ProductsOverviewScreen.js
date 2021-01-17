//First screen when we load our app
import React from 'react';
import { FlatList, Text } from 'react-native';
import PRODUCTS from '../../data/dummy-data';

const ProductsOverviewScreen = props => {
    return <FlatList data={PRODUCTS} renderItem={({item}) => <Text>{item.title}</Text>}/>;
}

export default ProductsOverviewScreen;
