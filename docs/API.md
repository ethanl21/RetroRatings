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

(todo)

### Writing

To add a new item to the database, you must be logged in. As a logged in user, execute the following:

```jsx
import { addRatingItem } from "./tasks/addItem"; // replace with the path to addItem.tsx relative to the current file

const itemName = "my new item";
const itemDescription = "this is a sample item!";
// const image = <some file object>;

try {
  await addRatingItem(itemName, itemDescription, image);
} catch (err) {
  // handle the error here
}
```

## user-ratings

- `user-ratings`: Map (key-value pairs)
  - `<user id>`: Array
    - `<item id>`: Number

The `user-ratings` collection is a list of key-value pairs that hold all of the site's ratings per user. For each entry in the list, the key is the user's unique id (you can get this with `auth.currentUser?.uid`) and the value is the numerical rating that the user has chosen.

### Reading

(todo)

### Writing

(todo)
