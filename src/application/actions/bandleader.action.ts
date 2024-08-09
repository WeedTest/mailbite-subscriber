import Confirmation from './confirmation.action';
import Registration from './registration.action';
import Subscription from './subscription.action';
import type Contract from '~/domain/contracts/action.contract';

type Props = {
	registration: Registration;
	confirmation: Confirmation;
	subscription: Subscription;
};

export default class Bandleader implements Contract {
	private readonly registration: Registration;
	private readonly confirmation: Confirmation;
	private readonly subscription: Subscription;

	constructor(props: Props) {
		this.registration = props.registration;
		this.confirmation = props.confirmation;
		this.subscription = props.subscription;
	}

	public async run(): Promise<void> {
		await this.registration.run();
		await this.confirmation.run();
		await this.subscription.run();
	}
}
