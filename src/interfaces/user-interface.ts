export interface User {
  id: string;
  name: string;
  email?: string; // Optional, to store the user's email address
  roles: string[];
  isActive: boolean;
  avatarUrl?: string; // Optional, to store the URL of the user's profile picture
}
