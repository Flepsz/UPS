import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card, Icon } from "@rneui/themed";
import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Orders">,
	NativeStackNavigationProp<RootStackParamsList>
>;

type Props = {
	item: Order;
};

const OrderCard = ({ item }: Props) => {
	const tw = useTailwind();
	const navigation = useNavigation<OrdersScreenNavigationProp>();

	return (
		<TouchableOpacity onPress={() => navigation.navigate("Order", {order: item})}>
			<Card containerStyle={tw("px-5 rounded-lg")}>
				<View style={tw("flex-row justify-between items-center")}>
					<View>
						<Icon
							name="truck-delivery"
							color={"#EB6A7C"}
							type="material-community"
						/>
						<Text style={{ fontSize: 10 }}>
							{new Date(item.createdAt).toDateString()}
						</Text>
					</View>

					<View>
						<Text style={[tw("text-gray-400"), { fontSize: 10 }]}>
							{item.carrier}-{item.trackingId}
						</Text>
						<Text style={tw("text-gray-500 text-xl")}>
							{item.trackingItems.customer.name}
						</Text>
					</View>

					<View style={tw("flex-row items-center")}>
						<Text style={[tw("text-sm"), { color: "#EB6A7C" }]}>
							{item.trackingItems.items.length} x
						</Text>
						<Icon style={tw("ml-2")} name="box" type="feather" />
					</View>

					<View>
						<Text>{}</Text>
					</View>
				</View>
			</Card>
		</TouchableOpacity>
	);
};

export default OrderCard;
