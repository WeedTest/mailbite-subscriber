export default interface ActionContract {
	run(): Promise<void>;
}
