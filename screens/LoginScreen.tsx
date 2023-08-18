import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTailwind } from "tailwind-rn";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigator/RootNavigator";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import app from "../firebase/config";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

type Props = {
	userId: string;
	name: string;
};

const LoginScreen = ({ userId, name }: Props) => {
	const auth = getAuth(app)
	const tw = useTailwind();
	const navigation = useNavigation<LoginScreenNavigationProp>();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const signUp = () => {
			createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log("user: ", userCredential);
			})
			.catch(error => {
				if (error.code === "auth/email-already-in-use") {
					console.log("email already in use!");
				}
				if (error.code === "auth/invalid-email") {
					console.log("invalid email");
					
				}
			})
	};

	const handleLogin = () => {
		setError(null);

			signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigation.navigate("MyModal", { name: name, userId: userId});
			})
			.catch((e) => {
				setError(e.message);
			});
	};

	return (
		<View style={tw("flex-1 justify-center items-center")}>
			<TextInput
				placeholder="Email"
				onChangeText={(text) => setEmail(text)}
				value={email}
				style={tw("border p-2 w-64")}
			/>
			<TextInput
				placeholder="Password"
				onChangeText={(text) => setPassword(text)}
				value={password}
				secureTextEntry
				style={tw("border p-2 w-64 mt-2")}
			/>
			<Button title="Login" onPress={handleLogin} />
			{error && <Text style={tw("text-red-500 mt-2")}>{error}</Text>}
		</View>
	);
};

export default LoginScreen;
