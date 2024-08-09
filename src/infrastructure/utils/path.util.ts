import * as path from 'path';

export default class Path {
	public static root(file: string): string {
		return path.join(process.cwd(), file);
	}
}
