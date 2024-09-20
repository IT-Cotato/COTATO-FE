export interface Place {
  placeName: string;
  location: {
    latitude: number;
    longitude: number;
  };
  addressName?: string;
  phone?: string;
}
