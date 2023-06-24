import * as globals from "../../globals/Variables";
import * as dataService from "./DataService";
import { getCookie } from "../utils/HelperFunctions";
let services = globals.SERVICES;
// ********* sendEmail **************
// Options:
// services = this.prop.services
// data =  { From: 'bobby@recovrr.org', To: data.Email, DynamicTemplateData: { redirecturl: globals.B2C_PASSWORD_RESET_POLICY_URL } };
// template =  globals.EMAIL_TEMPLATE_PASSWORD_RESET
//
// DynamicTemplateData:
// Pass in list of dynamic data for the emails via DynamicTemplateData as in above example
// The variables can be used in the SendGrid templates by referencing the var wrapped in curly brackets e.g. {{redirecturl}}

export async function sendEmail({ services, data, template }) {
  let body = await createBody(data, template);
  await sendEmailAPI({
    services,
    body,
  });
}

export async function createBody(data, template) {
  // Pass in list of dynamic data for the emails
  // The variables can be used in the SendGrid templates by referencing the var wrapped in curly brackets e.g. {{redirecturl}}
  let dynamicVars = data["DynamicTemplateData"];

  let finalData = {
    from: data["From"] ? data["From"] : "admin@recovrr.org",
    to: data["To"],
    templateid: template ? template : globals.EMAIL_TEMPLATE_WELCOME,
    dynamicTemplateData: dynamicVars ? dynamicVars : "",
  };

  return finalData;
}

export async function sendEmailAPI({ body }) {
  const service = services["RECOVRR-EMAIL"];

  let fetchProperties = {
    BaseUrl: `${service.URL}/send-email`,
    Method: "POST",
    SuccessMessage: "Email successfully sent!",
    FailureMessage: "Email Failed.  Please contact the site administrator.",
    SuppressMessageOverride: false,
    ShowMessage: globals.ALWAYS,
    CallBody: body.dynamicTemplateData,

    HeaderVals: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": service.subscription_key,
      from: body.from,
      to: body.to,
      templateid: body.templateid,
      Authorization: `Bearer ${getCookie("x_universal_id")}`,
      Environment: getCookie("x_environment") ? getCookie("x_environment") : "Test",
    },
  };
  let response = await dataService.FetchData(fetchProperties);

  if (response) {
    return response;
  } else {
    return { error: true };
  }
}
