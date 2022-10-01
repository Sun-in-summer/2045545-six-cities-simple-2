import { City } from '../types/city.enum.js';
import { Offer } from '../types/offer.type.js';
import { OfferType } from '../types/offerType.enum.js';


export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title,
    description,
    createdDate,
    city,
    previewPath,
    images,
    isPremium,
    rating,
    type,
    roomQuantity,
    guestsQuantity,
    price,
    accommodations,
    userName,
    email,
    avatarPath,
    isPro,
    commentsQuantity,
    longitude,
    latitude] = tokens;
  return {
    title,
    description,
    postDate : new Date(createdDate),
    city: City[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    previewPath,
    images: images.split(';').map((image) => image),
    isPremium: Boolean(isPremium),
    rating : Number.parseFloat(rating),
    type: OfferType[type as 'Apartment' |'House' | 'Room' | 'Hotel'],
    roomQuantity: Number.parseInt(roomQuantity, 10),
    guestsQuantity: Number.parseInt(guestsQuantity, 10),
    price: Number.parseInt(price, 10),
    accommodations: accommodations.split(';')
      .map((name)=> ({name})),
    user: {
      userName,
      email,
      avatarPath,
      isPro: Boolean(isPro)},
    commentsQuantity: Number.parseInt(commentsQuantity, 10),
    location: {
      longitude: Number.parseFloat(longitude),
      latitude: Number.parseFloat(latitude)}}as Offer  ;
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
