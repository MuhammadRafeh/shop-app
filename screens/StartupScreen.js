import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { authenticate } from '../redux/actions';

const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const { token, userId, expiryDate } = JSON.parse(userData);
            const expirationDate = new Date(expiryDate);
            if (new Date() >= expirationDate || !token || !userId) { //expire
                props.navigation.navigate('Auth');
                return;
            }
            props.navigation.navigate('Shop');
            dispatch(authenticate(token, userId));
        }

        tryLogin();
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size={'large'} color={colors.primaryColor} />
        </View>
    );
}

export default StartupScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
