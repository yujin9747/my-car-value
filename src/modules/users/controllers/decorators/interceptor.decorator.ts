import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from './class.constructor';
import { SerializeInterceptor } from '../../../../interceptors/serialize.interceptor';

export function Serialize(
  dto: ClassConstructor,
): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}
