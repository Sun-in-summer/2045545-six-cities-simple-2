import crypto from 'crypto';
import * as jose from 'jose';
import {plainToInstance, ClassConstructor} from 'class-transformer';
import { ValidationError } from 'class-validator';
import { City } from '../types/city.enum.js';
import { Offer } from '../types/offer.type.js';
import { OfferType } from '../types/offerType.enum.js';
import {ValidationErrorField} from '../types/validation-error-field.type.js';
import {ServiceError} from '../types/service-error.enum.js';
import {UnknownObject} from '../types/unknown-object.type.js';
import {DEFAULT_STATIC_IMAGES} from '../app/application.constant.js';


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
    accommodations: accommodations.split(';'),
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

export const createSHA256 = (line: string, salt: string) : string =>{
  const shaHasher = crypto.createHmac('sha256', salt);
  const hash= shaHasher.update(line).digest('hex');
  return hash;
};


export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});


export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    }));
};
