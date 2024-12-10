export const enum HeaderAction {
  UserData = 'user-data',
  Profile = 'profile',
  Settings = 'settings',
  Logout = 'logout'
}

// Objeto com valores para runtime
export const HeaderActions = {
  UserData: 'user-data',
  Profile: 'profile',
  Settings: 'settings',
  Logout: 'logout'
} as const;

// Tipo derivado dos valores do objeto
export type HeaderActionType = typeof HeaderActions[keyof typeof HeaderActions];
