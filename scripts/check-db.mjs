import 'dotenv/config';
import mongoose from 'mongoose';

async function main(){
  const uri = process.env.MONGODB_URI;
  if(!uri){
    console.error('MONGODB_URI not set in .env');
    process.exit(1);
  }
  try{
    await mongoose.connect(uri, { retryWrites: true, w: 'majority' });
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const result = {};
    for(const c of collections){
      const name = c.name;
      const count = await db.collection(name).countDocuments();
      result[name] = count;
    }
    console.log(JSON.stringify({ success: true, collections: result }, null, 2));
    await mongoose.disconnect();
    process.exit(0);
  }catch(err){
    console.error('Error connecting/querying MongoDB:', err);
    process.exit(2);
  }
}

main();
