var GoogleAuth; // Google Auth object.
function initClient() {
	gapi.client
		.init({
			//      'apiKey': 'AIzaSyBA9xpEiNgFAkb78ZKLo4oWB1K9rkc-lMg',
			clientId:
				"620866130313-jtk0jkn0dfoqbhbcvhmqpga73mae26v7.apps.googleusercontent.com",
			scope: "https://www.googleapis.com/auth/drive.metadata.readonly"
			//      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
		})
		.then(function() {
			GoogleAuth = gapi.auth2.getAuthInstance();

			// Listen for sign-in state changes.
			GoogleAuth.isSignedIn.listen(updateSigninStatus);
		});
}

var isAuthorized;

/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		isAuthorized = true;
	} else {
		isAuthorized = false;
	}

	console.log(`is signed in ${isAuthorized}`);
}

document.addEventListener("DOMContentLoaded", function onLoad(event) {
	gapi.load("client:auth2", initClient);

	console.log(`is signed in ${isAuthorized}`);
	// let profile = GoogleAuth.currentUser.get().getBasicProfile();
	// let name = profile.getGivenName();
});
