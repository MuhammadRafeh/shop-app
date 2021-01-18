import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import colors from '../../constants/colors';

const CustomHeaderButton = props => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS === 'android' ? 'white': colors.primaryColor}/>
}

export default CustomHeaderButton;
