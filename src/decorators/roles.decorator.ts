import { Reflector } from '@nestjs/core';

import { UserRole } from 'src/entities/user.entity';

// Attach the metadata to the handler (from the controller' guard)
export const Roles = Reflector.createDecorator<UserRole[]>();
