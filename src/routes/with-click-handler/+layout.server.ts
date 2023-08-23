import { loadUsers } from '$lib/api/loadUsers.js';

/** @type {import('./$types').ServerPageLoad} */
export async function load({ depends }) {
	depends('users-load');
	const users = await loadUsers();
	return {
		users
	};
}
