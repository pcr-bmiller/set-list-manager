// import * as globals from "../../../Globals/Variables";
import * as dataService from "../utils/DataService";
import { getCookie } from "../utils/HelperFunctions";
import * as globals from "../../globals/Variables";

export async function postForm({ services, token, password }) {
  const service = globals.SERVICES["RECOVRR-IOS"];

  const body = {};
  let fetchProperties = {
    BaseUrl: `${service.URL}/submit-password`,
    Method: "POST",
    SuppressMessageOverride: false,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
      token: token,
      password: password,
      Authorization: `Bearer ${getCookie("x_universal_id")}`,
      Environment: getCookie("x_environment") ? getCookie("x_environment") : "Test",
      // "o-integrator": service.subscription_key,
    },
  };

  let response = await dataService.FetchData(fetchProperties);
  if (response.error) {
    return { error: true };
  } else {
    return { error: false };
  }
}

export async function getData() {
  const service = globals.SERVICES["SETLIST"];
  console.log("globals.SERVICES = ", globals);
  const body = {};
  let fetchProperties = {
    BaseUrl: `${service.URL}/SONG`,
    Method: "GET",
    SuppressMessageOverride: false,
    // CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
      // token: token,
      // password: password,
      // Authorization: `Bearer ${getCookie("x_universal_id")}`,
      // Environment: getCookie("x_environment") ? getCookie("x_environment") : "Test",
      // "o-integrator": service.subscription_key,
    },
  };

  let response = await dataService.FetchData(fetchProperties);
  console.log("response = ", response);
  if (response.error) {
    return { error: true };
  } else {
    return { error: false };
  }
}
