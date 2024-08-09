import { Browser, Page } from 'playwright';
import Credential from '~/domain/contracts/credential.contract';
import Bandleader from '~/application/actions/bandleader.action';
import Confirmation from '~/application/actions/confirmation.action';
import Registration from '~/application/actions/registration.action';
import Subscription from '~/application/actions/subscription.action';
import ContainerContract from '~/domain/contracts/container.contract';
import AnsweringContract from '~/domain/usecases/subscription/answering.usecase';
import AcceptTermsContract from '~/domain/usecases/confirmation/accept-terms.usecase';
import RecordTokenContract from '~/domain/usecases/subscription/record-token.usecase';
import CreateAccountContract from '~/domain/usecases/registration/create-account.usecase';
import RetrieveTokenContract from '~/domain/usecases/subscription/retrieve-token.usecase';
import ConnectAccountContract from '~/domain/usecases/confirmation/connect-account.usecase';
import RetrieveOneTimePasswordContract from '~/domain/usecases/confirmation/retrieve-otp.usecase';

type Params = {
	browser: Browser;
	credential: Credential;
	container: ContainerContract;
};

export default class BandleaderFactory {
	public static async make(params: Params): Promise<Bandleader> {
		const page = await params.browser.newPage();
		return new Bandleader({
			registration: await BandleaderFactory.registration(params, page),
			confirmation: await BandleaderFactory.confirmation(params, page),
			subscription: await BandleaderFactory.subscription(params, page),
		});
	}

	private static async registration(params: Params, page: Page): Promise<Registration> {
		return new Registration({
			create: params.container.resolve<CreateAccountContract>('CreateAccountContract', { page }),
		});
	}

	private static async confirmation(params: Params, page: Page): Promise<Confirmation> {
		return new Confirmation({
			accept: params.container.resolve<AcceptTermsContract>('AcceptTermsContract'),
			retrieve: params.container.resolve<RetrieveOneTimePasswordContract>('RetrieveOneTimePasswordContract', {
				page,
				credential: params.credential,
			}),
			login: params.container.resolve<ConnectAccountContract>('ConnectAccountContract', {
				page,
				credential: params.credential,
			}),
		});
	}

	private static async subscription(params: Params,page: Page): Promise<Subscription> {
		return new Subscription({
			retrieve: params.container.resolve<RetrieveTokenContract>('RetrieveTokenContract', { page }),
			record: params.container.resolve<RecordTokenContract>('RecordTokenContract', { credential: params.credential }),
		});
	}
}
