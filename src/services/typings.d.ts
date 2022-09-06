/** 公共接口返回定义 */
declare interface CommonRsp<T> {
  code: number;
  msg: string;
  data: T;
}

/** 数据相关定义 */
declare namespace DATA {

  interface DataSet {
    id: string;
    name: string;
  }

  interface SubSet {
    id: string;
    name: string;
  }

  interface DataSetImg {
    id: string;
    image: {
      metadata: Record<string, string>;
      desc: string;
      url: string;
      urlFullRes: string;
    };
    objects: Array<{
      class: string;
      conf: number;
      boundingBox?: {
        xmin: string;
        ymin: string;
        xmax: string;
        ymax: string;
      };
      segmentation?: string;
    }>;
  }
}

/** 接口输入输出相关定义 */
declare namespace API {

  interface FetchDatasetListRsp {
    datasetList: Array<DATA.DataSet>;
    total: number;
  }

  interface FetchSubsetListRsp {
    subsetList: Array<DATA.SubSet>;
    total: number;
  }

  interface FetchSubsetDetailRsp {
    categoryList: Array<{
      [key: string]: string;
    }>;
  }

  interface FetchImgListRsp {
    imgList: Array<DATA.DataSetImg>;
    total: number;
  }
}
