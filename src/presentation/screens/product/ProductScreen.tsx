import { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout } from "../../layouts/MainLayout";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { Layout, useTheme } from "@ui-kitten/components";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useProductStore } from "../../store/product/useProductStore";

interface Props extends StackScreenProps<RootStackParams, "ProductScreen"> { }

export const ProductScreen = ({ route }: Props) => {
    const { productId } = route.params;
    const { selectedProduct, getProductById, isLoading, error } = useProductStore();
    const theme = useTheme();

    // Cargar el producto al montar el componente
    useEffect(() => {
        getProductById(productId);
    }, [productId]);

    if (isLoading) {
        return <MainLayout title="Cargando..." />;
    }

    if (error) {
        return <MainLayout title="Error">{error}</MainLayout>;
    }

    if (!selectedProduct) {
        return <MainLayout title="Producto no encontrado" />;
    }

    return (
        <MainLayout title={selectedProduct.title.length > 30
            ? `${selectedProduct.title.substring(0, 30)}...`
            : selectedProduct.title}
            subTitle={`$${selectedProduct.price}`}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Imagen del producto */}
                <Image
                    source={{ uri: selectedProduct.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                />

                {/* Detalles del producto */}
                <Layout style={styles.detailsContainer}>
                    <Text style={[styles.productTitle, { color: theme["color-primary-500"] }]}>
                        {selectedProduct.title}
                    </Text>
                    <Text style={styles.productDescription}>{selectedProduct.description}</Text>
                    <Text style={styles.productPrice}>Precio: ${selectedProduct.price}</Text>
                </Layout>
            </ScrollView>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    productImage: {
        width: "100%",
        height: 250,
        marginBottom: 16,
    },
    detailsContainer: {
        paddingHorizontal: 16,
    },
    productTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 16,
    },
    productPrice: {
        fontSize: 18,
        fontWeight: "600",
    },
});
