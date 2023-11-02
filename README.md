# RetroRatings

RetroRatings is a website used to rate nostalgic things from the 90s and 2000s.

## Features

- Rating nostalgic items from 0-5 stars
- Upload new items for anyone to rate
- See all your ratings in a tierlist format
- Sign up and log in with Email, GitHub, or Google

## Usage

RetroRatings is deployed via Firebase Hosting. It can be accessed at [retroratings.web.app](https://retroratings.web.app).

To deploy your own instance of RetroRatings, clone this repository and replace the Firebase config data located in `src/config/firebase.ts`. Running RetroRatings requires Firebase Authentication, Firestore Database, and Firebase Cloud Storage to be correctly configured:

- Firebase Authentication
  - The `Email/Password`, `Google`, and `GitHub` providers should be enabled.
- Firestore Database
  - Two collections, `rating-items` and `user-ratings` should be configured.
- Firebase Cloud Storage
  - A folder named `rating-items-images` should be configured.
- Firebase Hosting
  - A GitHub actions deploy workflow is included to allow GitHub actions to deploy directly to Firebase Hosting. A repository secret named `FIREBASE_SERVICE_ACCOUNT_RETRORATINGS` must be set in order to use this.

For additional documentation on the back-end API, see [API.md](docs/API.md).

To run RetroRatings' frontend locally:

```sh
git clone https://github.com/ethanl21/RetroRatings.git
cd retroratings
npm i
npm run dev
```

## Attribution

RetroRatings is developed and maintained by the following individuals:

- Allan Cortes [@Nalluh](https://github.com/Nalluh)
- Raquel Cruz [@rlcruz324](https://github.com/rlcruz324)
- Jose Gonzalez [@jose-gonzalez1](https://github.com/jose-gonzalez1)
- Ethan Lew [@ethanl21](https://github.com/ethanl21)

Additionally, the following open-source libraries and tools are used:

- [Vite](https://vitejs.dev)
- [Typescript](https://www.typescriptlang.org)
- [eslint](https://eslint.org)

- [react-bootstrap](https://react-bootstrap.github.io)
- [react-hook-form](https://www.react-hook-form.com)
- [dompurify](https://www.npmjs.com/package/dompurify)
- [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks)
- [react-icons](https://react-icons.github.io/react-icons/)
- [react-simple-star-rating](https://github.com/awran5/react-simple-star-rating)
- [nanoid](https://github.com/ai/nanoid)

RetroRatings is distributed under the MIT license.
