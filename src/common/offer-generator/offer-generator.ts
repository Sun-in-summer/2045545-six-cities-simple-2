import { MockData } from '../../types/mock-data.type.js';
import { OfferType } from '../../types/offerType.enum.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import dayjs from 'dayjs';
import {Rating ,RoomQuantity , GuestQuanity ,Price , Comments ,Weekday} from '../../const.js';
import { City } from '../../types/city.enum.js';
// import { Accomodation } from '../../types/accomodation.enum.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData){}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city =  getRandomItem<City>(this.mockData.cities);//
    const previewPath = getRandomItem<string>(this.mockData.previewPaths);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const type = getRandomItem<OfferType>(this.mockData.types);
    const accommodations = getRandomItems<string>(this.mockData.accommodations).join(';');///
    const userName = getRandomItem<string>(this.mockData.userNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem<string>(this.mockData.avatarPaths);
    const location =  getRandomItem<string>(this.mockData.locations);
    const isPremium = (Math.random()< 0,5);
    const isPro = (Math.random()< 0,5);
    const rating = generateRandomValue(Rating.MIN, Rating.MAX, 2);
    const roomQuantity = generateRandomValue(RoomQuantity.MIN, RoomQuantity.MAX, 0);
    const guestsQuantity = generateRandomValue(GuestQuanity.MIN, GuestQuanity.MAX, 0);
    const price = generateRandomValue(Price.MIN, Price.MAX, 0);
    const commentsQuantity = generateRandomValue(Comments.MIN, Comments.MAX, 0);
    const postDate = dayjs().subtract(generateRandomValue(Weekday.MIN, Weekday.MAX), 'day').toISOString();

    const[longitude, latitude] = location.split(' ');


    return [
      title, description, postDate, city, previewPath, images, isPremium, rating, type, roomQuantity, guestsQuantity, price, accommodations,
      userName, email, avatarPath, isPro, commentsQuantity, longitude, latitude
    ].join('\t');

  }

}


