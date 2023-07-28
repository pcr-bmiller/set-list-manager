// import * as globals from "../../../Globals/Variables";
import * as dataService from "../utils/DataService";
import { getCookie } from "../utils/HelperFunctions";
import * as globals from "../../globals/Variables";

export async function postSong({ body = {} }) {
  const service = globals.SERVICES["SETLIST"];
  let fetchProperties = {
    BaseUrl: `${service.URL}/SONG`,
    Method: "POST",
    SuppressMessageOverride: false,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.error) {
    return { error: true };
  } else {
    return { error: false };
  }
}
export async function deleteSong({ body = {} }) {
  const service = globals.SERVICES["ROTTEN"];
  let fetchProperties = {
    BaseUrl: `${service.URL}/SONG`,
    Method: "DELETE",
    SuppressMessageOverride: false,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.error) {
    return { error: true };
  } else {
    return { error: false };
  }
}
// GET ALL SONGS
export async function getSongs() {
  const service = globals.SERVICES["ROTTEN"];
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
  console.log("response SONGS= ", response);
  return response;
}

// GET SETLISTS
export async function getSetlists() {
  const service = globals.SERVICES["ROTTEN"];
  console.log("globals.SERVICES = ", globals);
  const body = {};
  let fetchProperties = {
    BaseUrl: `${service.URL}/SETLIST`,
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
  console.log("responseSETLIST = ", response);
  return response;
}

export async function getTable({ table, filter = "", orderby = "" }) {
  const service = globals.SERVICES["ROTTEN"];
  if (filter !== "") {
    filter = `?$filter=${filter}`;
  }
  if (orderby !== "") {
    if (filter) {
      orderby = `&$orderBy=${orderby}`;
    } else {
      orderby = `?$orderBy=${orderby}`;
    }
  }
  let fetchProperties = {
    BaseUrl: `${service.URL}/${table}${filter}${orderby}`,
    Method: "GET",
    SuppressMessageOverride: true,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
    },
  };

  let response = await dataService.FetchData(fetchProperties);

  if (!response.error) {
    if (response.body.value) {
      return response.body.value;
    } else {
      return [];
    }
  }
}
export async function getTableById({ table, key, id }) {
  const service = globals.SERVICES["ROTTEN"];
  const filter = `$filter=${key} eq '${id}'`;
  let fetchProperties = {
    BaseUrl: `${service.URL}/${table}?${filter}`,
    Method: "GET",
    SuppressMessageOverride: true,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
    },
  };

  let response = await dataService.FetchData(fetchProperties);

  if (!response.error) {
    if (response.body.value) {
      return response.body.value;
    } else {
      return [];
    }
  }
}

export async function deleteTable({ table, id }) {
  const service = globals.SERVICES["ROTTEN"];
  let response = [];
  let fetchProperties = {
    BaseUrl: `${service.URL}/${table}/${id}`,
    Method: "DELETE",
    SuppressMessageOverride: false,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
    },
  };

  if (table && id) {
    response = await dataService.FetchData(fetchProperties);
  }

  if (!response.error) {
    return { error: true };
  } else {
    return { error: false };
  }
}

export async function patchTable({ table, id, body }) {
  const service = globals.SERVICES["ROTTEN"];

  let fetchProperties = {
    BaseUrl: `${service.URL}/${table}/${id}`,
    Method: "PATCH",
    SuppressMessageOverride: false,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
    },
  };

  let response = await dataService.FetchData(fetchProperties);

  if (!response.error) {
    return { error: true };
  } else {
    return { error: false };
  }
}
export async function postTable({ table, body }) {
  const service = globals.SERVICES["ROTTEN"];

  let fetchProperties = {
    BaseUrl: `${service.URL}/${table}`,
    Method: "POST",
    SuppressMessageOverride: false,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
    },
  };

  let response = await dataService.FetchData(fetchProperties);

  if (!response) {
    return { error: true, response };
  } else {
    return { error: false, response };
  }
}
