function getCurrentRouteName(navState, { withParams } = {}) {
  if (!navState) {
    return null;
  }
  const route = navState.routes[navState.index];

  if (route.routes) {
    return getCurrentRouteName(route, { withParams }); // nested routes
  } else {
    if (withParams) {
      return {
        name: route.routeName,
        params: { ...route.params }
      };
    }
    return route.routeName;
  }
}

export { getCurrentRouteName }; // eslint-disable-line import/prefer-default-export
