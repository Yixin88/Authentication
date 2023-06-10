import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://ying:ying@cluster0.andzl1u.mongodb.net/auth?retryWrites=true&w=majority');
  return client;
}