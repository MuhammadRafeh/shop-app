import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = props => {
    return (
        <View style={styles.item}>
            <View style={styles.titleQuantity}>
                <Text style={styles.quantity}>{props.quantity}</Text>
                <Text style={styles.mainText}>{props.title}</Text>
            </View>
            <View style={styles.priceTrash}>
                <Text style={styles.mainText}>{props.price}</Text>
                {props.deleteButton && <TouchableOpacity style={styles.deleteButton} onPress={props.onDeleteItem}>
                    <Ionicons
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color={'red'}
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
}

export default CartItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        // backgroundColor: 'green'
    },
    titleQuantity: {
        flexDirection: 'row',
        padding: 10
    },
    priceTrash: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16,
        marginRight: 4
    },
    mainText: { //amount and title
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});
