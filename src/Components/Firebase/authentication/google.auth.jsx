// **********************************************
// This code is only for google authentication
// **********************************************

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("credential: " + credential);

      const token = credential.accessToken;
      console.log("token: " + token);

      const user = result.user;
      console.log("user: " + user);
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("error code: " + errorCode);

      const errorMessage = error.message;
      console.log("errorMessage: " + errorMessage);

      const email = error.email;
      console.log("email: " + email);

      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("credential: " + credential);
    });
