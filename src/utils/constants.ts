import { get } from 'config';
import path from 'path';
import { GPSCoordinates } from './types';
/**
 * Using Dublin Coordinates
 */
export const dublinCoordinates: GPSCoordinates = {
  latitude: 53.339428,
  longitude: -6.257664,
};
/**
 * Using mean earth radius, (for the WGS84 ellipsoid)
 */
export const earthRadiusKm = 6371.009;
export const appName = 'InviteCustomers';
export const appStartDir = path.dirname(`${require?.main?.filename}`);
export const ioFolder =
  process.env.NODE_ENV !== 'production' ? path.resolve(appStartDir, `../io`) : path.resolve(appStartDir, `../../io`);
export const inputFileName = (get('customers.inputFile.name') as string) || 'customers.txt';
export const outputFileName = (get('customers.outputFile.name') as string) || 'output.txt';
export const propertiesOfCustomer = ['latitude', 'longitude', 'user_id', 'name'];
