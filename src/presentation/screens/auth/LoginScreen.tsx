import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { Alert, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyIcon } from "../../components/ui/MyIcon";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useAuthStore } from "../../store/auth/useAuthStore";

interface Props extends StackScreenProps<RootStackParams, "LoginScreen"> { }

export const LoginScreen = ({ navigation }: Props) => {
    const { height } = useWindowDimensions();
    const { login } = useAuthStore();
    const [isPosting, setIsPosting] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });


    const onSubmit = async (data: { username: string; password: string }) => {
        setIsPosting(true);
        try {
            const success = await login(data.username, data.password);
            if (success) {
                Alert.alert("Éxito", "Inicio de sesión correcto.");
                navigation.replace("HomeScreen");
            } else {
                Alert.alert("Error", "Credenciales incorrectas.");
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al iniciar sesión.");
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>
                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category="h1">Ingresar</Text>
                    <Text category="p2">Por favor, ingrese para continuar.</Text>
                </Layout>

                {/* Inputs */}
                <Layout style={{ marginTop: 20 }}>
                    {/* Campo Usuario */}
                    <Controller
                        name="username"
                        control={control}
                        rules={{
                            required: "El usuario es requerido",
                            minLength: {
                                value: 5,
                                message: "El usuario debe tener al menos 5 caracteres",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder="Usuario"
                                keyboardType="default"
                                autoCapitalize="none"
                                accessoryLeft={<MyIcon name="person-outline" />}
                                style={{ marginBottom: 10 }}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                status={errors.username ? "danger" : "basic"}
                                caption={errors.username?.message}
                            />
                        )}
                    />

                    {/* Campo Contraseña */}
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "La contraseña es requerida",
                            // pattern: {
                            //     value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7}$/,
                            //     message: "La contraseña debe ser alfanumérica",
                            // },
                            minLength: {
                                value: 5,
                                message: "La contraseña debe tener 5 caracteres mínimo, incluir al menos una letra, un número y un símbolo especial",
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder="Contraseña"
                                autoCapitalize="none"
                                accessoryLeft={<MyIcon name="lock-outline" />}
                                secureTextEntry
                                style={{ marginBottom: 10 }}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                status={errors.password ? "danger" : "basic"}
                                caption={errors.password?.message}
                            />
                        )}
                    />
                </Layout>

                {/* Space */}
                <Layout style={{ height: 20 }} />

                {/* Button */}
                <Layout>
                    <Button
                        accessoryRight={<MyIcon name="arrow-forward-outline" white />}
                        onPress={handleSubmit(onSubmit)} // Usar handleSubmit de React Hook Form
                        disabled={isPosting}
                    >
                        {isPosting ? "Cargando..." : "Ingresar"}
                    </Button>
                </Layout>
            </ScrollView>
        </Layout>
    );
};
