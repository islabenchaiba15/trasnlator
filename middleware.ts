import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define your route matcher
const isTranslate = createRouteMatcher(['/translate(.*)']);

// Default export for the middleware
export default clerkMiddleware((auth, req) => {
  // Restrict access based on route
  if (isTranslate(req)) {
    auth().protect();
  }
});

// Export configuration for middleware
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/api/(.*)', '/trpc/(.*)'],
};
