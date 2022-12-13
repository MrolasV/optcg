import * as React from 'react';
import { useRouteError } from 'react-router';

const RouteErrorView = (): JSX.Element => {
  const routeError = useRouteError();
  console.log(routeError);
  return <div>
    <div>Hey! There was a route error.</div>
    <div>{JSON.stringify(routeError, null, 2)}</div>
  </div>
}

export default RouteErrorView;