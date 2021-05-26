export interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

export interface Customer extends GPSCoordinates {
  name: string;
  user_id: number;
}
export interface RawCustomer {
  name: string;
  user_id: number;
  latitude: string;
  longitude: string;
}

export interface RawCustomerMap {
  [userId: number]: RawCustomer;
}
