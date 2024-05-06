import { Reflector } from '@nestjs/core';

// Attach the metadata to the handler (from the controller' guard)
export const Roles = Reflector.createDecorator<string>();
