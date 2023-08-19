import { faker } from '@faker-js/faker';
export function createUser() {
	return {
		avatar: faker.image.avatar(),
		birthday: faker.date.birthdate().toISOString(),
		email: faker.internet.email(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		sex: faker.name.sexType()
	};
}
