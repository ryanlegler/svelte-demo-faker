import type { User } from '$lib/components/user';
import { supabase } from '$lib/supabase';

export async function createUser(user: User): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(async () => {
			await supabase?.from('users').insert(user);
			resolve();
		}, 1000);
	});
}
