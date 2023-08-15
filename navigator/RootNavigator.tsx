import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import TabNavigator from "./TabNavigator";

export type RootStackParamsList = {
    Main: undefined;
    MyModal: { userId: string; name: string };
    Order: { order: any };
}

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<RootStack.Navigator>
            <RootStack.Group>
                <RootStack.Screen name="Main" component={TabNavigator} />
            </RootStack.Group>
        </RootStack.Navigator>
	);
};

export default RootNavigator;
