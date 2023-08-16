import { View, Text, TouchableOpacity } from "react-native";
import { useCustomerOrders } from "../hooks/useCustomerOrders";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { CustomerScreenNavigationProp } from "../screens/CustomersScreen";
import { Card, Icon } from "@rneui/themed";

type Props = {
	userId: string;
	name: string;
	email: string;
};

const CustomerCard = ({ userId, name, email }: Props) => {
	const { loading, error, orders } = useCustomerOrders(userId);
	const tw = useTailwind();
	const navigation = useNavigation<CustomerScreenNavigationProp>();

	return (
		<TouchableOpacity>
			<Card containerStyle={tw("p-5 rounded-lg")}>
                <View>
                    <View>
                        <Text style={tw("text-2xl font-bold")}>{name}</Text>
                        <Text style={[tw("text-sm"), {color: "#59C1CC"}]}>ID: {userId}</Text>
                    </View>

                    <View>
                        <Text>{loading ? "loading..." : `${orders.length} x`}</Text>
                        <Icon
                            style={tw("mb-5 ml-auto")}
                            name="box"
                            type="entypo"
                            color="#59C1CC"
                            size={50}
                        />
                    </View>
                </View>
                <Card.Divider />
                <Text>{email}</Text>
            </Card>
		</TouchableOpacity>
	);
};

export default CustomerCard;
