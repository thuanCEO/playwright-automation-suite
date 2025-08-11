import chalk from 'chalk';

type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

export class Logger {
    private static getTime(): string {
        return new Date().toISOString();
    }

    private static format(level: LogLevel, message: string): string {
        const time = this.getTime();
        switch (level) {
            case 'INFO':
                return `${chalk.gray(time)} ${chalk.blue('[INFO]')} ${message}`;
            case 'DEBUG':
                return `${chalk.gray(time)} ${chalk.cyan('[DEBUG]')} ${message}`;
            case 'WARN':
                return `${chalk.gray(time)} ${chalk.yellow('[WARN]')} ${message}`;
            case 'ERROR':
                return `${chalk.gray(time)} ${chalk.red('[ERROR]')} ${message}`;
            default:
                return `${chalk.gray(time)} [${level}] ${message}`;
        }
    }

    static info(message: string): void {
        console.log(this.format('INFO', message));
    }

    static debug(message: string): void {
        console.debug(this.format('DEBUG', message));
    }

    static warn(message: string): void {
        console.warn(this.format('WARN', message));
    }

    static error(message: string): void {
        console.error(this.format('ERROR', message));
    }
}
