/*
  # Initial Database Schema Setup

  1. New Tables
    - `reservations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `date` (date)
      - `time` (time)
      - `guests` (integer)
      - `occasion` (text)
      - `special_requests` (text)
      - `created_at` (timestamptz)
      - `status` (text)

    - `banquet_inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `event_type` (text)
      - `guests` (integer)
      - `date` (date)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `status` (text)

    - `reviews`
      - `id` (uuid, primary key)
      - `name` (text)
      - `rating` (integer)
      - `comment` (text)
      - `images` (text[])
      - `created_at` (timestamptz)
      - `status` (text)
      - `helpful_count` (integer)
      - `admin_response` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for anonymous users (insert only)

  3. Indexes
    - Created_at index for all tables
    - Status index for all tables
    - Rating index for reviews
*/

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types for status
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');
CREATE TYPE inquiry_status AS ENUM ('new', 'contacted', 'booked', 'cancelled');
CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected');

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  guests integer NOT NULL CHECK (guests > 0 AND guests <= 20),
  occasion text,
  special_requests text,
  created_at timestamptz DEFAULT now(),
  status reservation_status DEFAULT 'pending',
  CONSTRAINT valid_phone CHECK (phone ~ '^[0-9]{10}$')
);

-- Create banquet_inquiries table
CREATE TABLE IF NOT EXISTS banquet_inquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  phone text NOT NULL,
  email text CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  event_type text NOT NULL,
  guests integer NOT NULL CHECK (guests > 0),
  date date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  status inquiry_status DEFAULT 'new',
  CONSTRAINT valid_phone CHECK (phone ~ '^[0-9]{10}$')
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  images text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  status review_status DEFAULT 'pending',
  helpful_count integer DEFAULT 0,
  admin_response text,
  CONSTRAINT valid_images_length CHECK (array_length(images, 1) <= 3)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS reservations_created_at_idx ON reservations (created_at);
CREATE INDEX IF NOT EXISTS reservations_status_idx ON reservations (status);
CREATE INDEX IF NOT EXISTS reservations_date_idx ON reservations (date);

CREATE INDEX IF NOT EXISTS banquet_inquiries_created_at_idx ON banquet_inquiries (created_at);
CREATE INDEX IF NOT EXISTS banquet_inquiries_status_idx ON banquet_inquiries (status);
CREATE INDEX IF NOT EXISTS banquet_inquiries_date_idx ON banquet_inquiries (date);

CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews (created_at);
CREATE INDEX IF NOT EXISTS reviews_status_idx ON reviews (status);
CREATE INDEX IF NOT EXISTS reviews_rating_idx ON reviews (rating);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE banquet_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reservations
CREATE POLICY "Allow anonymous insert" ON reservations
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read all" ON reservations
  FOR SELECT TO authenticated
  USING (true);

-- Create policies for banquet_inquiries
CREATE POLICY "Allow anonymous insert" ON banquet_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read all" ON banquet_inquiries
  FOR SELECT TO authenticated
  USING (true);

-- Create policies for reviews
CREATE POLICY "Allow anonymous insert" ON reviews
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public read approved" ON reviews
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Allow authenticated read all" ON reviews
  FOR SELECT TO authenticated
  USING (true);