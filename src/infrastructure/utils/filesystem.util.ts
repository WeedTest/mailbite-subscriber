import * as fs from 'fs';
import Path from '~/infrastructure/utils/path.util';

export default class Filesystem {
	public static read(file: string): string {
		return fs.readFileSync(Path.root(file), 'utf8');
	}

	public static append(file: string, data: string): void {
		fs.appendFileSync(Path.root(file), data + '\n');
	}

	public static write(file: string, data: string): void {
		fs.writeFileSync(Path.root(file), data);
	}

	public static stream(file: string): fs.ReadStream {
		return fs.createReadStream(Path.root(file));
	}
}
