import { request } from '@umijs/max';

/**
 * custom request定义：
 * 1、request默认返回接口协议里的data字段&根据code判断是否抛出错误
 * 2、添加options：shouldReturnCodeRsp为true，可跳过默认code错误处理，且返回完整后台数据
 * 3、添加options：skipErrorHandler可跳过默认的报错提示
 */

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/** 数据集列表 */
export async function fetchDatasetList(
  params: {
    page: number;
    pageSize: number;
  },
  options?: { [key: string]: any },
) {
  await sleep(2000);
  return request<API.FetchDatasetListRsp>(`/api/fetchDatasetList`, {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}
