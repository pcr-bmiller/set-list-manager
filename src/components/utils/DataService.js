/**
 *  @DataService.js 1/22/2019
 *  Developer: Vincent Fragola
 *  Wrapper for fetch - takes JSON payload containing all parameters
 *  Sample Payload:
 *  let fetchProperties =
 *  {
 *      BaseUrl:{`${this.state.services.Dashboard.URL}/CONTEXT?id=${contextId}`},                     //this is the full odata url
 *      UseCredentials,                                                                               //'include' or 'omit'    -   if property not included defaults based on URL
 *      Mode: 'cors',                                                                                 //'cors' or 'no-cors'
 *      CallBody:  {'Value':value},                                                                   //valid json
 *      Method:'PATCH',                                                                               //'PATCH','POST','GET','PUT','DELETE'
 *      SuccessMessage:'Request Successful',
 *      FailureMessage:'Request Failed',
 *      SuppressMessageOverride:false,
 *      HeaderVals: {                                                                                 //valid json
 *        'Content-Type': 'application/json',
 *        'Ocp-Apim-Subscription-Key': this.state.services.Dashboard.subscription_key,
 *      }
 *  }
 *  Update (8/27/2019):
 *  1.  Refactor "FetchData to simplify resolve/response"
 *  2.  Refactor of "ResolveHeadersForSiteminder"
 */

import * as globals from "../../globals/Variables";
import * as validationManager from "./ValidationManager";
import { getCookie } from "./HelperFunctions";
var jwt = require("jsonwebtoken");
export function FetchData(fetchProperties) {
  return new Promise((resolve, reject) => {
    switch (fetchProperties.Method.toUpperCase()) {
      case "POST":
        Post(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject("Error");
        });
        break;
      case "GET":
        Get(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject("Error");
        });
        break;
      case "PATCH":
        Patch(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject("Error");
        });
        break;
      case "PUT":
        Put(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject("Error");
        });
        break;
      case "DELETE":
        Delete(ParseFetchParameters(fetchProperties)).then((response) => {
          response ? resolve(response) : reject("Error");
        });
        break;
      default:
        break;
    }
  });
}

function ParseFetchParameters(fetchProperties) {
  fetchProperties.BaseUrl =
    !fetchProperties.BaseUrl.includes("?id=") || !globals.REMOTE_INSTANCE
      ? fetchProperties.BaseUrl
      : ConvertUrlSyntax(fetchProperties.BaseUrl);

  fetchProperties.UseCredentials = fetchProperties.UseCredentials
    ? fetchProperties.UseCredentials
    : fetchProperties.BaseUrl.toLowerCase().includes(globals.API_MAN_ENV_VAR)
    ? "include"
    : "omit";

  if (globals.SITEMINDER_AUTH) {
    ResolveHeadersForSiteminder(fetchProperties);
  }

  if (globals.REMOTE_OIDC_AUTH) {
    ResolveHeadersForRemoteOIDC(fetchProperties);
  }

  if (
    globals.REMOTE_INSTANCE &&
    !fetchProperties.BaseUrl.includes("SessionManager/Initiate") &&
    !fetchProperties.BaseUrl.includes("auth/token") &&
    !fetchProperties.BaseUrl.includes("SessionManager/Resolve")
  ) {
    ResolveHeadersForRemoteInstance(fetchProperties);
  }

  fetchProperties.Mode = fetchProperties.Mode ? fetchProperties.Mode : "cors";

  return fetchProperties;
}

function Delete(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: "DELETE",
      credentials: parameters.UseCredentials,
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case "ON_FAIL":
            suppressMessage = res.ok ? true : false;
            break;
          case "ALWAYS":
            suppressMessage = false;
            break;
          case "NEVER":
            suppressMessage = true;
            break;
          default:
            suppressMessage = res.ok ? true : false;
            break;
        }
        return validationManager.ResolveHTTPResponse(
          res,
          parameters.SuccessMessage,
          parameters.FailureMessage,
          suppressMessage
        );
      })
      .then((response) => {
        var didSucceed = false;
        response ? (didSucceed = true) : (didSucceed = false);

        didSucceed === true ? resolve(response) : reject("Error");
      });
  });
}

