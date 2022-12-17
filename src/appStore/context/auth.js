import { useAuthState } from 'react-firebase-hooks/auth';
import { createContext, useContext, useState, useEffect } from 'react';
import { firebaseAuth } from 'constant/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const authContextDefaultValues = {
	user: null,
	login: () => {},
	logout: () => {},
	loading: true,
};

const AuthContext = createContext(authContextDefaultValues);

export default function FirebaseAuthProvider({ children }) {
	const [user, setUser] = useAuthState(firebaseAuth);
	const provider = new GoogleAuthProvider();
	const [loading, setLoading] = useState(true);
	// const auth = initFirebase();
	// const auth = getAuth();
	// console.log(firebaseAuth);

	useEffect(() => {
		// console.log('user', user);
	}, [user]);

	// const authStateChangeHandler = (authState) => {
	// 	if (!authState) {
	// 		// console.log("user is not logged in");
	// 		// redirect the user to index page
	// 		setUser(null);
	// 		setLoading(false);
	// 		// also clear out cookies if you want
	// 		// router.push('/');
	// 	} else {
	// 		// also set  cookies if you want
	// 		setAuthUser(authState);
	// 		setLoading(false);
	// 	}
	// };
	// useEffect(() => {
	// 	onAuthStateChanged(firebaseAuth, (user) => {
	// 		if (user) {
	// 			const uid = user.uid;
	// 			console.log({ uid });
	// 		} else {
	// 			console.log('no user');
	// 		}
	// 	});
	// }, []);

	// useEffect(() => {
	// 	const unsubscribe = auth.onAuthStateChanged(authStateChangeHandler);

	// 	return () => {
	// 		unsubscribe();
	// 	};
	// }, []);

	const login = async () => {
		console.log('login');
		try {
			const result = await signInWithPopup(firebaseAuth, provider);
			console.log({ result });
			// This gives you a Google Access Token. You can use it to access the Google API.
			// const credential = GoogleAuthProvider.credentialFromResult(result);
			// const token = credential?.accessToken;
			// The signed-in user info.
			// const user = result.user;
			//setUser(true);
			// console.log({ credential, token, user });
		} catch (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			//setUser(false);
			console.log({ errorCode, errorMessage, email, credential });
		}
	};

	const logout = () => {
		firebaseAuth.signOut();
		//setUser(false);
		// console.log('logout');
	};

	const value = {
		user,
		login,
		logout,
		loading,
	};

	return (
		<>
			<AuthContext.Provider value={value}>
				{children}
			</AuthContext.Provider>
		</>
	);
}

const useFirebaseAuth = () => useContext(AuthContext);

export { useFirebaseAuth, FirebaseAuthProvider };

// useEffect(() => {
// 	onAuthStateChanged(auth, (user) => {
// 		if (user) {
// 			const uid = user.uid;
// 			console.log({ uid });
// 		} else {
// 			console.log('no user');
// 		}
// 	});
// }, []);
