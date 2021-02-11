//List of product that belong to that user
import React, { useEffect, useState } from 'react';
import { View, Text, Platform, FlatList, Button, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import colors from '../../constants/colors';
import { deleteItem } from '../../redux/actions';

const UserProductsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [errMssg, setErrMssg] = useState();

    const userProduct = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const onSelectProductHandler = id => {
        props.navigation.navigate('editScreen', { productId: id });
    }

    const deleteProduct = id => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'errordestructive', onPress: async () => {
                    setIsLoading(true);
                    try {
                        await dispatch(deleteItem(id))
                    } catch (err) {
                        setErrMssg(err.message)
                    }
                    setIsLoading(false);
                }
            }
        ])
    }

    useEffect(() => {
        if (errMssg) {
            Alert.alert('Operation Failed', errMssg, [{text: 'Okay'}])
            setErrMssg(null);
        }
    }, [errMssg])

    if (isLoading) {
        return <View style={styles.centered}>
            <ActivityIndicator size='large' color={colors.primaryColor} />
        </View>
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductsScreen;
