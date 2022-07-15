import {Route} from '@/router';
import TodoList from '@/views/pages/todo/TodoList';

const todo : Route[] = [
  {
    path: '/list',
    element: <TodoList />
  }
];

export default todo;