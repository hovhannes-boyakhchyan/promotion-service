import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ValidationMongoIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (ObjectId.isValid(value)) {
      if (String(new ObjectId(value)) === value) return value;
    }
    throw new BadRequestException(`${value} must be valid MongoId`);
  }
}
