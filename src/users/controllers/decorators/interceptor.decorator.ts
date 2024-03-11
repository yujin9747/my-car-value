import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../../../interceptors/serialize.interceptor';
import { ClassConstructor } from './class.constructor';

export function Serialize(
  dto: ClassConstructor,
): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}
