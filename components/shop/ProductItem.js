import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';
import propTypes from 'prop-types';
import Card from '../UI/Card';

const ProductItem = props => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.item}>
            <TouchableCmp useForeground={true} onPress={props.onSelect}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: props.imageUrl }} style={styles.image} />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </Card>

    );
}

ProductItem.propTypes = {
    title: propTypes.string,
    price: propTypes.any,
    imageUrl: propTypes.string,
    onSelect: propTypes.func
}

export default ProductItem;

const styles = StyleSheet.create({
    item: {
        margin: 20,
        height: 300,
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
        color: 'black',
        fontFamily: 'open-sans-bold'
    },
    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
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
