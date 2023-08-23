import { loadUsers } from '$lib/api/loadUsers.js';
export async function load() {
	const users = await loadUsers();
	return {
		users
	};
}
