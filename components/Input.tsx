import { TextInput, Text, SafeAreaView, View } from "react-native";
import { useTailwind } from "tailwind-rn";

interface InputProps {
	onChange: any;
	value: string;
	label: string;
	password?: boolean;
}

export default function Input({
	onChange,
	value,
	label,
	password,
}: InputProps) {
	const tw = useTailwind();
	const secureEntry = password && true;
	return (
		<TextInput
			onChangeText={(text) => onChange(text)}
			value={value}
			secureTextEntry={secureEntry}
			style={tw(`border p-2 w-64 rounded-lg mb-3`)}
			placeholder={label}
		/>
	);
}
