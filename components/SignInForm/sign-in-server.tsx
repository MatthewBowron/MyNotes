// This file contains the logic for validating user sign-in credentials
import {signIn} from "../../lib/auth";
import { Alert } from 'react-native';

export default async function validateSignIn(username:string, password:string){
    
    let userData = await signIn(username, password);

    if (userData == null) {
        return false
    } else {
        return userData;
    }
}
