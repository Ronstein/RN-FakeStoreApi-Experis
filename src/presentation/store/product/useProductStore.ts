import { create } from "zustand";
import { Product } from "../../../domain/entities/product";
import { getProductById, getProducts } from "../../../actions/products";

export interface ProductState {
    products: Product[]; // Lista de productos
    selectedProduct?: Product; // Producto seleccionado
    isLoading: boolean; // Indicador de carga
    error?: string; // Mensaje de error

    getProducts: () => Promise<void>; // Función para obtener todos los productos
    getProductById: (id: number) => Promise<void>; // Función para obtener un producto por ID
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    selectedProduct: undefined,
    isLoading: false,
    error: undefined,

    getProducts: async () => {
        set({ isLoading: true, error: undefined });
        try {
            const products = await getProducts();

            set({ products, isLoading: false });
        } catch (error) {
            set({ error: "Error obteniendo los productos", isLoading: false });
        }
    },

    // Obtener un producto por ID
    getProductById: async (id: number) => {
        set({ isLoading: true, error: undefined });
        try {
            const product = await getProductById(id);
            set({ selectedProduct: product, isLoading: false });
        } catch (error) {
            set({ error: `Error obteniendo el producto con ID: ${id}`, isLoading: false });
        }
    },
}));
