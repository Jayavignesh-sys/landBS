// **************************************************
// This code is specifically written for firestore
// **************************************************

import { getFirestore } from "firebase/firestore";

import { app } from "../firebase.utils";

export const db = getFirestore(app);
