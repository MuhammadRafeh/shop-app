// When we about to see the detail of a product
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../../constants/colors';
import { addToCart } from '../../redux/actions';

const ProductDetailScreen = props => {

    const productId = props.navigation.getParam('id')

    //selectedProduct is a object of Product class which has properties
    const selectedProduct = useSelector(state => state.products.availableProducts.find(pro => pro.id === productId))

    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.buttonContainer}>
                <Button color={colors.primaryColor} title='Add to Cart' onPress={() => {
                    dispatch(addToCart(selectedProduct))
                }}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>

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
    image: {
        width: '100%',
        height: 300
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    price: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 20,
        color: '#888',
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    }
});
