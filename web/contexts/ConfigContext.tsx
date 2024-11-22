'use client';

import { Config, TestType } from "@/models/Config";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ConfigContextProps = {
    config: Config;
    setConfig: Dispatch<SetStateAction<Config>>;
    selectTestType: (_: TestType) => void;
}

const ConfigContext = createContext<ConfigContextProps | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<Config>({
        testTypeKey: 'Discursive',
        name: true,
        area: true,
        autoTheme: true,
        theme: '',
        prompt: ''
    });

    function selectTestType(testTypeKey: TestType): void {
        setConfig(prev => ({ ...prev, testTypeKey: testTypeKey }));
    }

    return (
        <ConfigContext.Provider value={{ config, setConfig, selectTestType }}>
            { children }
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    const context = useContext(ConfigContext);

    if(!context)
        throw new Error('useConfig must be used within an ConfigProvider');

    return context;
}