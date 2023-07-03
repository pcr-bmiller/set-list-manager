// ===================================================================================================
// APPLICATION VARIABLES =============================================================================
// ===================================================================================================
export const TITLE = process.env.REACT_APP_TITLE;
export const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;
export const ISSUER = process.env.REACT_APP_ISSUER;
export const STORAGE_ACCOUNT = process.env.REACT_APP_STORAGE_ACCOUNT;

export const STORAGE_SAS = process.env.REACT_APP_STORAGE_SAS;

//POWERBI

// EMAIL
export const EMAIL_TEMPLATE_PASSWORD_RESET = process.env.REACT_APP_EMAIL_TEMPLATE_PASSWORD_RESET;
export const EMAIL_TEMPLATE_PASSWORD_RESET_IOS =
  process.env.REACT_APP_EMAIL_TEMPLATE_PASSWORD_RESET_IOS;
export const EMAIL_TEMPLATE_WELCOME = process.env.REACT_APP_EMAIL_TEMPLATE_WELCOME;
export const EMAIL_TEMPLATE_WELCOME_IOS = process.env.REACT_APP_EMAIL_TEMPLATE_WELCOME_IOS;
export const EMAIL_TEMPLATE_WELCOME_IOS_NEW = process.env.REACT_APP_EMAIL_TEMPLATE_WELCOME_IOS_NEW;
export const EMAIL_TEMPLATE_CONTACT_US = process.env.REACT_APP_EMAIL_TEMPLATE_CONTACT_US;

const SERVICES_DEFINITION = [];

SERVICES_DEFINITION["RECOVRR-IOS"] = {
  URL: process.env.REACT_APP_APIM_URL + "/ios",
  subscription_key: process.env.REACT_APP_SUBSCRIPTION,
};

SERVICES_DEFINITION["ROTTEN"] = {
  URL: process.env.REACT_APP_APIM_URL + "/rotten",
  subscription_key: process.env.REACT_APP_SUBSCRIPTION,
};

export const SERVICES = SERVICES_DEFINITION;

export const FORGOT_PASSWORD = process.env.REACT_APP_FORGOT_PASSWORD;

//*******************************************************
//Metadata
//*******************************************************
var dataset = document.getElementById("GLOBAL_INFO")
  ? document.getElementById("GLOBAL_INFO").dataset
  : {};
export const REMOTE_INSTANCE = dataset.remoteinstance === "true" ? true : false;
export let REMOTE_CLAIM = {};
export const IDLE_TIMEOUT = parseInt(dataset.idletimeout);
export const BAOBAB_TIMEOUT = 540000;
export const ENV_VAR = dataset.envvar;
export const CLIENT_NAME = dataset.clientname;
export const DOMAIN = dataset.domain;
export const GET_SESSION_URL = dataset.getsessionurl;
export const SESSION_KEY = dataset.sessionkey;
export const SUB_KEY = dataset.subscriptionkey;
export const CDN_BASE_URL = dataset.cdnbaseurl;
export const CDN_PRIVATE_URL = dataset.cdnprivateurl;
export const CDN_CSS_FILE = dataset.cdncssfile;
export const API_MAN_ENV_VAR = dataset.apimanagerenvvar;
export const DISCOVERY_KEY = dataset.discoverykey;
export const CLIENT_ID = dataset.clientid;
export const TOKEN_URL = dataset.tokenurl;
//Begin B2C Variables
export const B2C_CLIENT_ID = dataset.b2cclientid;
export const B2C_TENANT = dataset.b2ctenant;
export const B2C_TENANT_LOGIN = dataset.b2ctenantlogin;
export const B2C_LOGIN_SIGNUP_POLICY = dataset.b2cloginsignuppolicy;
export const B2C_PASSWORD_RESET_POLICY = dataset.b2cpasswordresetpolicy;
export let B2C_LOGIN_SIGNUP_POLICY_URL = "";
export let B2C_PASSWORD_RESET_POLICY_URL = "";
export let B2C_LOGOUT_POLICY_URL = "";
//End B2C Variables
//Begin Siteminder Variables
export const SITEMINDER_AUTH = dataset.siteminderauth === "true" ? true : false;
export const SITEMINDER_CLIENTID = dataset.siteminderclientid;
export const SITEMINDER_ENCODED_COOKIE = dataset.siteminderencodedcookie === "true" ? true : false;
export const SITEMINDER_LOGIN_URL = dataset.siteminderloginurl;
export let SITEMINDER_CLAIM = {};
//End Siteminder Variables
//Begin Remote OIDC Variables
export const REMOTE_OIDC_AUTH = dataset.remoteoidcauth === "true" ? true : false;
export const REMOTE_OIDC_CLIENT_ID = dataset.remoteoidcclientid;
export const REMOTE_OIDC_AUDIENCE = dataset.remoteoidcaudience;
export const REMOTE_OIDC_ACCESS_URL = dataset.remoteoidcaccessurl;
export const REMOTE_OIDC_AUTHORIZE_URL = dataset.remoteoidcauthorizeurl;
export const REMOTE_OIDC_REDIRECT_URL = dataset.remoteoidcredirecturl;
export const REMOTE_OIDC_SIGNOUT_URL = dataset.remoteoidcsignouturl;
//End Remote OIDC Variables
//Begin OIDC Variables
export const OIDC_CONTEXT_CLAIM = dataset.oidccontextclaim;
export const OIDC_VALUE_CLAIM = dataset.oidcvalueclaim;
export const OIDC_LOCAL_CONFIG = dataset.oidclocalconfig === "true" ? true : false;
//End OIDC Variables
export const ACCESS_URL =
  "https://" +
  B2C_TENANT_LOGIN +
  "/" +
  B2C_TENANT +
  "/v2.0/.well-known/openid-configuration?p=" +
  B2C_LOGIN_SIGNUP_POLICY;
export const TOKEN_PREFIX = "@!!!@";

//*******************************************************
//Azure Error Codes
//*******************************************************
export const FORGOT_PASSWORD_CODE = "AADB2C90118";
export const CANCEL_CODE = "AADB2C90091";

// Dataservice Message
export const ON_FAIL = "ON_FAIL";
export const ALWAYS = "ALWAYS";
export const NEVER = "NEVER";
