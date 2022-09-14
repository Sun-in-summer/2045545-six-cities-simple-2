import { readFileSync } from 'fs';
import { City } from '../../types/city.enum.js';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offerType.enum.js';
import { FileReaderInterface } from './file-reader.interface.js';


export default class TSVFileReader implements FileReaderInterface {
  private rawData ='';

  constructor(public filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }


  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row)=>row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title,
        description,
        createdDate,
        city,
        previewPath,
        images,
        premium,
        rating,
        type,
        roomQuantity,
        guestsQuantity,
        price,
        accommodations,
        name,
        email,
        avatarPath,
        isPro,
        commentsQuantity,
        longitude,
        latitude]) => ({
        title,
        description,
        postDate : new Date(createdDate),
        city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewPath,
        images: images.split(';'),
        premium: Boolean(premium),
        rating : Number.parseFloat(rating),
        type: OfferType[type as 'Apartment' |'House' | 'Room' | 'Hotel'],
        roomQuantity: Number.parseInt(roomQuantity, 10),
        guestsQuantity: Number.parseInt(guestsQuantity, 10),
        price: Number.parseInt(price, 10),
        accommodations: accommodations.split(';')
          .map((name)=> ({name})),
        user: {
          name,
          email,
          avatarPath,
          isPro: Boolean(isPro)},
        commentsQuantity: Number.parseInt(commentsQuantity, 10),
        location: {
          longitude: Number.parseFloat(longitude),
          latitude: Number.parseFloat(latitude)}

      }));
  }
}
