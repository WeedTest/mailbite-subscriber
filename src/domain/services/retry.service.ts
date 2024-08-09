export default interface RetryContract {
	run<T>(operation: (attempts?: number) => Promise<T>): Promise<T>;
}
