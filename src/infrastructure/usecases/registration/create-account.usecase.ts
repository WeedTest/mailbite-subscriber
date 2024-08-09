import { type Page } from 'playwright';
import config from '~/infrastructure/configs/app.config';
import type Contract from '~/domain/usecases/registration/create-account.usecase';

type Props = {
	page: Page;
};

export default class CreateAccount implements Contract {
	private readonly page: Page;

	constructor(props: Props) {
		this.page = props.page;
	}

	public async execute(): Promise<void> {
		await this.page.goto(config.urls.service.signup);
		await this.page.waitForLoadState('domcontentloaded');
		await this.page.getByRole('link', { name: 'Logo Continue with Google' }).click();
	}
}
