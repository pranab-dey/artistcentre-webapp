import { getAuth } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAPrLS3Ujy4y_tCA8gcqYzXXn_Zr6zrr8s',
	authDomain: 'artiststream-e72cc.firebaseapp.com',
	projectId: 'artiststream-e72cc',
	storageBucket: 'artiststream-e72cc.appspot.com',
	messagingSenderId: '817885080296',
	appId: '1:817885080296:web:39dd192167cad66ffe775d',
};

let app;

const initFirebase = () => {
	if (!getApps().length) {
		// initialize firebase app with our configs.
		app = initializeApp(firebaseConfig);
		console.log('Initialized firebase');
	} else {
		console.log('Already Initialized firebase');
	}
};

export const firebaseApp = initFirebase(firebaseConfig);

export const firebaseAuth = getAuth(app);

// function createFirebaseApp(config) {
// 	try {
// 		return getApp();
// 	} catch {
// 		return initializeApp(config);
// 	}
// }

// const firebaseApp = createFirebaseApp(firebaseConfig);

// const firebaseConfig = {
// 	apiKey: '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',
// 	// authDomain: 'authDomain',
// 	// projectId: 'projectID',
// 	// storageBucket: 'storageBucket',
// 	// messagingSenderId: 'messagingSenderID',
// 	appId: '817885080296-8hl3ff3rakf5va5v4p2rtoupsfkm4vae.apps.googleusercontent.com',
// 	// measurementId: 'measurementID',
// };

// const initFirebase = () => {
// 	console.log(firebaseConfig);
// 	if (!getApps().length) {
// 		// initialize firebase app with our configs.
// 		const app = initializeApp(firebaseConfig);
// 		// creating auth for authentication
// 		const auth = getAuth(app);
// 		console.log('Initialized firebase');
// 		return auth;
// 	} else {
// 		console.log('Already Initialized firebase');
// 	}
// };

// export default initFirebase;
