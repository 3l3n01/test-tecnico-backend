import { ProcessData } from './ProcessData';

// Data validator
import requestOrderData from '../test_data/processData/orderdata.request';
import responseOrderData from '../test_data/processData/orderdata.response';
import requestGroup from '../test_data/processData/group.request';
import responseGroup from '../test_data/processData/group.response';
import requestProcess from '../test_data/processData/process.request';
import responseProcess from '../test_data/processData/process.response';

describe('ProcessData', () => {
  let processData: ProcessData;

  beforeEach(async () => {
    processData = new ProcessData();
  });

  it('OrderData', () => {
    expect(processData.OrderData(requestOrderData)).toStrictEqual(
      responseOrderData,
    );
  });

  it('Group', () => {
    expect(processData.Group(requestGroup)).toStrictEqual(responseGroup);
  });

  it('process', () => {
    expect(processData.process(requestProcess)).toStrictEqual(responseProcess);
  });
});
