import { BaseModel } from './BaseModel';

export interface IProfile {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
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

    get firstName(): string {
        return this.props.firstName;
    }

    get lastName(): string {
        return this.props.lastName;
    }

    get email(): string {
        return this.props.email;
    }

    get phoneNumber(): string | undefined {
        return this.props.phoneNumber;
    }

    get avatarUrl(): string | undefined {
        return this.props.avatarUrl;
    }

    get dateOfBirth(): Date | null | undefined {
        return this.props.dateOfBirth;
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`.trim();
    }

    get initials(): string {
        return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
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
