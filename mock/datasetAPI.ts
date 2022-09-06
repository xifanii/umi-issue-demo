export default {
  'POST /api/fetchDatasetList': (req: any, res: any) => {
    res.json({
      code: 0,
      msg: 'success',
      data: {
        dataset_list: [
          {
            id: '123',
            name: 'Open Images V6',
          },
          {
            id: '222',
            name: 'COCO-Stuff',
          },
        ],
        total: 2,
      },
    });
  }
};
