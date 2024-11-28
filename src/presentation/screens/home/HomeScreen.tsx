import { Button, Icon, Layout, Text } from "@ui-kitten/components"
import { useAuthStore } from "../../store/auth/useAuthStore";
import React, { useEffect } from "react";
import { MainLayout } from "../../layouts/MainLayout";
import { FAB } from "../../components/ui/FAB";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";
import { useProductStore } from "../../store/product/useProductStore";


export const HomeScreen = () => {
    const { logout } = useAuthStore();

    const { products, getProducts, isLoading } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);


    return (
        <>
            <MainLayout
                title={'Fake Api Shop - Products'}
                subTitle='Prueba Técnica Experis'
                rightAction={logout}
                rightActionIcon="log-out-outline"
            >
                {
                    isLoading
                        ? (<FullScreenLoader />)
                        : (<ProductList
                            products={products ?? []}
                        />
                        )
                }
            </MainLayout>
        </>
    )
}
