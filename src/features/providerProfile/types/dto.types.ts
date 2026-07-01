export type ApplyProviderDto = {
    serviceTypeId: string;
    countryIso: string;
    bio?: string;
    commercialName?: string;
    customServiceName?: string;
    contactEmail?: string;
};

export type UpdateProviderProfileDto = {
    bio?: string;
    commercialName?: string;
    customServiceName?: string;
    experience?: number;
    coverageRadius?: number;
};

export type ToggleAvailabilityDto = {
    available: boolean;
};
