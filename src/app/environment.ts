export class Environment {
    readonly LOG_LEVEL = 'APP_LOG_LEVEL';
    readonly PROD_LOG_DEFAULT_LEVEL = 'error';
    readonly NON_PROD_LOG_DEFAULT_LEVEL = 'debug';
    readonly ENV = 'APP_ENV';
    readonly PRODUCTION = 'production';

    constructor(private readonly env: NodeJS.ProcessEnv) {
        this.env = env;

        this.setDefaultValue(this.ENV, this.PRODUCTION);
        this.setDefaultValue(this.LOG_LEVEL, this.isProduction() ? this.PROD_LOG_DEFAULT_LEVEL : this.NON_PROD_LOG_DEFAULT_LEVEL);
    }

    private setDefaultValue(key: string, value: string): void {
        if (!(key in this.env)) {
            this.env[key] = value;
        }
    }

    set(key: string, value: string) {
        this.env[key] = value;
    }

    get(key: string): string | number | null | boolean | undefined {
        return this.env[key];
    }

    getEnvironment(): string {
        return String(this.get(this.ENV));
    }

    isProduction(): boolean {
        return this.getEnvironment() === this.PRODUCTION;
    }

    getLogLevel(): string {
        return String(this.get(this.LOG_LEVEL));
    }
}