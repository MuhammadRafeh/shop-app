import React, { useReducer, useCallback, useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Colors from '../../constants/colors';
import Card from '../../components/UI/Card';
import * as authActions from '../../redux/actions';
import colors from '../../constants/colors';
import { useEffect } from 'react/cjs/react.development';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [errMssg, setErrMssg] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const authHandler = async () => {
    let action;
    if (isSignup) {
        action = authActions.signup(
          formState.inputValues.email,
          formState.inputValues.password
        )
    } else {
        action = authActions.signin(
          formState.inputValues.email,
          formState.inputValues.password
        )
    }
    try {
      setErrMssg(null);
      setIsLoading(true);
      await dispatch(action);
    } catch (err) {
      setErrMssg(err.message);
    }
    setIsLoading(false)
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (errMssg) {
      Alert.alert('Operation Failed!', errMssg, [{text: 'Okay'}]);
      setErrMssg(null);
    }
  }, [errMssg])

  return (
    // <KeyboardAvoidingView
    //   behavior="padding"
    //   keyboardVerticalOffset={50}
    //   style={styles.screen}
    // >
    <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            {!isLoading ? <Button
              title={isSignup ? 'Sign Up' : 'Login'}
              color={Colors.primary}
              onPress={authHandler}
            /> : <ActivityIndicator size={'small'} color={colors.primaryColor} />}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignup ? 'login' : 'sign up'}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup(prevState => !prevState)
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </LinearGradient>
    // </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
