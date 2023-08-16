import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ModalScreen from "../screens/ModalScreen";

export type RootStackParamsList = {
	Main: undefined;
	MyModal: { userId: string; name: string };
	Order: { order: any };
};

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootNavigator = () => {
	return (
		<RootStack.Navigator>
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
		</RootStack.Navigator>
	);
};

export default RootNavigator;
