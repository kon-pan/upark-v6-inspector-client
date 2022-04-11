export interface IInspector {
  id: number;
  firstName?: string;
  lastName?: string;
  displayName: string;
  email: string;
  passwordChanged: boolean;
  role: string;
}
