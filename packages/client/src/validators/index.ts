import loginValidator from './login-validator'
import registrationValidator from './registration-validator'
import updateUserValidator from './update-user-validator'
import changePasswordValidator from './change-password-validator'

import type Validator from './validator'

export {
  loginValidator,
  registrationValidator,
  updateUserValidator,
  changePasswordValidator,
}

export type { Validator }
