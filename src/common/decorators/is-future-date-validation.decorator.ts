import { registerDecorator } from 'class-validator';
import * as moment from 'moment';

export function IsFutureDate() {
  return function (target: object, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: `${propertyName} must be future date`,
      },
      validator: {
        validate(value: string) {
          return moment().isBefore(value);
        },
      },
    });
  };
}
