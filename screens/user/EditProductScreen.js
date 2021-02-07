//Adding new Product or editing existing product
import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import { addProduct, updateProduct } from '../../redux/actions';

const UPDATE_INPUT = 'UPDATE_INPUT'

const formReducer = (state, action) => {
    if (action.type === UPDATE_INPUT) {
        // action is {value, isValid, input}
        const userInputs = {
            ...state.userInputs,
            [action.input]: action.value
        }
        const inputValidity = {
            ...state.inputValidity,
            [action.input]: action.isValid
        }
        let isFormValid = true
        for (const key in inputValidity) {
            if (!inputValidity[key]) {
                isFormValid = false;
                break;
            }
        }
        // console.log(userInputs, inputValidity, isFormValid)
        return {
            userInputs,
            inputValidity,
            isFormValid
        }

    }
    return state;
}

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(product => product.id === prodId))

    const dispatch = useDispatch();

    const [state, formDispatch] = useReducer(formReducer, {
        userInputs: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidity: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        isFormValid: editedProduct ? true : false
    })

    const formSubmitted = useCallback(() => {
        if (!state.isFormValid) {
            Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }])
            return
        }
        if (editedProduct) {
            dispatch(updateProduct(
                prodId,
                state.userInputs.title,
                state.userInputs.description,
                state.userInputs.imageUrl)
            );
        } else {
            dispatch(addProduct(
                state.userInputs.title,
                state.userInputs.description,
                +state.userInputs.price,
                state.userInputs.imageUrl)
            );
        }
        props.navigation.goBack();
    }, [dispatch, prodId, state])

    useEffect(() => {
        props.navigation.setParams({ submit: formSubmitted })
    }, [formSubmitted])

    const inputTextChangeHandler = (inputIdentifier, text) => {
        // console.log(inputIdentifier, text)
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true
        }
        formDispatch({
            type: UPDATE_INPUT,
            value: text,
            isValid,
            input: inputIdentifier
        })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    label="Title"
                    errMsg="Please enter a valid title!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    returnKeyType={"next"}
                />
                <Input
                    label="Image Url"
                    errMsg="Please enter a valid image url!"
                    keyboardType="default"
                    returnKeyType={"next"}
                />
                {editedProduct ? null : (
                    <Input
                        label="Price"
                        errMsg="Please enter a valid price!"
                        keyboardType="decimal-pad"
                        returnKeyType={"next"}
                    />
                )
                }
                <Input
                    label="Description"
                    errMsg="Please enter a valid description!"
                    keyboardType="default"
                    autoCapitalize="sentences"
                    autoCorrect
                    multiline
                    numberOfLines={3}
                />
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
    }
});
