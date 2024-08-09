import type Contract from '~/domain/contracts/action.contract';
import type CreateAccountContract from '~/domain/usecases/registration/create-account.usecase';

type Props = {
	create: CreateAccountContract;
};

export default class Registration implements Contract {
	private readonly create: CreateAccountContract;

	constructor(props: Props) {
		this.create = props.create;
	}

	public async run(): Promise<void> {
		await this.create.execute();
	}
}
