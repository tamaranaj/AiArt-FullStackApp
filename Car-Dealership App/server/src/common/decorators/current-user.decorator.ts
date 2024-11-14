import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CurrentUser } from '../types/current-user.interface';
import { UserRole } from '../types/user-role.enum';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CurrentUser => {
    console.log('before if')
    if (process.env.NO_AUTH === 'true') {
      console.log(data)
      console.log('here in get user')
      return {
        email: 'admin@example.com',
        userId: '2a23b510-e5d1-4688-a9d6-01cb92afc87d',
        role: UserRole.Admin,
      };
    }

    const request = context.switchToHttp().getRequest();
    // console.log('request',request)
    console.log('request-user',request.user)
    return request.user;
  },
);
