// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
    * Match all request paths except for:
    * 1. Static files in the `_next` folder
    * 2. API routes
    * 3. Public folder files
    */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};