import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion?: string;
  special_requests?: string;
  created_at: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface BanquetInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  event_type: string;
  guests: number;
  date: string;
  notes?: string;
  created_at: string;
  status: 'new' | 'contacted' | 'booked' | 'cancelled';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  images?: string[];
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
  helpful_count: number;
  admin_response?: string;
}

// API Functions
export const api = {
  // Reservation functions
  reservations: {
    create: async (data: Omit<Reservation, 'id' | 'created_at' | 'status'>) => {
      console.log('📝 Creating reservation...', { data });
      
      const { error, data: result } = await supabase
        .from('reservations')
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error('❌ Failed to create reservation:', error);
        throw error;
      }

      console.log('✅ Reservation created successfully:', result);
      return result;
    },

    getAll: async () => {
      console.log('🔍 Fetching all reservations...');
      
      const { error, data } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Failed to fetch reservations:', error);
        throw error;
      }

      console.log(`✅ Successfully fetched ${data?.length} reservations`);
      return data;
    }
  },

  // Banquet inquiry functions
  banquetInquiries: {
    create: async (data: Omit<BanquetInquiry, 'id' | 'created_at' | 'status'>) => {
      console.log('📝 Creating banquet inquiry...', { data });
      
      const { error, data: result } = await supabase
        .from('banquet_inquiries')
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error('❌ Failed to create banquet inquiry:', error);
        throw error;
      }

      console.log('✅ Banquet inquiry created successfully:', result);
      return result;
    },

    getAll: async () => {
      console.log('🔍 Fetching all banquet inquiries...');
      
      const { error, data } = await supabase
        .from('banquet_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Failed to fetch banquet inquiries:', error);
        throw error;
      }

      console.log(`✅ Successfully fetched ${data?.length} banquet inquiries`);
      return data;
    }
  },

  // Review functions
  reviews: {
    create: async (data: Omit<Review, 'id' | 'created_at' | 'status' | 'helpful_count' | 'admin_response'>) => {
      console.log('📝 Creating review...', { data });
      
      const { error, data: result } = await supabase
        .from('reviews')
        .insert([data])
        .select()
        .single();

      if (error) {
        console.error('❌ Failed to create review:', error);
        throw error;
      }

      console.log('✅ Review created successfully:', result);
      return result;
    },

    getApproved: async () => {
      console.log('🔍 Fetching approved reviews...');
      
      const { error, data } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Failed to fetch approved reviews:', error);
        throw error;
      }

      console.log(`✅ Successfully fetched ${data?.length} approved reviews`);
      return data;
    },

    incrementHelpful: async (id: string) => {
      console.log('👍 Incrementing helpful count for review:', id);
      
      const { error } = await supabase.rpc('increment_helpful_count', { review_id: id });
      
      if (error) {
        console.error('❌ Failed to increment helpful count:', error);
        throw error;
      }

      console.log('✅ Successfully incremented helpful count');
    }
  }
};