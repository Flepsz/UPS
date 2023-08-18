import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyAIs5dWo7Ss8NtmxuRl1eKpuIRntlwEfYo",
	authDomain: "ups-clone-fl.firebaseapp.com",
	databaseURL: "https://ups-clone-fl-default-rtdb.firebaseio.com",
	projectId: "ups-clone-fl",
	storageBucket: "ups-clone-fl.appspot.com",
	messagingSenderId: "937130466809",
	appId: "1:937130466809:web:5bd8880fdfc83d108bf128",
};

const app = initializeApp(firebaseConfig);
export default app;
