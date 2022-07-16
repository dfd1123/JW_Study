import React, { createContext, useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

export interface RouteMeta {
  [key: string]: any;
}
export interface Route {
  path: string;
  redirect?: string;
  element?: JSX.Element;
  meta?: RouteMeta;
}

type MiddlewareFunc = (route: Route) => Route;

interface PropsType {
  routeList: Route[];
  className?: string;
  middleWare?: MiddlewareFunc;
}

const defaultValue: { routeInfo: Route | null } = { routeInfo: null };

export const RouteInfoContext = createContext(defaultValue);

export function RouterView({
  routeList,
  className = 'router-wrapper',
  middleWare = (route) => route,
}: PropsType) {
  /**
   * @description route middlewareGanerator 함수이며 Route 배열과 네비게이션가드 function을 전달 받으면 
   * 각 route 마다 네비게이션가드 함수를 호출하여 검증
   */
  const middlewareGanerator = (
    routes: Route[],
    guardCustomFunc: MiddlewareFunc
  ) => {
    return routes.map((route) => {
      if (route.redirect) {
        route.element = <Navigate to={route.redirect} replace={true} />;
        return { ...route, element: route.element };
      } else {
        const newRoute = guardCustomFunc({ ...route });
        return { ...route, ...newRoute };
      }
    });
  };

  /**
   * @description 현재 routing될 컴포넌트의 route 정보를 추출하여 {routeInfo, meta} 형식으로 반환
   */
  const getCurrentRouteInfo = (
    currentComponent: React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    > | null
  ): { routeInfo: Route | null; meta: RouteMeta } => {
    if (!currentComponent) return { routeInfo: null, meta: {} };
    const routeInfo = routes.find((route) => {
      let lastIndex = 0;
      if (currentComponent.props.value.outlet) {
        lastIndex =
          currentComponent.props.value.outlet.props.value.matches.length - 1;
        return (
          currentComponent.props.value.outlet.props.value.matches[lastIndex]
            .route.path === route.path
        );
      } else {
        lastIndex = currentComponent.props.value.matches.length - 1;
        return (
          currentComponent.props.value.matches[lastIndex].route.path ===
          route.path
        );
      }
    });

    return { routeInfo: routeInfo ?? null, meta: routeInfo?.meta ?? {} };
  };

  console.log('routing!');

  /**
   * @description middleware 검증 후 Route 배열 정보를 routes 변수에 저장
   */
  const routes = middlewareGanerator(routeList, middleWare);

  /**
   * @description useRoutes 훅을 사용하여 현재 routing 될 컴포넌트 정보를 routing 변수에 저장
   */
  const routing = useRoutes([...routes]);

  const { routeInfo, meta } = getCurrentRouteInfo(routing);

  return (
    <RouteInfoContext.Provider value={{ routeInfo }}>
      <div className={className}>{Boolean(routeInfo?.element) && routing}</div>
    </RouteInfoContext.Provider>
  );
}

export const useRouteInfo = () => {
  const { routeInfo } = useContext(RouteInfoContext);

  return routeInfo;
};

export default {
  RouterView,
  RouteInfoContext,
  useRouteInfo,
};
