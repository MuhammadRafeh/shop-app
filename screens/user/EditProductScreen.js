//Adding new Product or editing existing product
import React, { useCallback, useEffect, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
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
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Title
                    </Text>
                    <TextInput
                        value={state.userInputs.title}
                        onChangeText={inputTextChangeHandler.bind(null, 'title')}
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
                    {!state.inputValidity.title && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Image URL
                    </Text>
                    <TextInput
                        value={state.userInputs.imageUrl}
                        onChangeText={inputTextChangeHandler.bind(null, 'imageUrl')}
                        style={styles.input} />
                </View>
                {editedProduct ? null : <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Price
                    </Text>
                    <TextInput
                        value={state.userInputs.price}
                        onChangeText={inputTextChangeHandler.bind(null, 'price')}
                        style={styles.input}
                        keyboardType={'decimal-pad'} />
                </View>}
                <View style={styles.inputLabel}>
                    <Text style={styles.label}>
                        Description
                    </Text>
                    <TextInput
                        value={state.userInputs.description}
                        onChangeText={inputTextChangeHandler.bind(null, 'description')}
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
