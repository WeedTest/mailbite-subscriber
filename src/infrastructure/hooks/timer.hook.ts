type State = {
	start: [number, number] | null;
	end: [number, number] | null;
};
export default function useTimer() {
	const state: State = { start: null, end: null };
	return {
		start(): void {
			state.start = process.hrtime();
		},
		end(): void {
			state.end = process.hrtime();
		},
		reset(): void {
			state.start = null;
			state.end = null;
		},
		time(): string {
			if (!state.start || !state.end) {
				return 'Timer not started or ended';
			}
			const ms =
				(state.end[0] - state.start[0]) * 1000 +
				(state.end[1] - state.start[1]) / 1000000;
			return (ms / (60 * 1000)).toFixed(2) + ' min';
		},
	};
}
