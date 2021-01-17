// When we about to see the detail of a product
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('id')

    //selectedProduct is a object of Product class which has properties
    const selectedProduct = useSelector(state => state.products.availableProducts.find(pro => pro.id === productId))
    
    return (
        <View>
            <Text>
                {selectedProduct.title}
            </Text>
        </View>
    );
}

ProductDetailScreen.navigationOptions = (navData) => {

    const paramTitle = navData.navigation.getParam('title');
    
    return {
        headerTitle: paramTitle
    };
}

export default ProductDetailScreen;

const styles = StyleSheet.create({

});
