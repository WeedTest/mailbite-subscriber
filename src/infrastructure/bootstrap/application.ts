import { Browser } from 'playwright';
import Util from '~/infrastructure/utils/common.util';
import app from '~/infrastructure/configs/app.config';
import Logger from '~/infrastructure/utils/logger.util';
import useTimer from '~/infrastructure/hooks/timer.hook';
import useBrowser from '~/infrastructure/hooks/browser.hook';
import Bandleader from '~/application/actions/bandleader.action';
import type Credential from '~/domain/contracts/credential.contract';
import useNotification from '~/infrastructure/hooks/notification.hook';
import Discard from '~/infrastructure/services/discard-used-email.service';
import type ContainerContract from '~/domain/contracts/container.contract';
import BandleaderFactory from '~/infrastructure/factories/bandleader.factory';
import RetrieveCredentials from '~/infrastructure/services/retrieve-credentials.service';
import keys from '../configs/keys.config';

export default class Application {
	private readonly data: Credential[];
	private readonly container: ContainerContract;
	private readonly timer: ReturnType<typeof useTimer>;
	private readonly notification: ReturnType<typeof useNotification>;

	constructor(container: ContainerContract) {
		this.timer = useTimer();
		this.container = container;
		this.notification = useNotification();
		this.data = RetrieveCredentials.run();
	}

	public async run(): Promise<void> {
		if (this.data.length === 0) {
			console.log('Credentials bucket is empty');
			return;
		}
		this.timer.start();

		for (const key in this.data) {
			this.container.bind(keys.token, () => null);
			const browser = await useBrowser();
			const item = this.data[key];
			const bandleader = await this.bandleader(item, browser);

			console.log(`processing tasks ${item.email}: ${parseInt(key) + 1}/${this.data.length}`);
			try {
				await bandleader.run();
				if (!app.debug) Discard.run(item.email);
			} catch (error) {
				this.error(error, item);
			}

			const token = this.container.resolve(keys.token);
			if (token !== null) {
				console.log(`the task is carried out well for: ${item.email} => ${token}`);
			} else {
				console.log(`the task failed for: ${item.email}`);
			}

			if (!app.debug) await browser.close();

			await Util.delay(1000);
		}

		this.terminate();
	}

	private async bandleader(item: Credential, browser: Browser): Promise<Bandleader> {
		return await BandleaderFactory.make({
			credential: item,
			browser: await browser,
			container: this.container,
		});
	}

	private error(error: any, item: Credential): void {
		Logger.error('Error using credentials: ' + JSON.stringify(item));
		if (typeof error.message === 'string') Logger.error(error.message);
		else Logger.error('Error: ' + JSON.stringify(error));
		this.notification.notify('Error using credentials: ' + JSON.stringify(item));
	}

	private terminate(): void {
		this.timer.end();
		console.log(`Execution time: ${this.timer.time()} of ${this.data.length} emails`);
		console.log('the task is carried out well');
		this.notification.notify('the task is carried out well');
	}
}
