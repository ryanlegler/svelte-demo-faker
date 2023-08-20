import { supabase } from '$lib/supabase';
import type { User } from '$lib/components/user';

export async function load({ depends }) {
	depends('users-load');
	const { data: users } = await supabase
		.from('users')
		.select('firstName, lastName, birthday, sex, avatar, key, email, id')
		.limit(50)
		.order('created_at', { ascending: false });

	return {
		users: users as User[]
	};
}
