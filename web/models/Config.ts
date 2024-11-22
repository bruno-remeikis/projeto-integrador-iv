export type TestType = 'Test' | 'Discursive' | 'Objective' | 'Essay' | 'Work';

export type ConfigFromSwitch = {
    name: boolean;
    area: boolean;
    autoTheme: boolean;
}

export type Config = ConfigFromSwitch & {
    testTypeKey: TestType;

    theme: string;

    prompt: string;
}