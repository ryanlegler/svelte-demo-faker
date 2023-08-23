import type { User } from '$lib/components/user';
import { supabase } from '$lib/supabase';

export async function loadUsers(): Promise<User[]> {
	const { data: users } = await supabase
		.from('users')
		.select('firstName, lastName, birthday, sex, avatar, key, email, id')
		.limit(50)
		.order('created_at', { ascending: false });

	return users as User[];
}
