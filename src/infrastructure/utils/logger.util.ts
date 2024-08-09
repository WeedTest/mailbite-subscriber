import Filesystem from '~/infrastructure/utils/filesystem.util';
import Util from '~/infrastructure/utils/common.util';

export default class Logger {
	public static info(data: string): void {
		Logger.logger(data);
	}

	public static error(data: string): void {
		Util.log(data);
		Logger.logger(data, 'error');
	}

	public static logger(data: string, type: 'error' | 'debug' = 'debug'): void {
		const date = new Date().toISOString();
		Filesystem.append(
			`storage/${type}-${date.slice(0, 13)}.log`,
			`[${date}]:${data}`,
		);
	}
}