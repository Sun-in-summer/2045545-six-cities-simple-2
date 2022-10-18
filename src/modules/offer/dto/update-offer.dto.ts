import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offerType.enum.js';


export default class CreateOfferDto {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public city?: City;//
  public previewPath?: string;
  public images?: string[];
  public isPremium?: boolean;
  public rating?: number;
  public type?: OfferType;
  public roomQuantity?: number;
  public guestsQuantity?: number;
  public price?: number;
  public accommodations?: string[];
  public latitude?: number;
  public longitude?: number;
}