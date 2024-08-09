import axios from 'axios';
import Logger from '~/infrastructure/utils/logger.util';

export default function useNotification() {
	const base = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`;
	return {
		async notify(message: string): Promise<void> {
			try {
				await axios.get(
					base +
						`/sendMessage?chat_id=${process.env.TELEGRAM_CHANNEL}&text=${message}`,
				);
			} catch (error) {
				Logger.error(`telegram notify throw: ${error.name}`);
				console.log(
					'an error occurred when sending the error report for: ' + message,
				);
			}
		},
	};
}
