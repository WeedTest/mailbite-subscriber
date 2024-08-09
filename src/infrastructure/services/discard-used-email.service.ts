import * as os from 'os';
import RetrieveList from './retrieve-list.service';
import Filesystem from '~/infrastructure/utils/filesystem.util';

export default class DiscardUsedEmailService {
	public static run(needle: string): void {
		Filesystem.write(
			'storage/credentials.txt',
			RetrieveList.run('credentials.txt')
				.filter((line) => !line.includes(needle))
				.join(os.EOL)
				.trim(),
		);
	}
}
