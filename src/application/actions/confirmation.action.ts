import Logger from '~/infrastructure/utils/logger.util';
import type Contract from '~/domain/contracts/action.contract';
import type AcceptTermsContract from '~/domain/usecases/confirmation/accept-terms.usecase';
import type ConnectAccountContract from '~/domain/usecases/confirmation/connect-account.usecase';
import type RetrieveOneTimePasswordContract from '~/domain/usecases/confirmation/retrieve-otp.usecase';

type Props = {
	accept: AcceptTermsContract;
	login: ConnectAccountContract;
	retrieve: RetrieveOneTimePasswordContract;
};

export default class Confirmation implements Contract {
	private readonly accept: AcceptTermsContract;
	private readonly login: ConnectAccountContract;
	private readonly retrieve: RetrieveOneTimePasswordContract;

	constructor(props: Props) {
		this.login = props.login;
		this.accept = props.accept;
		this.retrieve = props.retrieve;
	}

	public async run(): Promise<void> {
		await this.login.execute();
		try {
			await this.accept.execute();
		} catch (error) {
			Logger.error("Can't accept condition");
		}
		await this.retrieve.execute();
	}
}
