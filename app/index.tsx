import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Redirect } from 'expo-router';

const index = () => {
    console.log('this')
    return(
        <Redirect href={"/home"}/>
    )
}

export default index