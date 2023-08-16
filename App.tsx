import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigator/RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
	uri: "https://anori.stepzen.net/api/handy-dachshund/__graphql",
	headers: {
		Authorization:
			"apikey anori::stepzen.io+1000::921675d1807f6aa3ae85aa8a01223a1aae276b287fc32ee767ca643673d2f04c",
	},
	cache: new InMemoryCache(),
});

export default function App() {
	return (
		// @ts-ignore - TailwindProvider is missing a type definition
		<TailwindProvider utilities={utilities}>
			<ApolloProvider client={client}>
				<NavigationContainer>
					<RootNavigator />
				</NavigationContainer>
			</ApolloProvider>
		</TailwindProvider>
	);
}
