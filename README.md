# Caviar Curls

This package has been cleaned for deployment.

## Before you publish

1. Install dependencies:
   npm install
2. Create a `.env` file from `.env.example`.
3. Add your real live values for:
   - `SITE_URL`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
4. Start the server locally:
   npm start
5. Test checkout fully before going live.

## Notes

- Do not commit or upload your `.env` file.
- This site requires a Node/Express host because checkout is created on the server.
- The newsletter form now opens an email confirmation instead of pretending data was stored.
