import CredentialProvider from "next-auth/providers/credentials"
 
import NextAuth from 'next-auth';
import { connectToDatabase } from "../../../lib/db";
import { verifyPassword } from "../../../lib/auth";

 
 
// NextAuth() executes and returns a handler function 
export default NextAuth({
    // object used to configure NextAuth's behaviors 
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialProvider({
            name: "credentials",
            authorize: async (credentials) => {
 
                const client = await connectToDatabase();
                const db = client.db();
                const user = await db.collection('users').findOne({ email: credentials.email });

                if (!user) {
                    // no user with the entered email
                    client.close();
                    throw new Error('No user found!');
                }
 
                // found a user with that email address, check for password
                const isValid = await verifyPassword(credentials.password, user.password);
                
 
                if (!isValid) {
                    client.close();
                    throw new Error('Invalid password! Try again!');
                }
 
                client.close();
 
                // authorization succeeded 
 
                // return object that is encoded for JWT token
                return { email: user.email};
            }
 
        },
        )
    ]
 
});