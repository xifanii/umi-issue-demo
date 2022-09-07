import { useParams, useSearchParams } from '@umijs/max';

export default () => {
    // 并不能成功获取到正确的params
    const params = useParams();
    // 只要引入useSearchParams就直接报错,娶不到model值
    const [ searchParams, setSearchParams ] = useSearchParams(); 
    console.log('>>>>>>>>>> datasetid', params);

    return {
        params,
    }
};
