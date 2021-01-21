//List of product that belong to that user
import React from 'react';
import { View, Text, Platform, FlatList, Button, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import colors from '../../constants/colors';
import { deleteItem } from '../../redux/actions';

const UserProductsScreen = props => {

    const userProduct = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const onSelectProductHandler = id => {
        props.navigation.navigate('editScreen', { productId: id });
    }

    const deleteProduct = id => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(deleteItem(id))
            }}
        ])
    }
    
    return (
        <FlatList
            data={userProduct}
            renderItem={({ item }) => {
                return <ProductItem
                    title={item.title}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    onSelect={onSelectProductHandler.bind(null, item.id)}
                >
                    <Button color={colors.primaryColor} title='Edit' onPress={onSelectProductHandler.bind(null, item.id)} />
                    <Button color={colors.primaryColor} title='Delete' onPress={deleteProduct.bind(null, item.id)} />
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
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Add"
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('editScreen')
                }}
            />
        </HeaderButtons>
    }
}

export default UserProductsScreen;
