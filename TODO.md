# TODO: Fix Public Packages Access Issue

## Pending Tasks
- [x] Create `backend/routes/packagesRoutes.js` with public GET routes for packages (no auth required)
- [x] Mount the new route in `backend/server.js` as /api/packages
- [x] Update `src/api/packages.js` to use /api/packages instead of /api/admin/packages

## Followup Steps
- [x] Test that public packages load without authentication
- [ ] Verify admin package management still works with /api/admin/packages
