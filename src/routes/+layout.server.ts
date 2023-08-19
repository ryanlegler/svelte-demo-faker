import { supabase } from '$lib/supabase';
import type { User } from '$lib/components/user';

export async function load({ depends }) {
	// working for the users only... but not actually needed when i use the form and redirect
	depends('root-load');
	console.log('root-load');

	const { data: users } = await supabase
		.from('users')
		.select('firstName, lastName, birthday, sex, avatar, id, email')
		.limit(50)
		.order('created_at', { ascending: false });

	return {
		users: users as User[]
	};
}
