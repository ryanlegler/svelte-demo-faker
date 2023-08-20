import { invalidate } from '$app/navigation';
import { supabase } from '$lib/supabase';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
	const { user } = await request.json();

	await supabase?.from('users').insert(user);

	return json({
		success: true
	});
}
