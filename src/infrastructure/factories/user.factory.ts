import { faker } from '@faker-js/faker';
import type Credential from '~/domain/contracts/credential.contract';

export type User = {
	name: string;
	email: string;
	username: string;
	password: string;
};

export default class UserFactory {
	static make(credential: Credential): User {
		return {
			email: credential.email,
			name: faker.person.fullName(),
			password: credential.password,
			username: faker.internet
				.userName()
				.replace(/[^\w\s]/gi, '')
				.replace(/_/g, ''),
		};
	}
}
