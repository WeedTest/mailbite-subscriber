import app from '~/infrastructure/configs/app.config';

export default class Util {
	public static delay(ms: number) {
		return new Promise<void>((resolve) => {
			let count = 0;
			const interval = setInterval(() => {
				if (app.debug) console.log('delay...' + ++count);
			}, 1000);
			setTimeout(
				() => {
					clearInterval(interval);
					resolve();
				},
				ms * parseInt(Util.env('SPEED_COEFFICIENT')),
			);
		});
	}

	public static log(message: any): void {
		if (app.debug) console.log(message);
	}

	public static env(name: string): string {
		return process.env[name] as string;
	}
}
