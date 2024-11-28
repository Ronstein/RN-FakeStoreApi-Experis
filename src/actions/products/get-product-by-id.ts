import { fakeStoreApi } from "../../config/api/FakeStoreApi";
import { Product } from "../../domain/entities/product";
import { ProductResponse } from "../../infrastructure";


import { ProductMapper } from "../../infrastructure/mappers/product.mapper";


export const getProductById = async (id: number): Promise<Product> => {
    try {
        const { data } = await fakeStoreApi.get<ProductResponse>(`/products/${id}`);
        return ProductMapper.fakeApiProductToEntity(data);
    } catch (error) {
        console.log(error);
        throw new Error(`Error getting product by id: ${id}`);
        ;
    }
}