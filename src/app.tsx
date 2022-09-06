// 运行时配置
import { message } from 'antd';
import type { RequestConfig } from '@umijs/max';
import humps from 'humps';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

// layout配置
export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'top', // 顶部导航栏‘
    headerContentRender: () => (<div></div>), // 自定义导航栏左侧
    rightContentRender: false, // 自定义导航栏右侧
    // pageTitleRender: false,
  };
};

/**
 * custom request定义：
 * 1、request默认返回接口协议里的data字段&根据code判断是否抛出错误
 * 2、添加options：shouldReturnCodeRsp为true，可跳过默认code错误处理，且返回完整后台数据
 * 3、添加options：skipErrorHandler可跳过默认的报错提示
 */
export const request: RequestConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // dataField: 'data',
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    // errorThrower: (res: CommonRsp<any>) => {
    //   const { code, data, msg } = res;
    //   console.log('>>>>>>>>> errorThrower', res);
    //   if (code !== 0) {
    //     const error: any = new Error(msg);
    //     error.name = 'CustomError';
    //     error.info = { code, msg, data };
    //     throw error; // 抛出自制的错误
    //   }
    // },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      // 允许跳过errorHandler
      if (opts?.skipErrorHandler) throw error;
      // 处理报错
      if (error.data && error.data.code !== 0) {
        // 请求成果，后台返回code非0
        const { code, msg = '' } = error.data as unknown as CommonRsp<any> || {};
        console.error(error);
        message.error(`${msg}(${code})` || `请求成果、后台返回错误码${code}`);
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status: ${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },
  // 请求拦截器
  requestInterceptors: [
    (config: RequestConfig) => {
      // 拦截请求配置，驼峰->下划线
      if (config.params) {
        config.params = humps.decamelizeKeys(config.params);
      }
      if (config.data) {
        config.data = humps.decamelizeKeys(config.data);
      }      
      return { ...config};
    }
  ],
 
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，下划线->驼峰
      // @ts-ignore
      if (!response.config.shouldReturnCodeRsp) {
        // 直接根据code值返回数据里的data
        // @ts-ignore
        if (response.data?.code === 0) {
          // @ts-ignore
          response.data = humps.camelizeKeys(response.data?.data || {});
          return response;
        } else {
          throw response; // 抛出自制的错误
        }
      } else {
        // 不判断code值，直接返回后台数据
        // @ts-ignore
        response.data = humps.camelizeKeys(response.data);
        return response;
      }
    }
  ]
};
  