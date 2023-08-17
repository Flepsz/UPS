import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
	CompositeNavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import { useLayoutEffect } from "react";
import DeliveryCard from "../components/DeliveryCard";

type OrderScreenRouteProp = RouteProp<RootStackParamsList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Orders">,
	NativeStackNavigationProp<RootStackParamsList>
>;

const OrderScreen = () => {
	const tw = useTailwind();
	const navigation = useNavigation<OrdersScreenNavigationProp>();
	const {
		params: { order },
	} = useRoute<OrderScreenRouteProp>();

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: order.trackingItems.customer.name,
			headerTintColor: "#EB6A7E",
			headerTitleStyle: { color: "black" },
			headerBackTitle: "Deliveries"
		})
	}, [order]);

	return (
		<View style={tw("-mt-2")}>
			<DeliveryCard order={order} fullWidth/>
		</View>
	);
};

export default OrderScreen;
