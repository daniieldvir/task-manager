import { createPropertySelectors } from '@ngxs/store';
import { AuthState, AuthStateModel } from './auth.state';

export class AuthSelectors {
  static slices = createPropertySelectors<AuthStateModel>(AuthState);
}
