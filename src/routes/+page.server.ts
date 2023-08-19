import { faker } from '@faker-js/faker';
import type { User } from '$lib/components/user';

async function loadUser(): Promise<User> {
	return new Promise((resolve) => {
		setTimeout(() => {
			const user = {
				avatar: faker.image.avatar(),
				birthday: faker.date.birthdate().toISOString(),
				email: faker.internet.email(),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				sex: faker.name.sexType(),
				id: crypto.getRandomValues(new Uint32Array(1))[0]
			};
			resolve(user);
		}, 10);
	});
}

export async function load({ depends }) {
	// working for the users only... but not actually needed when i use the form and redirect
	depends('user-load');
	console.log('user-load');
	const user = await loadUser();
	return {
		user
	};
}
