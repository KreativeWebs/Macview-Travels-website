# Admin Login CORS Fix

## Problem
- Admin panel at https://admin.macviewtravel.com was unable to login due to CORS error.
- Error: "No 'Access-Control-Allow-Origin' header is present on the requested resource" for OPTIONS preflight request to /api/admin/login.

## Root Cause
- The admin login route was at /api/admin/login, which falls under the /api/admin path.
- The server applies adminBasicAuth middleware to all /api/admin routes.
- adminBasicAuth (express-basic-auth) sends 401 responses without CORS headers for OPTIONS requests, overriding the CORS middleware.

## Solution
- Moved admin login route from "/admin/login" to "/admin-login" in authRoutes.js to avoid adminBasicAuth.
- Updated client-side authStore.jsx to use the new endpoint /api/admin-login.

## Changes Made
- [x] Changed route in backend/routes/authRoutes.js: router.post("/admin/login", ...) → router.post("/admin-login", ...)
- [x] Updated admin/src/store/authStore.jsx: axios.post(`${fullBaseURL}/api/admin/login`, ...) → axios.post(`${fullBaseURL}/api/admin-login`, ...)

## Testing
- [x] Deploy the backend changes.
- [x] Test admin login from https://admin.macviewtravel.com.
- [ ] Verify no CORS errors and successful login.

## Test Results
- CORS error persists for /api/admin-login, /api/refresh, and socket.io.
- Possible cause: Deployed server not updated with latest changes.
- Next step: Redeploy the backend to apply the route change and CORS configuration.
