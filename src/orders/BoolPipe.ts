import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class BoolPipe implements PipeTransform<string, boolean | undefined> {
  transform(value: string | undefined, metadata: ArgumentMetadata): boolean | undefined {
    if (value === undefined || value === null) {
      return undefined
    }
    if (value === 'true') return true
    if (value === 'false') return false
    throw new BadRequestException('Validation failed. "${value}" is not a valid boolean.')
  }
}