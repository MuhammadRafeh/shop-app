//List of product that belong to that user
import React from 'react';
import { View, Text, Platform, FlatList, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { deleteItem } from '../../redux/actions';

const UserProductsScreen = props => {

    const userProduct = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();
    return (
        <FlatList
            data={userProduct}
            renderItem={({ item }) => {
                return <ProductItem
                    title={item.title}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    onSelect={() => {}}
                >
                    <Button title='Edit' onPress={() => {
                    }} />
                    <Button title='Delete' onPress={() => {
                        dispatch(deleteItem(item.id))
                    }} />
                </ProductItem>
            }}
        />
    );
}

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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

export default UserProductsScreen;
