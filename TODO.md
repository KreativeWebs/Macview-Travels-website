# Newsletter Feature Implementation

## Backend Changes
- [ ] Update backend/models/User.js to add newsletterSubscribed field
- [ ] Add newsletter routes in backend/routes/adminRoutes.js
- [ ] Add controller functions in backend/controllers/adminController.js for getting subscribers and sending newsletters
- [ ] Update backend/utils/sendEmail.js to add sendNewsletterEmail function

## Frontend Changes
- [ ] Update src/pages/Newsletter.jsx to make API call for subscription
- [ ] Create src/admin/pages/CreateNewsletter.jsx for admins to create and send newsletters
- [ ] Create src/admin/pages/ViewSubscribers.jsx for admins to view subscribed users
- [ ] Update src/admin/Sidebar.jsx to include links to new newsletter sections

## Testing
- [ ] Test user subscription via Newsletter.jsx
- [ ] Test admin sending newsletter
- [ ] Test admin viewing subscribers
