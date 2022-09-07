import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'demo',
    layout: 'top',
  },
  clientLoader: {},
  routes: [
    {
      path: '/',
      // redirect: '/home',
      name: '111',
      // path: '/home',
      component: './Home',
    },
    {
      path: '/params/:id',
      name: 'test',
      component: './ParamsTest',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
    },
  ],
  npmClient: 'pnpm',
});

