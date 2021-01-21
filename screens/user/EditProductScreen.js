//Adding new Product or editing existing product
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { addProduct, updateProduct } from '../../redux/actions';

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === prodId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [isTitleValid, setIsTitleValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    const formSubmitted = useCallback(() => {
        if (!isTitleValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }])
            return
        }
        if (editedProduct) {
            dispatch(updateProduct(prodId, title, description, imageUrl));
        } else {
            dispatch(addProduct(title, description, +price, imageUrl));
        }
        props.navigation.goBack();
    }, [dispatch, title, description, price, imageUrl])

    useEffect(() => {
        props.navigation.setParams({ submit: formSubmitted })
    }, [formSubmitted])

    const titleChangeHandler = text => {
        if (text.trim().length === 0 && isTitleValid) {
            setIsTitleValid(false);
        } else if (text.trim().length > 0 && !isTitleValid) {
            setIsTitleValid(true);
        }
        setTitle(text)
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Title
                    </Text>
                    <TextInput
                        value={title}
                        onChangeText={titleChangeHandler}
                        style={styles.input}
                        keyboardType="default"
                        autoCapitalize='sentences'
                        // caretHidden={true} // invisible the cursor
                        // clearButtonMode={'while-editing'}
                        // contextMenuHidden={true} // Prevent us to paste in textInput
                        // dataDetectorTypes={'link'}
                        autoCorrect
                        // enablesReturnKeyAutomatically={true}
                        // keyboardAppearance={'dark'}
                        returnKeyType={'next'} //What they say on keyboard, only say
                        onEndEditing={() => { console.log('onEndEditing') }}
                        onSubmitEditing={() => { console.log('onSubmitEditting') }}
                    />
                    {!isTitleValid && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Image URL
                    </Text>
                    <TextInput
                        value={imageUrl}
                        onChangeText={text => { setImageUrl(text) }}
                        style={styles.input} />
                </View>
                {editedProduct ? null : <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Price
                    </Text>
                    <TextInput
                        value={price}
                        onChangeText={text => { setPrice(text) }}
                        style={styles.input}
                        keyboardType={'decimal-pad'} />
                </View>}
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Description
                    </Text>
                    <TextInput
                        value={description}
                        onChangeText={text => { setDescription(text) }}
                        style={styles.input} />
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
