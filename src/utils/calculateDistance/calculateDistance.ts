import { dublinCoordinates, earthRadiusKm } from '../constants';
import { GPSCoordinates } from '../types';
import { Customer } from './../types';

const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

// const haversineFunction = (absoluteDifference: number) => Math.pow(Math.sin(absoluteDifference / 2), 2);

const distanceInKmBetweenEarthCoordinates = (
  coordinateOne: GPSCoordinates,
  coordinateTwo: GPSCoordinates,
  formula: (coordinateOne: GPSCoordinates, coordinateTwo: GPSCoordinates) => number,
) => {
  return earthRadiusKm * formula(coordinateOne, coordinateTwo);
};

// export const haversineInKM = (coordinateOne: GPSCoordinates, coordinateTwo: GPSCoordinates) => {
//   const { latitude: latitude1, longitude: longitude1 } = coordinateOne;
//   const { latitude: latitude2, longitude: longitude2 } = coordinateTwo;

//   const latitudeDifference = degreesToRadians(latitude2 - latitude1);
//   const longitudeDifference = degreesToRadians(longitude2 - longitude1);

//   const latitude1InRadian = degreesToRadians(latitude1);
//   const latitude2InRadian = degreesToRadians(latitude2);

//   const a =
//     haversineFunction(latitudeDifference) +
//     Math.cos(latitude1InRadian) * Math.cos(latitude2InRadian) * haversineFunction(longitudeDifference);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return c;
// };

const sphericalLawOfCosines = (coordinateOne: GPSCoordinates, coordinateTwo: GPSCoordinates) => {
  const { latitude: latitude1, longitude: longitude1 } = coordinateOne;
  const { latitude: latitude2, longitude: longitude2 } = coordinateTwo;

  const longitudeDifference = degreesToRadians(longitude2 - longitude1);

  const latitude1InRadian = degreesToRadians(latitude1);
  const latitude2InRadian = degreesToRadians(latitude2);

  const centralAngle = Math.acos(
    Math.sin(latitude1InRadian) * Math.sin(latitude2InRadian) +
      Math.cos(latitude1InRadian) * Math.cos(latitude2InRadian) * Math.cos(longitudeDifference),
  );
  return centralAngle;
};

export const distanceInKmFromDublin = (
  coordinates: GPSCoordinates,
  formula: (coordinateOne: GPSCoordinates, coordinateTwo: GPSCoordinates) => number = sphericalLawOfCosines,
) => distanceInKmBetweenEarthCoordinates(dublinCoordinates, coordinates, formula);

const customerInKmRadiusOfDublin = (customer: Customer, kilometers: number) =>
  distanceInKmFromDublin({ latitude: customer.latitude, longitude: customer.longitude }) < kilometers;

// const customersInKmRadiusOfDublin = (customers: Customer[], kilometers: number) =>
// customers.filter((customer) => customerInKmRadiusOfDublin(customer, kilometers));

export const customerInUnder100KmOfDublin = (customer: Customer) => customerInKmRadiusOfDublin(customer, 100);
// export const customersInUnder100KmOfDublin = (customers: Customer[]) => customersInKmRadiusOfDublin(customers, 100);
