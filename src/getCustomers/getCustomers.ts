import { customerInUnder100KmOfDublin } from '../utils/calculateDistance';
import { convertCustomerToRawCustomer, validateDataToBeCustomer } from '../utils/dataManipulation';
import { warn } from '../utils/logger';
import { Customer, RawCustomerMap } from '../utils/types';

export const getCustomersIn100KmRangeOfDublin = (rawData: string[]) =>
  rawData.reduce((previousValue, currentValue, index) => {
    if (currentValue) {
      const customer: Customer | undefined = validateDataToBeCustomer(currentValue);
      if (customer && customerInUnder100KmOfDublin(customer)) {
        previousValue[customer.user_id] = convertCustomerToRawCustomer(customer);
      }
    } else {
      warn({ lineNumber: index + 1, customer: currentValue });
    }
    return previousValue;
  }, {} as RawCustomerMap);
