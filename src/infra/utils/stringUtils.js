import { capitalize, camelCase, isString } from "lodash";
import AutoLinker from "autolinker";

import "intl";
import "intl/locale-data/jsonp/en";

export function getInitials(name) {
  let initials = "";
  const words = name.trim().split(" ");
  if (words) {
    initials = words[0].charAt();
  }
  if (words.length > 1) {
    initials += words[words.length - 1].charAt();
  }
  initials = initials.toUpperCase();
  return initials;
}

export function getFirstName(name) {
  return name.trim().split(" ")[0];
}

export function isHebrewOrArabic(text) {
  return /[\u0590-\u06FF]/.test(text);
}

// forcing rtl text to behave like ltr
// https://stackoverflow.com/questions/32710566/how-to-fix-this-right-to-left-script-issue-in-js-string
export function possesify(fullname) {
  let result = "";
  const parts = fullname.trim().split(" ");
  if (parts) {
    if (isHebrewOrArabic(parts[0])) {
      result = `\u202A${parts[0]}'s`;
    } else {
      result = `${parts[0]}'s`;
    }
  }

  return result;
}

export function isRTL(s) {
  if (!s || !isString(s)) {
    return false;
  }
  const rtlChars = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
  const rtlDirCheck = new RegExp(`^[${rtlChars}]+`);

  const noEmojis = s.replace(/[^\u1F600-\u1F6FF\s]/g, "");
  const noHTMLtags = noEmojis
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\d+/g, "")
    .trim();
  return rtlDirCheck.test(noHTMLtags);
}

export function enrichTextWithLinks(text) {
  return AutoLinker.link(text, { truncate: { length: 40, location: "end" } });
}

export function toCurrency(number, currency) {
  let numberToCurrency = number;

  if (typeof number === "string") {
    numberToCurrency = Number(number.replace(/,/g, ""));
  } else if (typeof number !== "number") {
    return 0;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(numberToCurrency);
}

/**
 * Usage: encode '<' char when it used not as HTML opening tag but as 'greater than' sign, thus the HTML parser won't recognise it as opening tag
 */
export function findAndEncodeUnclosedHtmlTags(text) {
  const regex = /(<[^/][\w\s?="/.':;#-/?]?[^>])|(<[^/]?[^>]?)$/g;
  let partialText;
  let encodedPartialText;
  let result = text;
  let m = regex.exec(text);
  while (m !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex += 1;
    }
    partialText = text.substr(m.index, m[0].length);
    encodedPartialText = partialText.replace(/</, "&#60;");
    result = result.replace(partialText, encodedPartialText);
    m = regex.exec(text);
  }
  return result;
}

export function addSpaceOnCapitalsAndCapitalize(text = "") {
  return (text.charAt(0).toUpperCase() + text.slice(1))
    .replace(/(\w)([A-Z])/g, "$1 $2")
    .trim();
}

export function shortenLongWords(sentence) {
  const CHUNK_MAX_SIZE = 8;
  const splitted = sentence.split(" ");
  return splitted
    .map(chunk =>
      chunk.length > CHUNK_MAX_SIZE
        ? `${chunk.substr(0, CHUNK_MAX_SIZE)}..`
        : chunk
    )
    .join(" ");
}

export function joinArrayToString(text) {
  if (Array.isArray(text)) {
    return text.join(",");
  }

  return text;
}

export function prefixWebsite(url) {
  if (!url || !url.length) return "";
  if (url.startsWith("http")) {
    return url;
  } else {
    return `http://${url}`;
  }
}

export function isObjectID(str) {
  return typeof str === "string" && !!str.match(/^[0-9a-f]{24}$/);
}

export function transparentize(hex, opacity) {
  return `${hex}${opacity}`;
}

export function isOnlyEmoji(str) {
  if (!str || !str.trim()) {
    return false;
  }
  const noEmojis = str.replace(/[^\u1F600-\u1F6FF\s]/g, "");
  return !noEmojis;
}

export const getQueriesFromUrl = url => {
  const query = url.split(/[?|#]/)[1];
  return getQueryStringParams(query);
};

export const getQueryStringParams = query =>
  query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          const [key, value] = param.split("=");
          const decodedValue = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : "";
          return { ...params, [key]: decodedValue };
        }, {})
    : {};

export { capitalize, camelCase };
