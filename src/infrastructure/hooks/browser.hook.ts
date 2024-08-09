import { firefox } from 'playwright';
import browser from '~/infrastructure/configs/browser.config';

export default async function useBrowser() {
	return await firefox.launch(browser);
}
