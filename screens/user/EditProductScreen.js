//Adding new Product or editing existing product
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === prodId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title: '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl: '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description: '');

    const formSubmitted = useCallback(() => {
        console.log('Submitted!')
    }, [])

    useEffect(() => {
        props.navigation.setParams({submit: formSubmitted})
    }, [formSubmitted])
    
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Title
                    </Text>
                    <TextInput value={title} onChangeText={text => { setTitle(text) }} style={styles.input} />
                </View>
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Image URL
                    </Text>
                    <TextInput value={imageUrl} onChangeText={text => { setImageUrl(text) }} style={styles.input} />
                </View>
                {editedProduct ? null : <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Price
                    </Text>
                    <TextInput value={price} onChangeText={text => { setPrice(text) }} style={styles.input} />
                </View>}
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Description
                    </Text>
                    <TextInput value={description} onChangeText={text => { setDescription(text) }} style={styles.input} />
                </View>
            </View>
        </ScrollView>
    );
}

export default EditProductScreen;

EditProductScreen.navigationOptions = navData => {

    const formSubmit = navData.navigation.getParam('submit')
    
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Save"
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={formSubmit}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    inputLabel: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});
