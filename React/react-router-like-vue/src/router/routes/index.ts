import { Route } from '@/router';
import common from './common';
import todo from './todo';

const routeList: Route[] = [
    ...common,
    ...todo,
];

export default routeList;
