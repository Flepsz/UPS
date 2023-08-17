import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
	CompositeNavigationProp,
	useNavigation,
} from "@react-navigation/native";
import { ScrollView, ActivityIndicator } from "react-native";
import { useTailwind } from "tailwind-rn";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { useLayoutEffect, useState } from "react";
import { Image, Input } from "@rneui/themed";
import { GET_CUSTOMERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import CustomerCard from "../components/CustomerCard";

export type CustomerScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<TabStackParamList, "Customers">,
	NativeStackNavigationProp<RootStackParamsList>
>;

const CustomersScreen = () => {
	const tw = useTailwind();
	const navigation = useNavigation<CustomerScreenNavigationProp>();
	const [input, setInput] = useState<string>("");
	const { loading, error, data } = useQuery(GET_CUSTOMERS);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	return (
		<ScrollView style={tw("bg-cyansc")}>
			<Image
				source={{ uri: "https://i.imgur.com/uU8GTZM.jpeg" }}
				containerStyle={tw("w-full h-64")}
				PlaceholderContent={<ActivityIndicator />}
			/>

			<Input
				placeholder="Search by Customer"
				value={input}
				onChangeText={setInput}
				containerStyle={tw("bg-white pt-5 pb-0 px-10")}
			/>

			{data?.getCustomers
				?.filter((customer: CustomerList) =>
					customer.value.name.includes(input)
				)
				.map(({ name: ID, value: { email, name } }: CustomerResponse) => (
					<CustomerCard key={ID} email={email} name={name} userId={ID} />
				))}
		</ScrollView>
	);
};

export default CustomersScreen;
