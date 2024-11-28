import { Product } from "../../domain/entities/product";
import { ProductResponse } from "../interfaces/product.response";


export class ProductMapper {
    static fakeApiProductToEntity(fakeApiProduct: ProductResponse): Product {
        return {
            id: fakeApiProduct.id,
            title: fakeApiProduct.title,
            price: fakeApiProduct.price,
            description: fakeApiProduct.description,
            image: fakeApiProduct.image,
        }
    }
}