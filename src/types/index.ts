export interface Command {
	name: string;
	command(...args: any[]): void;
}