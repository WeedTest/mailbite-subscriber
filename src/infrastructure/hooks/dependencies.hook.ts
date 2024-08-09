import RetrieveOneTimePasswordContract from '~/domain/usecases/confirmation/retrieve-otp.usecase';
import RetrieveOneTimePassword from '~/infrastructure/usecases/confirmation/retrieve-otp.usecase';
import type CreateAccountContract from '~/domain/usecases/registration/create-account.usecase';
import ConnectAccountContract from '~/domain/usecases/confirmation/connect-account.usecase';
import ConnectAccount from '~/infrastructure/usecases/confirmation/connect-account.usecase';
import CreateAccount from '~/infrastructure/usecases/registration/create-account.usecase';
import RetrieveTokenContract from '~/domain/usecases/subscription/retrieve-token.usecase';
import AcceptTermsContract from '~/domain/usecases/confirmation/accept-terms.usecase';
import AcceptTerms from '~/infrastructure/usecases/confirmation/accept-terms.usecase';
import RecordTokenContract from '~/domain/usecases/subscription/record-token.usecase';
import AnsweringContract from '~/domain/usecases/subscription/answering.usecase';
import RetrieveToken from '../usecases/subscription/retrieve-token.usecase';
import type ContainerContract from '~/domain/contracts/container.contract';
import RecordToken from '../usecases/subscription/record-token.usecase';
import type Credential from '~/domain/contracts/credential.contract';
import UserFactory from '~/infrastructure/factories/user.factory';
import Container from '~/application/supports/container.support';
import ObjectChecker from '../services/object-checker.service';
import Retry from '~/infrastructure/services/retry.service';
import { type Page } from 'playwright';

export default function useContainer(): ContainerContract {
	const container = new Container();
	const checker = new ObjectChecker();
	container.bind<AcceptTermsContract>('AcceptTermsContract', function (args: { page: Page; }) {
		return new AcceptTerms({ ...args, retry: new Retry({ limit: 2, name: 'AcceptTerms' }) });
	});

	container.bind<RetrieveOneTimePasswordContract>('RetrieveOneTimePasswordContract', function (args: { page: Page; credential: Credential; }) {
		checker.run(args);
		return new RetrieveOneTimePassword(args);
	});

	container.bind<ConnectAccountContract>('ConnectAccountContract', function (args: { page: Page; credential: Credential; }) {
		checker.run(args);
		return new ConnectAccount(args);
	});

	container.bind<CreateAccountContract>('CreateAccountContract', function (args: { page: Page; }) {
		checker.run(args);
		return new CreateAccount(args);
	});

	container.bind<RetrieveTokenContract>('RetrieveTokenContract', function (args: { page: Page; }) {
		checker.run(args);
		return new RetrieveToken({ ...args, retry: new Retry({ limit: 5, name: 'RetrieveToken' }), container });
	});

	container.bind<RecordTokenContract>('RecordTokenContract', function (args: { credential: Credential; }) {
		checker.run(args);
		return new RecordToken({ ...args, container });
	});

	return container;
}
