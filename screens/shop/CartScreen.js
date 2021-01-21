//THe screen we see when we add item to the cart
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import colors from '../../constants/colors';
import { addOrders, removeFromCart } from '../../redux/actions';

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
        return list.sort((a, b) => a.productId > b.productId ? 1 : -1)
    })

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text></Text>
                <Button
                    color={colors.accentColor}
                    title='Order Now'
                    disabled={items.length === 0}
                    onPress={() => {dispatch(addOrders(items, totalAmount))}} />
            </Card>
            <FlatList
                data={items}
                keyExtractor={(item, index) => item.productId}
                renderItem={({ item }) => {
                    //item is a object
                    return <CartItem
                        quantity={item.quantity}
                        title={item.productTitle}
                        deleteButton
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
