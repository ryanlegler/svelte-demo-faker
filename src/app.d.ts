import type { User } from '$lib/components/user';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User[];
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
