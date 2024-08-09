import type Contract from '~/domain/contracts/action.contract';
import RecordTokenContract from '~/domain/usecases/subscription/record-token.usecase';
import RetrieveTokenContract from '~/domain/usecases/subscription/retrieve-token.usecase';

type Props = {
	record: RecordTokenContract;
	retrieve: RetrieveTokenContract;
};

export default class Subscription implements Contract {
	private readonly record: RecordTokenContract;
	private readonly retrieve: RetrieveTokenContract;

	constructor(props: Props) {
		this.retrieve = props.retrieve;
		this.record = props.record;
	}

	public async run(): Promise<void> {
		await this.retrieve.execute();
		await this.record.execute();
	}
}
