import { Text, SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn";

const CostumersScreen = () => {
	const tw = useTailwind();

	return (
        <SafeAreaView>
            <Text style={tw("text-red-500")}>CostumersSc</Text>
        </SafeAreaView>
    );
};

export default CostumersScreen;
