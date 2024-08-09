export default interface ContainerContract {
	bind<T>(abstract: string, concrete: (args?: any) => T): void;
	resolve<T>(abstract: string, args?: any): T;
	get<T>(abstract: string, args?: any): T;
}
