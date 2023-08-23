import { createUser } from '$lib/api/createUser';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { user } = await request.json();
	await createUser(user);
	return json({
		success: true
	});
}