function Get(parameters) {
  //Decode the JWT from the URL
  // let sessionToken = getCookie("x_universal_id");
  // if (sessionToken) {
  //   var decodedToken = jwt.decode(sessionToken, { complete: true });
  //   let exp = decodedToken
  //     ? decodedToken.payload
  //       ? decodedToken.payload.exp
  //       : parseInt(new Date().getTime())
  //     : parseInt(new Date().getTime());

  //   let expiration = parseInt(exp) * 1000;
  //   let myTime = parseInt(new Date().getTime());
  //   let difference = expiration - myTime;
  //   //IF we are coming into this and we have 5 minutes left on the token, refresh it
  //   if (difference <= 300000) {
  //     // TOKEN STALE RELOAD SITE AND GENERATE NEW TOKEN in APP.js
  //     document.location.reload();
  //   } else {
  //     // VALID DONT REFRESH TOKEN
  //   }
  // } else {
  //   //MISSING TOKEN
  //   document.location.reload();
  // }

  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: "GET",
      credentials: parameters.UseCredentials,
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case "ON_FAIL":
            suppressMessage = res.ok ? true : false;
            break;
          case "ALWAYS":
            suppressMessage = false;
            break;
          case "NEVER":
            suppressMessage = true;
            break;
          default:
            suppressMessage = res.ok ? true : false;
            break;
        }
        return validationManager.ResolveHTTPResponse(
          res,
          parameters.SuccessMessage,
          parameters.FailureMessage,
          suppressMessage
        );
      })
      .then((response) => {
        var didSucceed = false;
        response ? (didSucceed = true) : (didSucceed = false);

        didSucceed === true ? resolve(response) : reject("Error");
      });
  });
}

function Put(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: "PUT",
      credentials: parameters.UseCredentials,
      body: JSON.stringify(parameters.CallBody),
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case "ON_FAIL":
            suppressMessage = res.ok ? true : false;
            break;
          case "ALWAYS":
            suppressMessage = false;
            break;
          case "NEVER":
            suppressMessage = true;
            break;
          default:
            suppressMessage = res.ok ? true : false;
            break;
        }
        return validationManager.ResolveHTTPResponse(
          res,
          parameters.SuccessMessage,
          parameters.FailureMessage,
          suppressMessage
        );
      })
      .then((response) => {
        var didSucceed;
        response ? (didSucceed = true) : (didSucceed = false);

        didSucceed ? resolve(response) : reject("Error");
      });
  });
}

function Post(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: "POST",
      credentials: parameters.UseCredentials,
      body: JSON.stringify(parameters.CallBody),
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case "ON_FAIL":
            suppressMessage = res.ok ? true : false;
            break;
          case "ALWAYS":
            suppressMessage = false;
            break;
          case "NEVER":
            suppressMessage = true;
            break;
          default:
            suppressMessage = res.ok ? true : false;
            break;
        }
        return validationManager.ResolveHTTPResponse(
          res,
          parameters.SuccessMessage,
          parameters.FailureMessage,
          suppressMessage
        );
      })
      .then((response) => {
        var didSucceed;
        response ? (didSucceed = true) : (didSucceed = false);

        didSucceed ? resolve(response) : reject("Error");
      });
  });
}

function Patch(parameters) {
  return new Promise((resolve, reject) => {
    fetch(parameters.BaseUrl, {
      headers: parameters.HeaderVals,
      mode: parameters.Mode,
      method: "PATCH",
      credentials: parameters.UseCredentials,
      body: JSON.stringify(parameters.CallBody),
    })
      .then((res) => {
        let suppressMessage = true;
        switch (parameters.ShowMessage) {
          case "ON_FAIL":
            suppressMessage = res.ok ? true : false;
            break;
          case "ALWAYS":
            suppressMessage = false;
            break;
          case "NEVER":
            suppressMessage = true;
            break;
          default:
            suppressMessage = res.ok ? true : false;
            break;
        }
        return validationManager.ResolveHTTPResponse(
          res,
          parameters.SuccessMessage,
          parameters.FailureMessage,
          suppressMessage
        );
      })
      .then((response) => {
        var didSucceed;
        response ? (didSucceed = true) : (didSucceed = false);

        didSucceed ? resolve(response) : reject("Error");
      });
  });
}

function ResolveHeadersForSiteminder(fetchProperties) {
  fetchProperties.HeaderVals["ClientID"] = globals.SITEMINDER_CLIENTID;
}

function ResolveHeadersForRemoteInstance(fetchProperties) {
  fetchProperties.HeaderVals["Content-Type"] = "application/json";
  fetchProperties.HeaderVals["x-universal-user-id"] = globals.REMOTE_CLAIM.UserId
    ? globals.REMOTE_CLAIM.UserId
    : "";
  fetchProperties.HeaderVals["x-universal-firm-id"] = globals.REMOTE_CLAIM.FirmId
    ? globals.REMOTE_CLAIM.FirmId
    : "";
  fetchProperties.HeaderVals["x-universal-session-id"] = globals.REMOTE_CLAIM.SessionId
    ? globals.REMOTE_CLAIM.SessionId
    : "";
}

function ResolveHeadersForRemoteOIDC(fetchProperties) {
  fetchProperties.HeaderVals["Authorization"] = "Bearer " + getCookie("x_universal_id");
}

function ConvertUrlSyntax(url) {
  var urlSegments = url.split("id");
  var convertedUrl = urlSegments[0].slice(0, -1) + "(" + urlSegments[1].substring(1) + ")";

  return convertedUrl;
}
