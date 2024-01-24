import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet } from 'react-native'

const RestAPIReceiver = ({ color, url, headers, method, databaseValue}) => {
	const [value, setValue] = useState([]);

	useEffect(() => {
		fetch(url)
		   .then((response) => response.json())
		   .then((data) => {
			  console.log(data);
			  setValue(data);
			  console.log(Object.keys(data).length);
			  databaseValue.onChange(Object.keys(data).length);
		   })
		   .catch((err) => {
			  console.log(err.message);
		   });
	 }, []);

	return(
		<View style={styles.wrapper}>
			<Text style={styles.title}>Incoming values</Text>
			<Text style={{ color }}>{JSON.stringify(value, null, 2)}</Text>
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

export default RestAPIReceiver;
