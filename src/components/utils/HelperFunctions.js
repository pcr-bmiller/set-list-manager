//Export from table
import converter from "json-2-csv";
import FileSaver from "file-saver";
import str2ab from "string-to-arraybuffer";
import moment from "moment";
import { TOKEN_PREFIX, SERVICES, BAOBAB_TIMEOUT } from "../../globals/Variables";
import * as AppModels from "../../AppModels";

export function getBaseURL() {
  return (
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "")
  );
}

//Formats dates from YYYY-MM-DD to MM/DD/YYYY
export function formatDate(inputDate) {
  return (
    inputDate.substring(5, 7) + "/" + inputDate.substring(8, 10) + "/" + inputDate.substring(0, 4)
  );
}

export function formatFromUTCtoLocal(UTCDate, dateFormat) {
  let UTC = moment.utc(UTCDate);
  UTC = moment(UTC).local();
  return UTC.format(dateFormat);
}

export function getStartDateByRule(endDate, rule, isISO) {
  var date = endDate;

  if (isISO) {
    date = new Date(endDate);
  }

  switch (rule) {
    case "WTD":
      var weekstart = date.getDate() - date.getUTCDay() + 1;
      date = new Date(date.setDate(weekstart));
      break;
    case "MTD":
      date = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);
      break;
    case "QTD":
      var quarter = Math.floor(date.getUTCMonth() / 3);
      date = new Date(date.getUTCFullYear(), quarter * 3, 1);
      break;
    case "YTD":
      date = new Date(date.getUTCFullYear(), 0, 1);
      break;
    default:
      break;
  }

  if (isISO) {
    return date.toISOString().substring(0, 10);
  } else {
    return date;
  }
}

export function downloadCSV({ data, fileName }) {
  var options = { DELIMITER: { WRAP: '"' }, emptyFieldValue: "" };
  converter.json2csv(
    data,
    (err, CSV) => {
      CSV = str2ab(CSV);
      var blob = new Blob([CSV], { type: "text/csv" });
      if (blob) {
        FileSaver.saveAs(blob, fileName);
      }
    },
    options
  );
}

export function isToken(string) {
  return string.startsWith(TOKEN_PREFIX);
}

export function getPreviousDay(day) {
  let yesterday = new Date(day);
  yesterday.setDate(day.getDate() - 1);
  return yesterday;
}

export function getFirmContext(contexts) {
  for (let i in contexts) {
    if (contexts[i].Parameter === "firm-id") {
      return contexts[i].Value;
    }
  }
  return -1;
}

export function numberWithCommas(x, fractionDigits) {
  if (!x) {
    x = 0;
  }
  if (!fractionDigits) {
    x = 0;
  }
  return x.toLocaleString("en-US", { minimumFractionDigits: fractionDigits });
}

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function nullOrFalse(setting) {
  return setting === undefined || setting === null || setting === false || setting === "false"
    ? false
    : true;
}

export function setPolicyBoolean(policy) {
  return policy && policy.Value.toLowerCase() === "true" ? true : false;
}

// ********************* Used to remove values from array      *********************
// ********************* arr    = Array                        *********************
// ********************* value  = value to remove from array   *********************
// ********************* Example: array = ['a','b','c']        *********************
// ********************* removeArray(array,'b')                *********************
// ********************* results: ['a','c']                    *********************
export function removeArray(arr) {
  var what,
    a = arguments,
    L = a.length,
    ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

// ********************* Used to determine if any changes have been made since load of data          *********************
// ********************* oldState    = State of a form on load                                       *********************
// ********************* newState    = State after field update                                      *********************
// ********************* dirtyFields = Array of fields on form that have been changed from oldState  *********************
// ********************* field       = Field being updated                                           *********************

export function isDirty(oldState, newState, dirtyFields, field) {
  try {
    if (String(newState[field]).toString() !== String(oldState[field]).toString()) {
      if (!dirtyFields.includes(field)) {
        dirtyFields.push(field);
      }
    } else {
      if (dirtyFields.includes(field)) {
        dirtyFields = removeArray(dirtyFields, field);
      }
    }
  } catch (e) {
    // Silently Catch error here and don't hurt implementations of this function
  }

  if (dirtyFields.length > 0) {
    return true;
  } else {
    return false;
  }
}
export function toAscii(str) {
  if (str) {
    return str.replace(/[^\x00-\x7F]/g, "");
  } else {
    return str;
  }
}
// ********************* Used to load JSON content from a local JSON file                            *********************
// ********************* fileName    = Path of file to read                                          *********************
export async function loadJSON(fileName) {
  return new Promise((resolve, reject) => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", fileName, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (
        (xobj.readyState === 4 || xobj.readyState === "4") &&
        (xobj.status === "200" || xobj.status === 200)
      ) {
        resolve(xobj.responseText);
      }
    };
    xobj.send(null);
  });
}

export function formatAMPM(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  month = month <= 9 ? `0${month}` : month;
  day = day <= 9 ? `0${day}` : day;
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  // let strTime = hours + ":" + minutes;
  let strDate = month + "/" + day + "/" + year;
  // let strDate = year + "-" + month + "-" + day;
  return strDate + " " + strTime;
}

export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);

  var seconds = ((millis % 60000) / 1000).toFixed(0);

  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export async function refreshTokenBAOBAB() {
  let services = SERVICES;
  let token = await AppModels.getTokenBAOBAB({
    services,
  });

  if (token) {
    // Tokens last 10 minutes, set it to expire in 9 minutes
    let created = parseInt(new Date().getTime());

    document.cookie = `x_baobab_token=${token}`;
    document.cookie = `x_baobab_token_created=${created}`;

    let tokenPing = await AppModels.getTokenPingBAOBAB({
      services,
    });
    let milliSeconds = tokenPing * 1000;
    let expirationTime = created + milliSeconds;
    document.cookie = `x_baobab_token_expiration=${expirationTime}`;
    if (tokenPing) {
      document.cookie = `x_baobab_token_expiration_seconds=${tokenPing}`;
    }
  }
  return null;
}

export async function pingTokenBAOBAB() {
  let services = SERVICES;
  let token = getCookie("x_baobab_token");

  if (token) {
    let tokenPing = await AppModels.getTokenPingBAOBAB({
      services,
    });
    let milliSeconds = tokenPing * 1000;

    if (tokenPing) {
      return milliSeconds;
    }
  }
  return null;
}
