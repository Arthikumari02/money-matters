import { BaseModel } from './BaseModel';

export interface IProfile {
    id: string;
    userId: string;
    name: string;
    userName: string;
    email: string;
    presentAddress?: string;
    permanentAddress?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    avatarUrl?: string;
    dateOfBirth?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    [key: string]: unknown;
}

export class Profile extends BaseModel<IProfile> {
    constructor(profile: IProfile) {
        super({
            ...profile,
            dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : null,
            createdAt: new Date(profile.createdAt),
            updatedAt: new Date(profile.updatedAt)
        });
    }

    override get id(): string {
        return this.props.id;
    }

    get userId(): string {
        return this.props.userId;
    }

    get name(): string {
        return this.props.name as string;
    }

    get userName(): string {
        return this.props.userName as string;
    }

    get email(): string {
        return this.props.email;
    }

    get presentAddress(): string | undefined {
        return this.props.presentAddress;
    }

    get permanentAddress(): string | undefined {
        return this.props.permanentAddress;
    }

    get city(): string | undefined {
        return this.props.city;
    }

    get country(): string | undefined {
        return this.props.country;
    }

    get postalCode(): string | undefined {
        return this.props.postalCode;
    }

    get avatarUrl(): string | undefined {
        return this.props.avatarUrl;
    }

    get dateOfBirth(): Date | null | undefined {
        return this.props.dateOfBirth;
    }

    get fullName(): string {
        return `${this.name} ${this.userName}`.trim();
    }

    get initials(): string {
        return `${this.name[0]}${this.userName[0]}`.toUpperCase();
    }

    get formattedDateOfBirth(): string {
        return this.dateOfBirth ? this.dateOfBirth.toLocaleDateString() : 'Not set';
    }

    override toJSON(): IProfile {
        return {
            ...super.toJSON(),
            createdAt: new Date(this.props.createdAt),
            updatedAt: new Date(this.props.updatedAt)
        };
    }
}

export type CreateProfileDTO = Omit<IProfile, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProfileDTO = Partial<CreateProfileDTO>;
