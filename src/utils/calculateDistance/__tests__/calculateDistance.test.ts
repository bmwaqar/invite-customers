import { getCustomersIn100KmRangeOfDublin } from '../../../getCustomers';
import { dublinCoordinates } from '../../constants';
import { outputCustomers, rawCustomersData } from '../../mockData';
import { RawCustomerMap } from '../../types';
import { distanceInKmFromDublin } from '../index';
import {
  allSortedCustomers,
  outputCustomersWithoutCorruptEntries,
  rawCorruptCustomersData,
  rawCustomersDataWithCorruptEntries,
  sortedCustomerIdsOutside100Km,
  sortedCustomerIdsWithin100Km,
} from './../../mockData/customersMockData';

describe('distanceInKmFromDublin', () => {
  it('should be close to 0 for distanceInKmFromDublin(dublinCoordinates))', () => {
    const distance = distanceInKmFromDublin(dublinCoordinates);
    expect(distance).toBeCloseTo(0);
  });
  it.each(sortedCustomerIdsWithin100Km)('should be closer than or equals to 100 km', (firstArg) => {
    const customer = allSortedCustomers[firstArg];
    const distance = distanceInKmFromDublin({
      latitude: Number(customer.latitude),
      longitude: Number(customer.longitude),
    });
    expect(distance).toBeLessThanOrEqual(100);
  });
  it.each(sortedCustomerIdsOutside100Km)('should be farther than 100 km', (firstArg) => {
    const customer = allSortedCustomers[firstArg];
    const distance = distanceInKmFromDublin({
      latitude: Number(customer.latitude),
      longitude: Number(customer.longitude),
    });
    expect(distance).toBeGreaterThan(100);
  });
});
describe('getCustomersIn100KmRangeOfDublin', () => {
  it('should match outputCustomers for getCustomersIn100KmRangeOfDublin(rawCustomersData)', () => {
    const customerMap: RawCustomerMap = getCustomersIn100KmRangeOfDublin(rawCustomersData);
    expect(customerMap).toMatchObject(outputCustomers);
  });
  it('should create empty object with corrupt data getCustomersIn100KmRangeOfDublin(rawCorruptCustomersData)', () => {
    const customerMap: RawCustomerMap = getCustomersIn100KmRangeOfDublin(rawCorruptCustomersData);
    expect(customerMap).toMatchObject({});
  });
  it('should create object with some data getCustomersIn100KmRangeOfDublin(rawCustomersDataWithCorruptEntries)', () => {
    const customerMap: RawCustomerMap = getCustomersIn100KmRangeOfDublin(rawCustomersDataWithCorruptEntries);
    expect(customerMap).toMatchObject(outputCustomersWithoutCorruptEntries);
  });
});
