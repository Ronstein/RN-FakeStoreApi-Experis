import { fakeStoreApi } from "../../config/api/FakeStoreApi";
import { Product } from "../../domain/entities/product";
import { ProductMapper } from "../../infrastructure";
import type { ProductResponse } from "../../infrastructure/interfaces/product.response";

export const getProducts
    = async ()
        : Promise<Product[]> => {
        // console.log({ page, limit });
        try {
            const { data } = await fakeStoreApi.get<ProductResponse[]>(`/products`);
            const products = data.map(ProductMapper.fakeApiProductToEntity);
            //console.log(products[0]);

            return products;
        } catch (error) {
            console.log(error);
            throw new Error("Error getting Products");
        }
    }