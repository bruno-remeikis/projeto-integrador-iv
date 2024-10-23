'use client';

import { Config } from "@/models/Config";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ConfigContextProps = {
    config: Config;
    setConfig: Dispatch<SetStateAction<Config>>;
}

const ConfigContext = createContext<ConfigContextProps | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<Config>({
        name: true,
        area: true,
        prompt: ''
    });

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
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