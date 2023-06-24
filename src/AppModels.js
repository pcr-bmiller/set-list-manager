import * as globals from "./globals/Variables";
import * as dataService from "./components/utils/DataService";
import { getCookie } from "./components/utils/HelperFunctions";

export async function getNotificationCount({ user, services }) {
  let fetchProperties = {
    BaseUrl: `${services.NotificationReporting.URL}/NOTIFICATIONS?$count=true&$filter=contains(Notified,'${user.Email}') and Status eq 'Unread'`,
    Method: "GET",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": services.NotificationReporting.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body && response.body["@odata.count"]) {
    return response.body["@odata.count"];
  }
  return 0;
}

export async function getMetadata({ user, services }) {
  let fetchProperties = {
    BaseUrl: `${services.DashboardAPI.URL}/metadata`,
    Method: "GET",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": services.DashboardAPI.subscription_key,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (response.body) {
    return response.body;
  } else {
    return [];
  }
}

export async function getTransforms({ user, services }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/TRANSFORM`,
    Method: "GET",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": services.Dashboard.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  let response = await dataService.FetchData(fetchProperties);
  if (!response.error && response.body && response.body.value) {
    return response.body.value;
  } else {
    return [];
  }
}

export async function deleteSession({ user, services }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/SESSION?id=${user.sessionId}`,
    Method: "DELETE",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.NEVER,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": services.Dashboard.subscription_key,
      DDHFirm: user.DDHFirm,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function clearUserEntitlements({ user, services }) {
  let fetchProperties = {};
  if (user.DDHFirm && !globals.REMOTE_INSTANCE) {
    fetchProperties = {
      BaseUrl: `${services.DataDeliveryHubAPI.URL}/entitlement/clear`,
      Method: "POST",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: false,
      ShowMessage: globals.NEVER,
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.DataDeliveryHubAPI.subscription_key,
        DDHFirm: user.DDHFirm,
      },
    };
  } else {
    fetchProperties = {
      BaseUrl: `${services.Entity.URL}/Entitlement/ClearUserEntitlements`,
      Method: "POST",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: false,
      ShowMessage: globals.NEVER,
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.Entity.subscription_key,
        DDHFirm: user.DDHFirm,
      },
    };
  }
  return await dataService.FetchData(fetchProperties);
}

export async function setUserEntitlements({ user, services }) {
  let fetchProperties = {};
  if (user.DDHFirm && !globals.REMOTE_INSTANCE) {
    fetchProperties = {
      BaseUrl: `${services.DataDeliveryHubAPI.URL}/entitlement/set`,
      Method: "POST",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: false,
      ShowMessage: globals.NEVER,
      CallBody: {
        EntityId: null,
      },
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.DataDeliveryHubAPI.subscription_key,
        DDHFirm: user.DDHFirm,
      },
    };
  } else {
    fetchProperties = {
      BaseUrl: `${services.Entity.URL}/Entitlement/SetUserEntitlements`,
      Method: "POST",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: false,
      ShowMessage: globals.NEVER,
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.Entity.subscription_key,
        DDHFirm: user.DDHFirm,
      },
    };
  }
  return await dataService.FetchData(fetchProperties);
}

export async function setUserEntitlementsByEntity({ user, services, entityId }) {
  let fetchProperties = {};
  if (user.DDHFirm && !globals.REMOTE_INSTANCE) {
    fetchProperties = {
      BaseUrl: `${services.DataDeliveryHubAPI.URL}/entitlement/set`,
      Method: "POST",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: false,
      ShowMessage: globals.ON_FAIL,
      CallBody: {
        EntityId: entityId,
      },
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.DataDeliveryHubAPI.subscription_key,
        DDHFirm: user.DDHFirm,
      },
    };
  } else {
    fetchProperties = {
      BaseUrl: `${services.Entity.URL}/Entitlement/SetUserEntitlementsByEntity`,
      Method: "POST",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: false,
      ShowMessage: globals.ON_FAIL,
      CallBody: {
        EntityId: entityId,
      },
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.Entity.subscription_key,
        DDHFirm: user.DDHFirm,
      },
    };
  }
  return await dataService.FetchData(fetchProperties);
}

export async function getTopHierarchy({ user, services }) {
  let fetchProperties = {};
  if (user.DDHFirm && !globals.REMOTE_INSTANCE) {
    fetchProperties = {
      BaseUrl: `${services.DataDeliveryHub.URL}/CLIENT_ENTITY_USER_LINK?$filter=User_Uid eq ${user.userId}`,
      Method: "GET",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: true,
      ShowMessage: globals.NEVER,
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.DataDeliveryHub.subscription_key,
      },
    };
  } else {
    fetchProperties = {
      BaseUrl: `${services.Entity.URL}/CLIENT_ENTITY_USER_LINK?$filter=UserId eq ${user.userId}`,
      Method: "GET",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: true,
      ShowMessage: globals.NEVER,
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.Entity.subscription_key,
      },
    };
  }
  return await dataService.FetchData(fetchProperties);
}

