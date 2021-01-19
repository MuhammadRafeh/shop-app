//THe screen we see when we add item to the cart
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import colors from '../../constants/colors';
import { removeFromCart } from '../../redux/actions';

const CartScreen = props => {

    const totalAmount = useSelector(state => state.cart.totalAmount)
    const items = useSelector(state => {
        const list = [];
        for (const key in state.cart.items) {
            list.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return list.sort((a, b) => a.productId > b.productId ? 1: -1)
    })

    const dispatch = useDispatch();
    
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${totalAmount.toFixed(2)}</Text></Text>
                <Button color={colors.accentColor} title='Order Now' disabled={items.length === 0}/>
            </View>
            <FlatList
                data={items}
                keyExtractor={(item, index) => item.productId}
                renderItem={({ item }) => {
                    //item is a object
                    return <CartItem
                        quantity={item.quantity}
                        title={item.productTitle}
                        price={item.sum}
                        onDeleteItem={() => {
                            dispatch(removeFromCart(item.productId))
                        }}
                    />
                }}
            />
        </View>
    )
}

export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        margin: 10
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        shadowColor: 'black',
        elevation: 5,
        borderRadius: 10,
        // height: 100,
        alignItems: 'center',
        padding: 20,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: colors.accentColor
    }
});
