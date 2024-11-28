import { Card, Text } from "@ui-kitten/components";
import { Product } from "../../../domain/entities/product"
import { Image } from "react-native";
import { FadeInImage } from "../ui/FadeInImage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigator";

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <Card
            style={{ flex: 1, backgroundColor: '#f9f9f9', margin: 3 }}
            onPress={() => navigation.navigate('ProductScreen', { productId: product.id })}
        >
            {
                (!product.image)
                    ? (<Image
                        source={require('../../../assets/no-product-image.png')}
                        style={{ width: '100%', height: 200 }}
                    />)
                    : (
                        <FadeInImage
                            uri={product.image!}
                            style={{ flex: 1, width: '100%', height: 200 }}
                        />
                    )
            }
            <Text
                style={{ textAlign: 'center' }}
                numberOfLines={3}
            >
                {product.title}
            </Text>
            <Text
                style={{ textAlign: 'center' }}
            >
                {'$'}{product.price}
            </Text>
        </Card>
    )
}
