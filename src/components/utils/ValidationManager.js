import iziToast from "izitoast";
import * as globals from "../../globals/Variables";
import { getBaseURL } from "./HelperFunctions";

iziToast.settings({
  position: "bottomCenter",
  timeout: 2000,
  zindex: 999999999,
});

/*
	CustomAlert(isError, type, message)
	
	isError: true|false
		Displays either a green or red toast.

	type: "VALIDATION FAILED"
		any type or catetory of the action taken.

	message: "Account Name is required"
		any message to describe action taken
*/
export function CustomAlert(isError, type, message) {
  if (!isError) {
    iziToast.success({
      title: message,
      message: type,
    });
  } else {
    iziToast.error({
      title: message,
      message: type,
    });
  }
}

/*
	ResolveHTTPResponse(response, successMessage, errorMessage, supressMessage)

	response: res
		The response coming in from fetch() API request

	successMessage: "Request Successful"
		Message to be displayed upon HTTP status code in the 200's
		
	errorMessage: "Request Failed"
		Message to be displayed upon HTTP status codes between 300 and 500

	supressMessage: true|false
		Flag to show or not show message.
*/
export function ResolveHTTPResponse(
  response,
  successMessage,
  errorMessage,
  supressMessage,
  supressCode = true
) {
  var responseClone = response.clone(); // clone response so we can consume a second time
  let requestSuccessful = true;
  let code = "0";
  if (response) {
    switch (true) {
      //SUCCESS
      case response.status < 300:
        code = response.status + " " + response.statusText;
        break;

      //REDIRECTION
      case response.status < 400:
        code = response.status + " " + response.statusText;
        break;

      //UNAUTHORIZED
      case response.status === 401 && response.url.includes("SessionManager/Resolve"):
        document.cookie = "x_universal_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
        document.cookie = "x_universal_forceBoot=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
        localStorage.clear();
        window.location = globals.REMOTE_OIDC_AUTH
          ? globals.REMOTE_OIDC_SIGNOUT_URL
          : globals.B2C_LOGOUT_POLICY_URL.replace("{domain}", getBaseURL());
        supressMessage = true;
        break;

      //CLIENT ERRORS
      case response.status < 500:
        code = response.status + " " + response.statusText;
        requestSuccessful = false;
        break;

      //SERVER ERRORS
      case response.status < 600:
        code = response.status + " " + response.statusText;
        requestSuccessful = false;
        break;

      default:
        code = "Unkown Error";
        requestSuccessful = false;
    }
  }
  if (!supressMessage) {
    if (requestSuccessful) {
      iziToast.success({
        title: successMessage,
        message: supressCode ? "" : code,
      });
    } else {
      // iziToast.error({
      // 	title: errorMessage,
      // 	message: supressCode ? '' : code,
      // });

      try {
        response.json().then((body) => {
          // Check if we have a detailed message on what went wrong in the Value array
          // body["message"] && JSON.stringify(body["message"])
          //   ? iziToast.error({
          //       title:
          //         body["message"] && JSON.stringify(body["message"])
          //           ? body["message"]
          //           : errorMessage,
          //       message: body["statusCode"],
          //     })
          //   : // If we do not find these we will use the error code and error message

          iziToast.error({
            title: errorMessage ? errorMessage : "An error has occured",
            message: code,
          });
        });
      } catch (e) {
        iziToast.error({
          title: "Error",
          message: errorMessage ? errorMessage : "An error has occured",
        });
      }
    }
  }

  if (requestSuccessful) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json().then((data) => {
        // process your JSON data further
        return { error: false, body: data };
      });
    } else {
      return response.text().then((text) => {
        // this is text, do something with it
        return { error: false, body: text };
      });
    }
  } else {
    return responseClone
      .json()
      .then((json) => ({ error: true, body: json }))
      .catch((err) => ({ error: true, body: null }));
  }
}

function ifNull(keys, property) {
  let objKeys = keys ? Object.keys(keys) : {};
  for (var i = 0; i < objKeys.length; i++) {
    if (typeof objKeys[i] !== "undefined") {
      if (objKeys[i] === property) {
        return false;
      }
    } else {
      return true;
    }
  }
  if (Object.keys(objKeys).length === 0 || !objKeys) {
    return true;
  }
}

export function toastMessage(success, message) {
  if (success) {
    iziToast.success({
      title: message,
    });
  } else {
    iziToast.error({
      title: message,
    });
  }
}
