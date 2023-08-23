import { createUser } from '$lib/api/createUser';
import { loadUser } from '$lib/api/loadUser';

/** @type {import('./$types').PageLoad} */
export async function load() {
	const user = await loadUser();
	return {
		user
	};
}

export const actions = {
	reject: () => {
		// this action doesn't do anything, but it's here to trigger a new load of the "user" data.
		console.log('reject');
	},
	approve: async ({ request }) => {
		const data = await request.formData();
		await createUser(JSON.parse(data.get('user') as string));
	}
};
