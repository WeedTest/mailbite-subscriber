import Util from '~/infrastructure/utils/common.util';
import keys from '~/infrastructure/configs/keys.config';
import Filesystem from '~/infrastructure/utils/filesystem.util';
import Credential from '~/domain/contracts/credential.contract';
import ContainerContract from '~/domain/contracts/container.contract';
import RecordTokenContract from '~/domain/usecases/subscription/record-token.usecase';

type Props = {
	credential: Credential;
	container: ContainerContract;
};

export default class RecordToken implements RecordTokenContract {
	private readonly credential: Credential;
	private readonly container: ContainerContract;

	constructor(props: Props) {
		this.credential = props.credential;
		this.container = props.container;
	}

	public async execute(): Promise<void> {
		const token = this.container.resolve<string>(keys.token);
		if (token.toLowerCase().includes("You don't have any API key yet.")) {
			this.container.bind(keys.token, () => null);
			await Util.delay(10000);
			throw new Error('String is not a token');
		}
		const data = `${this.credential.email}|${this.credential.password} => ${token}`;
		Filesystem.append('storage/tokens.txt', data);
	}
}
