# Flash Sales Implementation TODO

## Backend
- [ ] Create backend/models/FlashSale.js with fields: backgroundImage, price, destinationCity, departureCity, dateValid, airline, isActive
- [ ] Create backend/models/FlashSaleBooking.js with fields: name, whatsappNumber, dateOfBirth, gender, flashSaleId, payment, status
- [ ] Update backend/controllers/adminController.js: Add createFlashSale, updateFlashSale, deleteFlashSale, getFlashSales, getFlashSaleBookings functions
- [ ] Create backend/routes/flashSaleRoutes.js: Public route to get active flash sales
- [ ] Update backend/routes/adminRoutes.js: Add flash sale CRUD routes
- [ ] Update backend/server.js: Register flashSaleRoutes

## Frontend
- [ ] Update src/pages/FlashSales.jsx: Fetch flash sales from API, make slides dynamic with Link to /flash-sale/:id
- [ ] Create src/pages/FlashSaleDetails.jsx: Display flash sale details and booking form (name, whatsapp, dob, gender, pay now)
- [ ] Create src/admin/pages/AddNewFlashSale.jsx: Form for admins to create flash sales
- [ ] Create src/admin/pages/FlashSalesManagement.jsx: List flash sale bookings
- [ ] Update src/admin/Sidebar.jsx: Add links for Create Flash Sale and Flash Sales Bookings
- [ ] Update src/App.jsx: Add routes for /flash-sale/:id, /admin/add-flash-sale, /admin/flash-sales-bookings

## Testing
- [ ] Test flash sales display and navigation to booking page
- [ ] Test admin creation of flash sales
- [ ] Test booking submission
- [ ] Test admin viewing bookings
