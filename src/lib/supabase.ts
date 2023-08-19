import { SUPABASE_URL, SUPABASE_ANON_KEY } from '$env/static/private';

import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
	throw new Error('Missing Supabase API Keys');
}
