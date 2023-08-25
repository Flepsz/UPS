import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ModalScreen from "../screens/ModalScreen";
import OrderScreen from "../screens/OrderScreen";
import LoginScreen from "../screens/LoginScreen";
import React, { useState } from "react";

export type RootStackParamsList = {
	Login: { user: String; password: string };
	Main: undefined;
	MyModal: { userId: string; name: string };
	Order: { order: Order };
};

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigator = () => {
	const [user, setUser] = useState(false);
	const handleUserLogin = () => {
		setUser(true);
	};
	return (
		<RootStack.Navigator>
			{user ? (
				<RootStack.Group>
					<RootStack.Group>
						<RootStack.Screen name="Main" component={TabNavigator} />
					</RootStack.Group>
					<RootStack.Group
						screenOptions={{
							presentation: "modal",
						}}
					>
						<RootStack.Screen
							options={{ headerShown: false }}
							name="MyModal"
							component={ModalScreen}
						/>
					</RootStack.Group>
					<RootStack.Group>
						<RootStack.Screen name="Order" component={OrderScreen} />
					</RootStack.Group>
				</RootStack.Group>
			) : (
				<RootStack.Group>
					<RootStack.Screen
						name="Login"
						options={{ headerShown: false }}
						component={(props: any): React.ReactNode => (
							<LoginScreen {...props} onLoginSuccess={handleUserLogin} />
						)}
					/>
				</RootStack.Group>
			)}
		</RootStack.Navigator>
	);
};

export default RootNavigator;
