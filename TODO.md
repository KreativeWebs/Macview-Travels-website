# Visa Manual Payment Implementation

## Backend Changes
- [x] Update visaRequirements model: Add paymentMethod to visaTypes
- [x] Update visaApplication model: Add receiptUrl to payment object
- [x] Update visaRoutes: Handle receipt upload in /apply route

## Admin Panel Changes
- [x] Add payment method toggle in AddNewVisaRequirement.jsx

## Frontend Changes
- [x] Modify VisaProcessing.jsx: Route based on payment method
- [x] Create VisaManualPayment.jsx: Account number display, receipt upload, submit
- [x] Update routing for manual payment confirmation

## Testing
- [x] Test Paystack flow
- [x] Test manual payment flow
- [x] Verify admin toggle works
