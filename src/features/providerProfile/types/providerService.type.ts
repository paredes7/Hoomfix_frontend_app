import type { ProviderProfileStatus } from './enums.types';

export type ProviderDocument = {
    id: string;
    providerServiceId: string;
    url: string;
    publicId: string;
    name: string | null;
    createdAt: string;
};

export type ProviderServiceProfile = {
    id: string;
    providerServiceId: string;
    bio: string | null;
    experience: number | null;
    coverageRadius: number | null;
    commercialName: string | null;
    customServiceName: string | null;
    contactEmail: string | null;
    servicePhoto: string | null;
};

export type ProviderWallet = {
    id: string;
    currency: string;
    balance: number;
};

export type ServiceType = {
    id: string;
    name: string;
};

export type ProviderServiceCountry = {
    iso: string;
    name: string;
};

export type ProviderService = {
    id: string;
    userId: string;
    serviceTypeId: string;
    countryIso: string;
    status: ProviderProfileStatus;
    submittedForReview: boolean;
    available: boolean;
    rating: number;
    totalRatings: number;
    createdAt: string;
    profile: ProviderServiceProfile | null;
    providerWallet: ProviderWallet | null;
    documents: ProviderDocument[];
    serviceType: ServiceType;
    country: ProviderServiceCountry;
};
