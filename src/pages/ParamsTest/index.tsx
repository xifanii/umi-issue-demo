import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const Page: React.FC = () => {
  const { params } = useModel('ParamsTest.model');
  
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        Explore Open Source Datasets
        <div className={styles.sectionBox}>
          test useParams & useSearchParams
        </div>
        <div>{ JSON.stringify(params) }</div>
        {/* Local Datasets
        <div className={styles.sectionBox}>
        </div> */}
      </div>
    </PageContainer>
  );
};

export default Page;
