import * as reviews from './reviews';
import * as drinks from './drinks';
import * as auth from './auth';
import * as profile from './profile';
import * as locations from './locations';

export const api = {
  ...drinks,
  ...reviews,
  ...auth,
  ...profile,
  ...locations,
};
