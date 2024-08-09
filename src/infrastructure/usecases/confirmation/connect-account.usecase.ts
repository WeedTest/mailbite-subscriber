import { Page } from 'playwright';
import Util from '~/infrastructure/utils/common.util';
import Logger from '~/infrastructure/utils/logger.util';
import Random from '~/infrastructure/utils/math/random.util';
import Credential from '~/domain/contracts/credential.contract.js';
import Contract from '~/domain/usecases/confirmation/connect-account.usecase';

type Props = {
	credential: Credential;
	page: Page;
};

export default class ConnectAccount implements Contract {
	private readonly credential: Credential;
	private readonly page: Page;

	constructor(props: Props) {
		this.credential = props.credential;
		this.page = props.page;
	}

	async execute(): Promise<void> {
		await this.page.waitForLoadState('domcontentloaded');
		await this.page.keyboard.press('Escape');
		await this.page.getByLabel('Email or phone').click({ delay: 500 });
		await this.page.keyboard.type(this.credential.email, { delay: Random.integer(50, 100) });
		await this.page.getByRole('button', { name: 'Next' }).click();
		await Util.delay(500);
		await this.page.getByLabel('Enter your password').click();
		await this.page.keyboard.type(this.credential.password, { delay: Random.integer(50, 100) });
		await this.page.getByRole('button', { name: 'Next' }).click();
		try {
			await this.page.getByRole('button', { name: 'Not now' }).click({ timeout: 500 });
		} catch (error) {
			Logger.error("Can't find 'Not now' button");
		}
	}
}
