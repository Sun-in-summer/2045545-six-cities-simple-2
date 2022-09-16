
import { Accomodation } from './accomodation.type.js';
import { Location } from './location.type.js';
import { OfferType } from './offerType.enum.js';
import { User } from './user.type.js';


export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  previewPath: string;
  images: string[];
  premium: boolean;
  rating: number;
  type: OfferType;
  roomQuantity: number;
  guestsQuantity: number;
  price: number;
  accommodations: Accomodation[];
  user: User;
  commentsQuantity: number;
  location: Location;

}
