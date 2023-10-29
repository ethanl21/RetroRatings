# RetroRatings back-end API

Our back-end API is a database hosted by Firestore. It has this high-level structure:

## rating-items

- `rating-items`: Map (key-value pairs)
  - `<item id>`: Document
    - `addedBy`: String (uses auth.currentUser.uid)
    - `averageRating`: Number (initialized to 0)
    - `dateAdded`: Timestamp (initialized to current time)
    - `description`: String
    - `image`: String (url of the uploaded image)
    - `name`: String
    - `ratingCount`: Number (initialized to zero)

The `rating-items` collection is a list of key-value pairs describing each item that can be rated. The key is a unique id (auto-generated, `<item id>` above) and the value is the Document described above.

### Reading

To read items from the database, you must be logged in. As a logged on user, execute the following:

```ts
import { getRatingItems } from "./tasks/getRatingItems"; // replace with the path to getRatingItems.ts relative to the current file

const itemsToReturn = 10; // don't try to read all the items, since there may be a large amount

getRatingItems(itemsToReturn)
  .then((returnedItems) => {
    // will return an object of the rating items
    // note: image URLs will be in gs:// form and must be
    // converted to download URLs using firebase's getDownloadUrl() function
  })
  .catch((err) => {
    // handle the error here
  });
```

You can also get a single rating item's information:

```ts
const ratingItemId = "abcd"; // replace with the selected item's id

getRatingItem(ratingItemId)
  .then((returnedItem) => {
    // process the item here
    // note: the gs:// image URL is converted to the real URL as convenience in this function
  })
  .catch((err) => {
    // handle the error here
  });
```

`getRatingItemImage` is provided as a convenience function. It is used in the same way as `getRatingItem`, but only returns the image URL of the selected item if it exists.

### Writing

To add a new item to the database, you must be logged in. As a logged in user, execute the following:

```ts
import { addRatingItem } from "./tasks/addItem"; // replace with the path to addItem.ts relative to the current file

const itemName = "my new item";
const itemDescription = "this is a sample item!";
// const image = <some file object>;

addRatingItem(itemName, itemDescription, image)
  .then(() => {
    // there should be no output on success
  })
  .catch((err) => {
    // do something with the error here
  });
```

## user-ratings

- `user-ratings`: Map (key-value pairs)
  - `<user id>`: Array
    - `<item id>`: Number

The `user-ratings` collection is a list of key-value pairs that hold all of the site's ratings per user. For each entry in the list, the key is the user's unique id (you can get this with `auth.currentUser?.uid`) and the value is the numerical rating that the user has chosen.

### Reading

To read a user's rating, you must be logged in. As a logged in user, execute the following:

```ts
import { getUserRatings } from "./tasks/getUserRatings"; // replace with the path to getUserRatings.ts relative to the current file

const userId = auth.currentUser.uid; // replace this with the user's id

getUserRatings(userId)
  .then((returnedRatings) => {
    // will return an object of the user's ratings, or undefined if they haven't rated anything
  })
  .catch((err) => {
    // handle the error here
  });
```

You can also get a single rating:

```ts
const userId = auth.currentUser.uid; // replace with the user's id
const itemId = "abcd"; // replace with the item id

getUserRating(userId, itemId)
  .then((returnedRating) => {
    // process rating here
  })
  .catch((err) => {
    // handle the error here
  });
```

### Writing

To add a rating, you must be logged in. To add a rating for the current user:

```ts
import { addRating } from "./tasks/addRating"; // replace with the path to addRating.ts relative to the current file

const id = "abcd"; // replace with the id of the item to rate
const ratingVal = 5; // replace with the selected rating

addRating(id, ratingVal)
  .then(() => {
    // returns nothing on success
  })
  .catch((err) => {
    // handle the error here
  });
```

The average rating of a rating item will be updated whenever a user creates, updates, or deletes a rating.
