import { NavigationActions, StackActions } from "react-navigation";
import { screenNames, screenGroupNames } from "/vars/enums";
import { isEqual } from "/infra/utils";
import { getCurrentRouteName as getCurrentRouteNameUtil } from "./utils";

const NON_RESETTABLE_SCREENS = {
  [screenNames.CreateGroup]: true,
  [screenNames.CreateEvent]: true,
  [screenNames.EventEdit]: true,
  [screenNames.CreatePage]: true,
  [screenNames.PostEditor]: true,
  [screenNames.AddListItem]: true
};

let _navigator;
let _deferredNavigation;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function getCurrentRouteName({ withParams } = {}) {
  return getCurrentRouteNameUtil(_navigator.state.nav, { withParams });
}

function navigate(routeName, params, options = {}) {
  const isCurrentRoute = isRequestedRouteIdenticalToCurrent({
    routeName,
    params
  });
  if (isCurrentRoute && !options.tabReset) {
    return;
  }
  if (options.tabReset) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        action: StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName, params })]
        })
      })
    );
  } else if (options.noPush) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  } else {
    _navigator.dispatch(
      StackActions.push({
        routeName,
        params,
        action: options.initialScreen
          ? NavigationActions.navigate({
              routeName: options.initialScreen,
              params
            })
          : null
      })
    );
  }
}

function goBack({ key } = {}) {
  _navigator.dispatch(NavigationActions.back({ key }));
}

function replace(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params
    })
  );
}

function resetToScreen(routeName, key) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key,
      actions: [NavigationActions.navigate({ routeName })]
    })
  );
}

function resetToHomePage(forceReset) {
  const currentRoute = getCurrentRouteName();
  if (!forceReset && NON_RESETTABLE_SCREENS[currentRoute]) {
    return;
  }

  if (currentRoute !== screenNames.HomeTab) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName: screenNames.HomeTab,
        action: StackActions.reset({
          index: 1,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: screenGroupNames.TABS }),
            NavigationActions.navigate({ routeName: screenNames.HomeTab })
          ]
        })
      })
    );
  }
  resetToScreen(screenNames.HomeTab);
}

function navigateToProfile(params, options) {
  const appUserId = global.store.getState().auth.user.id;
  const screenName =
    params && params.entityId === appUserId
      ? screenGroupNames.MY_CITY
      : screenNames.Profile;
  navigate(screenName, params, options);
}

function navigateToMap({ location, title }) {
  navigate(screenNames.MapScreen, { title, location });
}

function deferNavigation(routeName, params) {
  _deferredNavigation = { routeName, params };
}

function conditionallyNavigateToDeferred() {
  if (_deferredNavigation) {
    navigate(_deferredNavigation.routeName, _deferredNavigation.params);
    _deferredNavigation = null;
  }
}

function isRequestedRouteIdenticalToCurrent({ routeName, params = {} }) {
  const currentRoute = getCurrentRouteName({ withParams: true });
  delete currentRoute.params.origin;

  if (currentRoute.name === routeName && isEqual(currentRoute.params, params)) {
    return true;
  }
  return false;
}

export default {
  navigate,
  goBack,
  replace,
  resetToScreen,
  resetToHomePage,
  navigateToProfile,
  navigateToMap,
  deferNavigation,
  conditionallyNavigateToDeferred,
  getCurrentRouteName,
  setTopLevelNavigator
};
