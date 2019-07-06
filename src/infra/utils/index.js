import {
  clone,
  capitalize,
  cloneDeep,
  isEqual,
  get,
  isNil,
  uniqBy,
  merge,
  intersection,
  intersectionBy,
  compact,
  uniqueId,
  debounce,
  pick,
  memoize,
  random,
  isEmpty,
  omit,
  pull,
  set,
  remove
} from "lodash";
import React from "react";
import { userTypes } from "../../vars/enums";

export function capitalizeAllWords(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1)
  );
}

export function isArrayWithElements(val) {
  return Array.isArray(val) && val.length > 0;
}

export function isObject(val) {
  return val !== null && typeof val === "object";
}

export function getFilePathFromLocalUri(localUri) {
  return localUri.replace("file:///", "");
}

export const intersectList = (originalDataList, newDataList) => {
  if (!originalDataList || !originalDataList.length) {
    return newDataList;
  }
  if (!newDataList || !newDataList.length) {
    return originalDataList;
  }
  const originalIds = {};
  originalDataList.forEach(item => {
    if (isObject(item)) {
      const id = item.entityId || item.id;
      originalIds[id] = true;
    } else {
      originalIds[item] = true;
    }
  });

  const filteredNewDataList = newDataList.filter(item =>
    isObject(item) ? !originalIds[item.id] : !originalIds[item]
  );
  return [...originalDataList, ...filteredNewDataList];
};

export const appendQueryParam = (uri, key, value) => {
  if (!value) {
    return uri;
  } else {
    const separator = uri.indexOf("?") !== -1 ? "&" : "?";
    return `${uri}${separator}${key}=${value}`;
  }
};

export function dropTestIdFromChildren(children) {
  return React.Children.map(children, child => {
    let childProps = child.props;
    if (child.props.testID) {
      childProps = clone(child.props);
      childProps.testID = Math.random().toString();
      return React.cloneElement(child, childProps);
    } else {
      return child;
    }
  });
}

export const deleteObjectPropFromArrayOfObjects = ({ arr, propName }) => {
  if (arr && arr.length) {
    const retVal = arr.map(obj => {
      if (obj[propName]) {
        const tmp = { ...obj };
        delete tmp[propName];
        return tmp;
      }
      return obj;
    });
    return retVal;
  }
  return null;
};

export const getKeyByValue = (obj, value) =>
  Object.keys(obj).find(key => obj[key] === value);

export const arrayToStringByKey = ({ array, key }) =>
  array.reduce((total, current) => total + current[key], "");

export async function delayInMilliseconds(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export const isAppAdmin = user =>
  [userTypes.ADMIN, userTypes.SUPER_ADMIN].includes(user.userType);

export {
  clone,
  capitalize,
  cloneDeep,
  isNil,
  omit,
  isEqual,
  get,
  uniqBy,
  merge,
  intersection,
  intersectionBy,
  compact,
  uniqueId,
  debounce,
  pick,
  memoize,
  random,
  isEmpty,
  pull,
  set,
  remove
};
