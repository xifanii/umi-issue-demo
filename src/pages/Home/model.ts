import { useState, useEffect } from 'react';
import { history, useClientLoaderData } from '@umijs/max';
// import { fetchDatasetList } from '@/services/dataset';

export default () => {
    const { data } = useClientLoaderData();
    const [ datasetList, setDatasetList] = useState<DATA.DataSet[]>(data.datasetList||[]);
    const clickItem = (item: DATA.DataSet) => {
        history.push(`/dataset/${item.id}?name=${item.name}`);
    }
    console.log('>>>>>>>>', datasetList);

    useEffect(() => {
        setDatasetList(data.datasetList);
    }, [data]);

    return {
        datasetList,
        clickItem,
    }
};
