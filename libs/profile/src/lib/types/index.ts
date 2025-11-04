export interface Profile {
  id: string;
  name: string;
  userName: string;
  email: string;
  avatarUrl?: string | null;
  dateOfBirth?: Date | null;
  presentAddress?: string | null;
  permanentAddress?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
}
