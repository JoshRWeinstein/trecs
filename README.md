# TRex - The Recommendations

TRex is a platform for sharing and discovering recommendations. From restaurants to running shoes, find the best recommendations from people you trust.

## Features

- Share your favorite things organized by categories
- Track changes in your recommendations over time
- Discover new recommendations from others
- Search for specific recommendations across categories
- View recommendation details including location and website

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory with:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/trex"
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js app directory
  - `page.tsx` - Homepage
  - `my-recs/` - User's recommendations page
  - `search/` - Search page
  - `[slug]/` - Individual recommendation pages
- `prisma/` - Database schema and migrations
- `components/` - Reusable React components

## Contributing

Feel free to submit issues and enhancement requests! 