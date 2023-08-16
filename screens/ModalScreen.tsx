import {
	CompositeNavigationProp,
	RouteProp,
	useNavigation,
	useRoute,
} from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useTailwind } from "tailwind-rn";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCustomerOrders } from "../hooks/useCustomerOrders";
import DeliveryCard from "../components/DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList>,
	NativeStackNavigationProp<RootStackParamsList, "MyModal">
>;

type ModalScreenRootProp = RouteProp<RootStackParamsList, "MyModal">;

const ModalScreen = () => {
	const tw = useTailwind();
	const navigation = useNavigation();
	const {
		params: { name, userId },
	} = useRoute<ModalScreenRootProp>();

	const { loading, error, orders } = useCustomerOrders(userId);

	return (
		<View style={tw("top-11")}>
			<TouchableOpacity
				onPress={navigation.goBack}
				style={tw("absolute right-5 z-10")}
			>
				<Icon name="closecircle" type="antdesign" />
			</TouchableOpacity>

			<View style={tw("mt-10")}>
				<View style={tw("py-5 border-b border-[#59C1CC]")}>
					<Text style={tw("text-center text-xl font-bold")}>{name}</Text>
					<Text style={tw("text-center italic text-sm")}>deliveries</Text>
				</View>
			</View>
			<FlatList
                contentContainerStyle={{ paddingBottom: 280 }}
				data={orders}
				keyExtractor={(order) => order.trackingId}
				renderItem={({ item: order }) => <DeliveryCard order={order} />}
			/>
		</View>
	);
};

export default ModalScreen;
