import {City} from './city.enum';
import { Accomodation } from './accomodation.type.js';
import { OfferType } from './offerType.enum.js';

export type MockData = {
  titles: string[],
  descriptions: string[],
  cities: City[],
  previewPaths : string[],
  images : string[],
  types: OfferType[];
  accommodations: Accomodation[];
  userNames: string[];
  emails : string[],
  avatarPaths : string[],
  locations: string[]
}

