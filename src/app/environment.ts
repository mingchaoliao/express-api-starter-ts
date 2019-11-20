export class Environment {
    constructor(private readonly env: NodeJS.ProcessEnv) {
        this.env = env;

        this.setDefaultValue('APP_ENV', 'production');
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
}