import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';
import React from 'react';

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status, token } = useAuthStore();

    useEffect(() => {
        checkStatus(token ?? '');
    }, [])

    useEffect(() => {
        if (status !== 'checking') {
            if (status === 'authenticated') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                });
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                });
            }
        }
    }, [status])

    return (
        <>
            {children}
        </>
    )
}