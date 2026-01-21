# TODO List

## Visa Requirements Fix
- [x] Identified issue: Backend controller was using flexible regex matching for country names, causing wrong visa requirements to be returned when multiple countries start with the same word (e.g., "EGYPT ENTRY VISA" and "EGYPT VISA ON ARRIVAL").
- [x] Fixed the controller to use exact case-insensitive matching instead of partial matching.
- [x] Added regex escaping to handle special characters in country names like parentheses in "DUBAI (MARCH - APRIL)".
- [ ] Test the fix by selecting "EGYPT ENTRY VISA (Flight Required)" on the frontend and verify it shows the correct details ($230 USD, 48 working hours, Passport Photograph and Datapage Photograph).
- [ ] Ensure "EGYPT VISA ON ARRIVAL" still works correctly (₦370,000, 14 working days, additional Flight Itinerary requirement).
- [ ] Test that "DUBAI (MARCH - APRIL)" now works without 404 errors.