export async function getEntityMetadata({ user, services, entityId }) {
  let fetchProperties = {};
  if (user.DDHFirm && !globals.REMOTE_INSTANCE) {
    fetchProperties = {
      BaseUrl: `${services.DataDeliveryHub.URL}/CLIENT_ENTITY?$filter=ClientEntity_UID eq ${entityId}&$expand=CLIENT_HIERARCHY_TYPE`,
      Method: "GET",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: true,
      ShowMessage: globals.NEVER,
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.DataDeliveryHub.subscription_key,
      },
    };
  } else {
    fetchProperties = {
      BaseUrl: `${services.Entity.URL}/CLIENT_ENTITY?$filter=ClientEntityID eq ${entityId}&$expand=CLIENT_HIERARCHY_TYPE`,
      Method: "GET",
      SuccessMessage: "Request Successful",
      FailureMessage: "Request Failed",
      SuppressMessageOverride: true,
      ShowMessage: globals.ON_FAIL,
      HeaderVals: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": services.Entity.subscription_key,
      },
    };
  }
  return await dataService.FetchData(fetchProperties);
}

export async function getSession({ services, body }) {
  let fetchProperties = {
    BaseUrl: `${services.DashboardAPI.URL}/SessionManager/Resolve`,
    Method: "POST",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: true,
    ShowMessage: globals.NEVER,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": services.DashboardAPI.subscription_key,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function patchSession({ services, body, id }) {
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/SESSION?id=${id}`,
    Method: "PATCH",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: true,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": services.Dashboard.subscription_key,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function getSessionURL({ services, body }) {
  let fetchProperties = {
    BaseUrl: globals.GET_SESSION_URL,
    Method: "POST",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": globals.SUB_KEY,
      "x-universal-firm-secret": globals.SESSION_KEY,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function getToken({ body }) {
  let fetchProperties = {
    BaseUrl: globals.TOKEN_URL,
    Method: "POST",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": globals.SUB_KEY,
      "x-universal-firm-secret": globals.SESSION_KEY,
    },
  };
  return await await dataService.FetchData(fetchProperties);
}

export async function getServices({ baseUrl, subKey }) {
  let fetchProperties = {
    BaseUrl: baseUrl,
    Method: "GET",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subKey,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function generateSaSCookie({ services }) {
  let fetchProperties = {
    BaseUrl: `${services.SaSToken.URL}/GenerateSaSCookie`,
    Method: "GET",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": services.SaSToken.subscription_key,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function postUserSession({ baseUrl, subKey, body }) {
  let fetchProperties = {
    BaseUrl: baseUrl,
    Method: "POST",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subKey,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function getUserContext({ baseUrl, subKey, body }) {
  let fetchProperties = {
    BaseUrl: baseUrl,
    Method: "POST",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subKey,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function patchContext({ user, services, value, contextId }) {
  let body = {
    Value: value,
    UpdateBy: user.userId,
    UpdateDate: new Date().toISOString().slice(0, 19).concat("Z"),
  };
  let fetchProperties = {
    BaseUrl: `${services.Dashboard.URL}/CONTEXT?id=${contextId}`,
    Method: "PATCH",
    SuccessMessage: "Request Successful",
    FailureMessage: "Request Failed",
    SuppressMessageOverride: false,
    ShowMessage: globals.ON_FAIL,
    CallBody: body,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": services.Dashboard.subscription_key,
    },
  };
  return await dataService.FetchData(fetchProperties);
}

export async function getTable({ services, institution, table }) {
  const service = services["RECOVRR-ODATA"];

  let fetchProperties = {
    BaseUrl: `${service.URL}/${table}`,
    Method: "GET",
    SuppressMessageOverride: true,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
      "o-institution": institution,
      // "o-integrator": service.subscription_key,
      Authorization: `Bearer ${getCookie("x_universal_id")}`,
      Environment: getCookie("x_environment") ? getCookie("x_environment") : "Test",
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

export async function getTokenBAOBAB({ services }) {
  const service = services["RECOVRR-AUTH"];

  let fetchProperties = {
    BaseUrl: `${service.URL}/login`,
    Method: "GET",
    SuppressMessageOverride: false,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
      Authorization: `Bearer ${getCookie("x_universal_id")}`,
      Environment: getCookie("x_environment") ? getCookie("x_environment") : "Test",
    },
  };

  let response = await dataService.FetchData(fetchProperties);

  if (response.error) {
    //try again if baobab returns 403 Forbidden
    response = await dataService.FetchData(fetchProperties);
    if (!response.error) {
      if (response.body) {
        return response.body;
      } else {
        return [];
      }
    }
  } else {
    if (response.body) {
      return response.body;
    } else {
      return [];
    }
  }
}

export async function getTokenPingBAOBAB({ services, token = "" }) {
  const service = services["RECOVRR-BAOBAB"];

  let fetchProperties = {
    BaseUrl: `${service.URL}/ping`,
    Method: "GET",
    SuppressMessageOverride: false,
    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
      token: token ? token : getCookie("x_baobab_token"),
      Environment: getCookie("x_environment") ? getCookie("x_environment") : "Test",
      Authorization: `Bearer ${getCookie("x_universal_id")}`,
    },
  };

  let response = await dataService.FetchData(fetchProperties);

  if (response.body) {
    return response.body.baseline.remaining_time[0].time;
  } else {
    return { error: true, ...response.body };
  }
}
