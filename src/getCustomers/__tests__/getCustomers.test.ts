import { outputCustomers, rawCustomersData } from '../../utils/mockData/customersMockData';
import { getCustomersIn100KmRangeOfDublin } from '../getCustomers';

describe('test distance in Km from Dublin function', () => {
  test('should return customers in 100 km radius of Dublin', () => {
    const customers = getCustomersIn100KmRangeOfDublin(rawCustomersData);
    expect(customers).toMatchObject(outputCustomers);
  });
});
