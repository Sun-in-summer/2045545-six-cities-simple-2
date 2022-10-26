import { Accommodation } from './accommodation.enum';
import {City} from './city.enum';
import { OfferType } from './offerType.enum.js';

export type MockData = {
  titles: string[],
  descriptions: string[],
  cities: City[],
  previewPaths : string[],
  images : string[],
  types: OfferType[];
  accommodations: Accommodation[];///
  userNames: string[];
  emails : string[],
  avatarPaths : string[],
  locations: string[]
}

