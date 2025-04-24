import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  interface Response<T> {
    success: boolean;
    message: string;
    data: T;
  }
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((data) => {
          if (data instanceof HttpException) {
            return {
              success: false,
              message: data.message,
              data: null,
            };
          }
            return {
            success: true,
            message: 'Operación exitosa',
            data: data,
          };
        }),
      );
    }
  }