import { rawCorruptCustomersData, rawCustomerRecord, validatedCustomerRecord } from '../../mockData/customersMockData';
import { validateDataToBeCustomer } from '../dataManipulation';

describe('test raw Data To Be Customer', () => {
  it('should be valid customer data containing latitude longitude user_id name', () => {
    const customer = validateDataToBeCustomer(rawCustomerRecord);
    expect(customer).toMatchObject(validatedCustomerRecord);
  });
  it.each(rawCorruptCustomersData)(
    'should not be valid customer data containing latitude longitude user_id name',
    (corruptCustomerRecord) => {
      const customer = validateDataToBeCustomer(corruptCustomerRecord);
      expect(customer).toBeUndefined();
    },
  );
});
