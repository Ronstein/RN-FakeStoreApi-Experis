import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyIcon } from "../components/ui/MyIcon";

interface Props {
    title: string;
    subTitle?: string;
    rightAction?: () => void;
    rightActionIcon?: string;
    children?: React.ReactNode;
}

export const MainLayout = ({
    title,
    subTitle,
    rightAction,
    rightActionIcon,
    children,
}: Props) => {
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute(); // Para obtener la ruta actual

    const canGoBack = navigation.canGoBack();

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<MyIcon name="arrow-back-outline" />}
            onPress={() => navigation.goBack()}
        />
    );

    const RenderRightAction = () => {
        if (rightAction === undefined || rightActionIcon === undefined) return null;
        return (
            <TopNavigationAction
                onPress={rightAction}
                icon={<MyIcon name={rightActionIcon} />}
            />
        );
    };

    const isRootScreen = route.name === "HomeScreen"; // Ajusta este nombre si tu pantalla principal tiene otro nombre

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation
                title={title}
                subtitle={subTitle}
                alignment="center"
                accessoryLeft={canGoBack && !isRootScreen ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction />}
            />
            <Divider />
            <Layout style={{ height: "100%" }}>
                {children}
            </Layout>
        </Layout>
    );
};
