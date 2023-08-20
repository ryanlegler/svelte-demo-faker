import { invalidate } from '$app/navigation';
import type { User } from '$lib/components/user';
import { supabase } from '$lib/supabase';
import { json } from '@sveltejs/kit';

async function doThing(user: User): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(async () => {
			await supabase?.from('users').insert(user);
			resolve();
		}, 3000);
	});
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	const { user } = await request.json();
	await doThing(user);

	return json({
		success: true
	});
}
