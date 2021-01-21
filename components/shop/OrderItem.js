import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import colors from '../../constants/colors';
import Card from '../UI/Card';
import CartItem from './CartItem';

const OrderItem = props => {

    const [isShowDetail, setIsShowDetail] = useState(false)

    return (
        <Card style={styles.item}>
            <View style={styles.firstRow}>
                <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={colors.primaryColor} title={isShowDetail ? 'Hide Details': 'Show Details'} onPress={() => {
                setIsShowDetail(prevState => !prevState);
            }} />

            {isShowDetail && <View style={styles.detailSection}>
                {props.items.map(order =>
                    <CartItem
                        key={order.productId}
                        quantity={order.quantity}
                        title={order.productTitle}
                        price={order.sum} />
                )}
            </View>}
        </Card>
    );
}

export default OrderItem;

const styles = StyleSheet.create({
    item: {
        margin: 20,
        padding: 10,
        alignItems: 'center',

    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailSection: {
        marginTop: 5,
        width: '100%'
    }
});
