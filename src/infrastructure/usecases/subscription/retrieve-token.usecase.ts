import { Locator, Page } from 'playwright';
import app from '~/infrastructure/configs/app.config';
import Util from '~/infrastructure/utils/common.util';
import keys from '~/infrastructure/configs/keys.config';
import RetryContract from '~/domain/services/retry.service';
import ContainerContract from '~/domain/contracts/container.contract';
import RetrieveTokenContract from '~/domain/usecases/subscription/retrieve-token.usecase';

type Props = {
	retry: RetryContract;
	page: Page;
	container: ContainerContract;
};

export default class RetrieveToken implements RetrieveTokenContract {
	private list: Locator;
	private readonly page: Page;
	private readonly retry: RetryContract;
	private readonly container: ContainerContract;

	constructor(props: Props) {
		this.retry = props.retry;
		this.page = props.page;
		this.container = props.container;
	}

	public async execute(): Promise<void> {
		await Util.delay(2000);
		await this.page.goto(app.urls.service.token, { waitUntil: 'domcontentloaded' });
		try {
			await this.page.getByRole('link', { name: 'Create API Key' }).click({timeout: 1000});
		} catch (error) { }
		await Util.delay(2000);
		await this.retry.run<void>(async (attempts: number) => {
			if (attempts > 1) {
				await this.page.reload();
				await this.page.waitForLoadState('domcontentloaded');
			}
			this.list = this.page.locator('#tokenValue');
		});
		const token = await this.list.textContent();
		this.container.bind(keys.token, () => token);
	}
}
