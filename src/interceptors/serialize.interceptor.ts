import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from '../users/controllers/decorators/class.constructor';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Run something before a request is handled
    // by the request handler
    console.log("I'm running before the handler ", context);
    return next.handle().pipe(
      map((data: any) => {
        // Run something before a response is sent out
        console.log("I'm running before response is sent out ", data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
