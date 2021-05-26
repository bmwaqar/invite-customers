import { propertiesOfCustomer } from '../constants';
import { Customer, RawCustomer } from '../types';

/**
 * Replaces CRLF (carriage return line feed) in a text to LF (line feed) using string replace function, to keep users for putting in extra checks to handle line ending.
 * @param text A string from which CRLF is replaced by LF.
 */
/**
 * Replaces CRLF (carriage return line feed) in a text to LF (line feed) using string replace function, to keep users for putting in extra checks to handle line ending.
 * @param text A string from which CRLF is replaced by LF.
 */

const convertStringToInteger = (text: string) => parseInt(text);
const convertStringToNumber = (text: string) => parseFloat(text);
const cleanCustomerRecord = (customer: RawCustomer): Customer => {
  return {
    name: customer.name?.trim(),
    user_id: Number.isInteger(customer.user_id) ? convertStringToInteger(customer.user_id.toString()) : 0,
    latitude: convertStringToNumber(customer.latitude),
    longitude: convertStringToNumber(customer.longitude),
  };
};
export const convertCustomerToRawCustomer = (customer: Customer): RawCustomer => ({
  name: customer.name?.trim(),
  user_id: customer.user_id,
  latitude: customer.latitude.toString(),
  longitude: customer.longitude.toString(),
});
const haveAllRequiredProperties = (rawCustomer: RawCustomer) =>
  propertiesOfCustomer.every((prop) => prop in rawCustomer);

export const validateDataToBeCustomer = (data: string) => {
  try {
    const rawCustomer: RawCustomer = JSON.parse(data);
    if (!haveAllRequiredProperties(rawCustomer)) return undefined;
    const customer: Customer = cleanCustomerRecord(rawCustomer);
    return customer?.user_id ? customer : undefined;
  } catch (error) {
    return undefined;
  }
};
