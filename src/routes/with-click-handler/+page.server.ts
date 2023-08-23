import { loadUser } from '$lib/api/loadUser';
/** @type {import('./$types').PageLoad} */
export async function load({ depends }) {
	depends('user-load');
	const user = await loadUser();
	return {
		user
	};
}
