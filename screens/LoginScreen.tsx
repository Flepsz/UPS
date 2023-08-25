import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "@rneui/themed";
import { useTailwind } from "tailwind-rn";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../navigator/RootNavigator";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase/config";
import Input from "../components/Input";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamsList>;

type Props = {
	userId: string;
	name: string;
	onLoginSuccess: () => void;
};

function sleep(milliseconds: number, action: any): void {
	action;
	const start = new Date().getTime();
	while (new Date().getTime() - start < milliseconds) {}
}

const LoginScreen = ({ userId, name, onLoginSuccess }: Props) => {
	const auth = getAuth(app);
	const tw = useTailwind();
	const [userName, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState(null);
	const [variant, setVariant] = useState<string>("login");
	const [message, setMessage] = useState<any>();

	const toggleVariant = useCallback(() => {
		setError(null);
		setMessage(null);
		setPassword("")
		setVariant((currentVariant) =>
			currentVariant === "login" ? "register" : "login"
		);
	}, []);

	const eMessageLogin = (e: any) => {
		if (e.code === "auth/wrong-password") {
			e.message = "Wrong password, try again...";
			setError(e.message);
		} else if (e.code === "auth/invalid-email") {
			e.message = "Invalid email address.";
			setError(e.message);
		} else if (e.code === "auth/email-already-in-use") {
			e.message = "Email is already in use.";
			setError(e.message);
		} else {
			setError(e.message);
		}
	};

	const eMessageSignup = (e: any) => {
		if (e.code === "auth/email-already-in-use") {
			e.message = "Email is already in use.";
			setError(e.message);
		} else if (e.code === "auth/invalid-email") {
			e.message = "Invalid email address.";
			setError(e.message);
		} else if (e.code === "auth/weak-password") {
			e.message = "Password is too weak. Please use a stronger password.";
			setError(e.message);
		} else {
			setError(e.message);
		}
	};

	const signUp = () => {
		setMessage(null);
		setError(null);
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				setMessage("User created with success!");
				setVariant("login");
				setPassword("");
			})
			.catch((e) => {
				eMessageSignup(e);
			});
	};

	const handleLogin = () => {
		setError(null);
		setMessage(null);
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				onLoginSuccess();
			})
			.catch((e) => {
				eMessageLogin(e);
			});
	};

	return (
		<View style={tw("flex-1 justify-center items-center")}>
			<Image source={{ uri: "/assets/logo.svg" }} />
			<Text style={tw("text-4xl mb-3 font-semibold")}>
				{variant === "login" ? "Sign In" : "Register"}
			</Text>
			{variant === "register" && (
				<Input label="Username" onChange={setUserName} value={name} />
			)}
			<Input label="Email" onChange={setEmail} value={email} />
			<Input
				label="Password"
				onChange={setPassword}
				value={password}
				password
			/>
			<TouchableOpacity
				onPress={variant === "login" ? handleLogin : signUp}
				style={tw(
					"bg-purple-700 py-2 px-6 rounded-md flex items-center justify-center w-64"
				)}
			>
				<Text style={tw("text-white text-lg font-semibold")}>
					{variant === "login" ? "Login" : "Sign Up"}
				</Text>
			</TouchableOpacity>
			{message && <Text style={tw("text-purple-700 mt-2")}>{message}</Text>}
			{error && <Text style={tw("text-red-500 mt-2")}>{error}</Text>}
			<View style={tw("flex flex-row justify-center items-center text-center")}>
				<Text style={tw("text-neutral-500 mt-3")}>
					{variant === "login"
						? "First time using UPS 2.0?"
						: "Already have a account?"}
				</Text>
				<Text style={tw("ml-1 mt-3 underline")} onPress={toggleVariant}>
					{variant === "login" ? "Create an account" : "Login"}
				</Text>
			</View>
		</View>
	);
};

export default LoginScreen;
