import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { io } from 'socket.io-client';

const SocketIOReceiver = ({ color, serverUrl, room, databaseValue}) => {
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (room) {

			// Creates a WebSocket connection
			const socket = io(serverUrl, {
				auth: { 
					"room": room },
			  });

			socket.on("connect", () => {
				console.log("connected");
			});

			// Listens for incoming messages
			socket.on("response", (value) => {
				setMessage(value);
				databaseValue.onChange(value.content.knob1); //save duhhh device sensor value to Adalo database
			});

			// Destroys the socket reference
			// when the connection is closed
			return () => {
				socket.disconnect();
			};
		}
	}, [room]);

	return(
		<View style={styles.wrapper}>
			<Text style={styles.title}>Incoming values</Text>
			<Text style={{ color }}>{JSON.stringify(message, null, 2)}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: "24px",
		fontWeight: "bold",
		marginBottom: "20px"
	}
})

export default SocketIOReceiver;
