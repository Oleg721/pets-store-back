import { SetMetadata } from '@nestjs/common';

export const CheckSelf = (paramKey: string) =>
	SetMetadata('checkSelf', paramKey);
