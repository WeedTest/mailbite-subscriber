export type Object = {
	[key: string]: any;
};

export default interface ObjectChecker {
	run(obj: Object): void;
}
