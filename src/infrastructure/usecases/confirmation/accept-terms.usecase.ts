import { th } from '@faker-js/faker';
import { Page } from 'playwright';
import ContainerContract from '~/domain/contracts/container.contract';
import RetryContract from '~/domain/services/retry.service';
import Contract from '~/domain/usecases/confirmation/accept-terms.usecase';
import keys from '~/infrastructure/configs/keys.config';
type Props = {
	retry: RetryContract;
	page: Page;
};
export default class AcceptTerms implements Contract {
	private readonly retry: RetryContract;
	private readonly page: Page;

	constructor(props: Props) {
		this.retry = props.retry;
		this.page = props.page;
	}

	async execute(): Promise<void> {
		await this.retry.run<void>(async (attempts: number) => {
			if (attempts > 1) {
				await this.page.reload();
				await this.page.waitForLoadState('domcontentloaded');
				await this.page.keyboard.press('Escape');
			}
			await this.page.getByRole('button', { name: 'I understand' }).click({ timeout: 1000 });
		});
	}
}
