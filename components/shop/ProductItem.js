import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import propTypes from 'prop-types';

const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.item}>
            <TouchableCmp useForeground={true} onPress={props.handleViewDetail}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: props.imageUrl }} style={styles.image} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title='View Details' onPress={props.handleViewDetail} />
                        <Button title='To Cart' onPress={props.handleToCart} />
                    </View>
                </View>
            </TouchableCmp>
        </View>

    );
}

ProductItem.propTypes = {
    title: propTypes.string,
    price: propTypes.any,
    imageUrl: propTypes.string,
    handleViewDetail: propTypes.func,
    handleToCart: propTypes.func
}

export default ProductItem;

const styles = StyleSheet.create({
    item: {
        margin: 20,
        height: 300,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        color: 'black'
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    details: {
        alignItems: 'center',
        height: '15%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        height: '25%',
        alignItems: 'center',
        paddingHorizontal: 20
    }
});
