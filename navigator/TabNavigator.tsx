import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CostumersScreen from "../screens/CostumersScreen";
import OrdersScreen from "../screens/OrdersScreen";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";

export type TabStackParamList = {
	Costumers: undefined;
	orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
	const navigation = useNavigation();
	useLayoutEffect(() => {
        
		return () => {};
	}, []);

	return (
		<Tab.Navigator>
			<Tab.Screen name="Customers" component={CostumersScreen} />
			<Tab.Screen name="Orders" component={OrdersScreen} />
		</Tab.Navigator>
	);
};

export default TabNavigator;
