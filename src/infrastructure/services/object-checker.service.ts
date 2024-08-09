import Contract, { Object } from '~/domain/services/object-checker.service';

export default class ObjectChecker implements Contract {
	public run(obj: Object): void {
		if (
			!Object.values(obj).every(
				(value) => value !== null && value !== undefined && value !== '',
			)
		) {
			throw new Error('One or more object entries are empty.');
		}
	}
}
