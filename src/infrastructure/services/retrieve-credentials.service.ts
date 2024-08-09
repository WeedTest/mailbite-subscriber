import type Credential from '~/domain/contracts/credential.contract';
import RetrieveList from './retrieve-list.service';

export default class RetrieveCredentials {
	static run(): Credential[] {
		return RetrieveList.run('credentials.txt').map((line) => {
			const [email, password] = line.split('|');
			return { email, password };
		});
	}
}
