import Util from '~/infrastructure/utils/common.util';
import RetryContract from '~/domain/services/retry.service';
import Logger from '../utils/logger.util';

type Props = {
	limit: number;
	name: string;
	delay?: number;
};

export default class Retry implements RetryContract {
	private readonly limit: number;
	private readonly delay: number;
	private readonly name: string;

	constructor(props: Props) {
		this.limit = props.limit;
		this.name = props.name;
		this.delay = props.delay ?? 1000;
	}

	public async run<T>(operation: (attempts: number) => Promise<T>): Promise<T> {
		let attempts = 0;
		while (true) {
			try {
				return await operation(attempts);
			} catch (error: any) {
				attempts++;
				if (attempts >= this.limit) {
					// Failed after max attempts, propagate the error
					const exception = new Error(`Maximum number of attempts reached ${this.name}`);
					exception.cause = error;
					throw exception;
				}
				Logger.error(`Attempt ${attempts} failed for ${this.name}. Retrying in ${this.delay}ms...`);
				await Util.delay(this.delay);
			}
		}
	}
}
