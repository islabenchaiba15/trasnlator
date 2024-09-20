const connectionString=`mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@translator-db.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`
import mongoose from 'mongoose';

const ConnectDB=async()=>{
    if(mongoose.connections[0].readyState === 1) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        console.log(connectionString,"connnectionstring")
        await mongoose.connect(connectionString)
        console.log('Connected to MongoDB');
    } catch (error:any) {
        console.log('Error connecting to MongoDB: ', error.message);
    }

}
export default ConnectDB


