import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, List } from 'antd';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { fetchDatasetList } from '@/services/dataset';

// 提前加载
export async function clientLoader() {
  const data = await fetchDatasetList({ page: 1, pageSize: 20 });
  console.log('>>>>>>>> clent loader', data);
  return data;
}

const HomePage: React.FC = () => {
  const { datasetList, clickItem } = useModel('Home.model');
  
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        Explore Open Source Datasets
        <div className={styles.sectionBox}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={datasetList}
          renderItem={item => (
            <List.Item>
              <Card hoverable title={item.name} onClick={()=>clickItem(item)}>Card content</Card>
            </List.Item>
          )}
        />
        </div>
        {/* Local Datasets
        <div className={styles.sectionBox}>
        </div> */}
      </div>
    </PageContainer>
  );
};

export default HomePage;
