'use client';

import { Config } from "@/models/Config";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ConfigContextProps = {
    config: Config;
    setConfig: Dispatch<SetStateAction<Config>>;
    selectTestType: (_: string) => void;
}

const ConfigContext = createContext<ConfigContextProps | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<Config>({
        testTypeKey: 'Discursive',
        name: true,
        area: true,
        prompt: ''
    });

    function selectTestType(testTypeKey: string): void {
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