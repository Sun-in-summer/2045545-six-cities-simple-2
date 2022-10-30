import { Accommodation } from './accommodation.enum.js';
import { City } from './city.enum.js';
import { Location } from './location.type.js';
import { OfferType } from './offerType.enum.js';
import { User } from './user.type.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewPath: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: OfferType;
  roomQuantity: number;
  guestsQuantity: number;
  price: number;
  accommodations: Accommodation[];
  user: User;
  commentsQuantity: number;
  location: Location;

}
