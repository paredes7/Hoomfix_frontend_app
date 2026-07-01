import { createContext, useContext, useState } from 'react';

type ActiveProfileContextType = {
    activeServiceId: string | null;
    setActiveServiceId: (id: string | null) => void;
};

const ActiveProfileContext = createContext<ActiveProfileContextType>({
    activeServiceId: null,
    setActiveServiceId: () => {},
});

export function ActiveProfileProvider({ children }: { children: React.ReactNode }) {
    const [activeServiceId, setActiveServiceId] = useState<string | null>(null);

    return (
        <ActiveProfileContext.Provider value={{ activeServiceId, setActiveServiceId }}>
            {children}
        </ActiveProfileContext.Provider>
    );
}

export function useActiveProfile() {
    return useContext(ActiveProfileContext);
}
