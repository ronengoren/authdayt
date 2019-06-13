import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	profileContainer: {
		alignItems: "center"
	},
	usernameText: {
		fontSize: 15,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10
	},
	picture: {
		width: 50,
		height: 50
	},
	inputStyle: {
		margin: 5,
		width: 40,
		padding: 2,
		borderRadius: 5,
  },
  postContainer: {
	  padding: 4,
	  borderRadius: 1,
	  borderColor: "black",
	  backgroundColor: "white",
	  width: 50,
  },
  header: {
	  position: 'relative',
	  marginLeft: 0,
	  color: '#444',
  },
  createdAt: {
	  marginLeft: 35,
	  color: "#bbb",
  },
  PostListcontainer: {
	  flex: 1,
	  flexDirection: 'column',
	  alignItems: 'center',
	  width: 80,
  },
  PostsContainercontainer: {
	  flex: 1,
	  flexDirection: 'column',
	  alignContent: 'center',
	  backgroundColor: '#eee',
	  width: 50,
	  height: 60,
  }
});

export default styles;