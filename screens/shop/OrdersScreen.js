//In this screen we will handle our orders
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, Alert, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import colors from '../../constants/colors';
import { fetchOrders } from '../../redux/actions';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    const [isLoading, setIsLoading] = useState(false);
    const [errMssg, setErrMssg] = useState();

    const dispatch = useDispatch();

    const reloadOrders = async () => {
        setIsLoading(true);
        try {
            await dispatch(fetchOrders())
        } catch (err) {
            setErrMssg(err.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (errMssg) {
            Alert.alert('Orders Loading Failed', errMssg, [{text: 'Okay'}])
            setErrMssg(null);
        }
    }, [errMssg])
    
    useEffect(() => {
        reloadOrders();
    }, [])
    
    useEffect(() => {
        const listener = props.navigation.addListener('willFocus', reloadOrders)
        return () => {
            listener.remove();
        }
    }, [reloadOrders])

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size={'large'} color={colors.primaryColor} />
        </View>
    }
    
    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => {
                return <OrderItem
                    amount={item.totalAmount}
                    date={item.formatDate}
                    items={item.items} />
            }}
        />
    );
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen;
