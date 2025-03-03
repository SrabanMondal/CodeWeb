import mongoose from "mongoose";

const ConnectDb = () => {
	const uri = mongoose.connect(process.env.MONGO_URI, {
		dbName: "Students"
	}).then(() =>  console.log("DataBase Connected Successfully")).catch((error) => console.log(error));
}
export default ConnectDb;
