import { Page } from 'playwright';
import keys from '~/infrastructure/configs/keys.config';
import ContainerContract from '~/domain/contracts/container.contract';
import Contract from '~/domain/usecases/confirmation/retrieve-otp.usecase';
import Logger from '~/infrastructure/utils/logger.util';
import Credential from '~/domain/contracts/credential.contract';

type Props = {
	credential: Credential;
	page: Page;
};

export default class RetrieveOneTimePassword implements Contract {
	private readonly credential: Credential;
	private readonly page: Page;

	constructor(props: Props) {
		this.credential = props.credential;
		this.page = props.page;
	}

	public async execute(): Promise<void> {
		try {
			await this.page.getByRole('link', { name: this.credential.email }).click({ timeout: 1000 });
		} catch (error: any) {
			Logger.error("Can't choose connected account");
		}
		try {
			await this.page.getByRole('button', { name: 'Continue' }).click();
		} catch (error: any) {
			Logger.error("Can't confirm auth");
		}
	}
}
