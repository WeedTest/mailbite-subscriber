import type ContainerContract from '~/domain/contracts/container.contract.js';

export default class Container implements ContainerContract {
	private readonly registers: Record<string, (container?: ContainerContract) => any> = {};
	private readonly instances: Record<string, any> = {};

	public bind<T>(abstract: string, concrete: (arg: any) => T): void {
		this.registers[abstract] = concrete;
	}
	public get<T>(abstract: string, args?: any): T {
		if (!this.instances.hasOwnProperty(abstract)) {
			this.instances[abstract] = this.resolve(abstract, args);
		}
		return this.instances[abstract];
	}
	public resolve<T>(abstract: string, args?: any): T {
		try {
			return this.registers[abstract](args);
		} catch (error: any) {
			console.log('Error on abstract: ' + abstract);
			throw new Error(error);
		}
	}
}
