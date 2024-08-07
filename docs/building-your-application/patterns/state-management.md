---
sidebar_position: 2
---

# State Management

**What is State Management?**

In the world of NOAA web app development, we frequently deal with various forms of data, from user inputs like form data to environmental statistics such as fish populations or weather changes. State management is our tool for keeping track of all these changes efficiently. Think of it as a digital notepad that records every update and change within the app, ensuring we always have the most current information at our fingertips.

**Why Use State Management in NOAA Apps?**

Our applications are not just repositories of static data; they are dynamic platforms where data constantly evolves. State management is essential for several reasons:

Stay Updated: It allows us to display the most up-to-date information to our users, ensuring accuracy and reliability.
Work Offline: It enables our apps to function even in the absence of an internet connection, storing data locally and syncing it back to our servers once a connection is re-established.
Be Fast and Responsive: It helps our apps to react swiftly to user interactions and data changes, providing a smooth and efficient user experience.
A Simple Way to Manage State: Using React Context

For sharing and managing state across different parts of our applications, we use a feature called React Context. This is akin to creating a communal space where any component of our app can easily access or update shared information, eliminating the complexity of passing data through multiple layers.

**How We Implement State Management**

**FormState**

Our approach to managing form state is straightforward yet effective. Each form should maintain it's own state within the component itself. Note, that this is the recommended approach for managing a form's state, rather that reaching for a centralized state machine (think React Context or Redux) as it is more straightforward to implement without any excess layers of abstraction.

The potential downside of this approach is that each form will have it's own state management implemented independantly, which could lead to less DRY code. This is an acceptable tradeoff in most cases, but if you notice that certain patterns should be shared among different components, you will either need to pass these state values as props to child components, or wrap the related components in a `ContextProvider` and expose them via the `useContext` hook. See more about how to use React Context [here](https://react.dev/reference/react/useContext)

For an example on best practices for implementing this type of form state management, you can run any of several example implementations with the RADFish CLI:

`npx @nmfs-radfish/create-radfish-app my-app --template examples/computed-form-fields`

Below is a simplified code snippet on how to set this form state management up in a React component:

```jsx
const SimplifiedForm = () => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatchToast({ status: "success", message: "Successful form submission" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="fullName">Full Name</Label>
      <TextInput
        id={fullName}
        name={fullName}
        type="text"
        placeholder="Full Name"
        value={formData["fullName"] || ""}
        onChange={(event) => {
          const { value } = event.target;
          setFormData({
            ...formData,
            ["fullName"]: value,
          });
        }}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
```

**_Flexibility and Debugging:_**

This method allows developers to implement form state within the scope of a single file, making it simpler to build out forms for different use cases. If certain repeatable patterns arise, they can be broken out into a separate context provider if needed, or alternatively get passed in as props to child components.

This approach provides better encapsulation and modularity, allowing for more straightforward debugging and maintenance of form-related logic.

**TableState**

At a high level, we handle state management for tables in a similar way, although we are leveraging React Context to abstract and many of the implementation details of more complex state management away from the component. We do this by using a React context provider to wrap whichever table needs state to be managed. For instance, within the boilerplate repository, you can see how `DemoTable` is wrapper by `TableWrapper`

```jsx
<TableWrapper>
  <DemoTable />
</TableWrapper>
```

By doing this, `DemoTable` can now utilize the `useTableState` hook, that provides the component with all of the state, event handlers, sorting functionality, as well as other pieces of functionality that may be needed for the application’s needs.

More specifically, RADFish leverages a React Library called [Tanstack Table](https://tanstack.com/table/latest/docs/framework/react/react-table) which makes it simple to handle traditionally tricky table interactions like sorting, filtering, and data fetching. Tanstack Table manages a lot of the heavy lifting with regards to re-rendering, and provides an easy to use interface to make static tables dynamic and interactive.

We suggest looking closely at the official Tanstack Table documentation to get familiar with how the library works. But, in the context of the boilerplate repo, we’ve provided a simple interface in `TableWrapper` that leverages the `useReactTable` hook.

This hook gives access to the data from the table, along with the data structures and many of the event handlers that a developer may need for their form:

```jsx
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

/**
 * React Table instance. Initializes the table with the data being managed in TableWrapper state
 * Columns are set to the memoized value returned from the useMemo hook above
 * state and helper methods are to provide helper methods to render data, and re-render based on sorting functionality
 */
const table = useReactTable({
  data,
  columns,
  state: {
    sorting,
  },
  onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
});
```

Similar to how state is passed into the children components from context, these handlers can also be passed into the child `Table` component, doesn’t need to implement all of these details on it’s own. You can see that the `DemoTable` component is mostly just responsible for rendering out components, and isn’t responsible for managing a lot of these details.

---

# Offline / Online State Management

A key consideration for any NOAA application, is for it to be able to be fully functional offline without a network connection. Fishermen are often on ships far away from network connection, and need to reliably store data to be uploaded to NOAA services when the app comes back online. For this reason, building with “offline first” considerations is of vital importance to NOAA web application development.

Progressive Web Applications (or PWAs) offer a robust solution for offline use at sea, by combining the benefits of a familiar app-like experience, offline access, and efficient data management. These features make PWAs well-suited for maritime environments, where connectivity is often limited or intermittent.

PWAs leverage service workers, which are scripts that run in the background independantly of the main application. Service workers enable offline functionality by caching important static resources, such as HTML, CSS, and JavaScript files. This allows the PWA to continue functioning event when there’s no network connectivity.

**See more about service workers [here](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)**

Service workers are integrated into the RADFish application by default. After scaffolding the application you will notice the following files:

`service-worker.js`

`serviceWorkerRegistration.js`

And the service workers is integrated into the React app in the app’s `index.js` entrypoint:

```jsx
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
```

This will register the React application as a PWA, which can be downloaded from the browser. For more information on how to download the PWA onto your device, see [this blog article](https://aureatelabs.com/blog/install-pwa-to-device/)

Additionally, you can query for whether or not the RADFish application is online or offline by leveraging the [navigator API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)

> Note, that this service worker is preconfigured when using the boilerplate `react-javascript` template

It is up to the developer on how, or where this API needs to be used, but it is a good idea to use it early on in your application, so that the rest of the application can listen for changes in offline state. The `@nmfs-radfish/react-radfish` package exposes a `useOfflineStatus` hook that allows you a simple way to tap into whether or not your application is online:

```jsx
import { Application, useOfflineStatus } from "@nmfs-radfish/react-radfish";

function App() {
  const { isOffline } = useOfflineStatus();

  return (
    <Application>
      <h3 className="header-body">
        Network Status: {isOffline ? "Offline ❌" : "Online ✅"}
      </h3>
    </Application>
  );
}
```

This underlying code listens for changes surfaced from the `navigator` API, and notifies the application in the form of a Toast message of the applications online/offline state.

> 🚨 Warning: Note that there is a known issue, where if the user's device is in an offline state, and the RADFish application is booted up for the first time, the Navigator API will actually resolve to "offline". On future refreshes, this will appropriately resolve to the "offline" status. This is an issue with the underlying Navigator API and will be addressed in a future release.

## **Caching Strategy**

It is important to fetch and cache required data needed to basic app functionality while the application is online. This can be done by fetching the required data from an API, and storing that data into IndexedDB. To see a basic example of how this can be done, you can run the `server-sync` example from the CLI:

`npx @nmfs-radfish/create-radfish-app my-app --template examples/server-sync`

This example fetches several JSON arrays from our Mock API, then stores and caches it in IndexedDB. The application then can reference the data in IndexedDB without needing to have any network connection. Keep in mind that it is up to the developer to decide when and how to invalidate this IndexedDB cache in according to their application's needs.

## **Offline Storage**

To use offline data storage, use the `useOfflineStorage` hook. This React hook provides methods for managing offline form data. There are two storage methods available `LocalStorageMethod` or `IndexedDBStorageMethod`.

### Configuration

Step-by-step instructions to configure offline storage:

1. **Set the environment variables in the `.env` files. Based on which offline storage method you select, the following env variables are required:**
   1. Local Storage
      1. `VITE_LOCAL_STORAGE_KEY`
   2. Indexed DB:
      1. `VITE_INDEXED_DB_NAME`
      2. `VITE_INDEXED_DB_VERSION`
      3. `VITE_INDEXED_DB_TABLE_NAME`
      4. `VITE_INDEXED_DB_SCHEMA`
2. **In the `src/hooks/useOfflineStorage.js` file, initialize one of the following Storage Method instances, and pass the appropriate environment variables using `import.meta.env.REPLACE_WITH_KEY_NAME` as parameters:**

   1. `**LocalStorageMethod**` — Requires one parameter, the key name for localStorage.

      ```jsx
      const storageMethod = new LocalStorageMethod(
        import.meta.env.VITE_LOCAL_STORAGE_KEY
      );
      ```

   2. `**IndexedDBStorageMethod**` — Requires four parameters, the db name, db version, db table name, db schema.

      ```jsx
      const storageMethod = new IndexedDBStorageMethod(
        import.meta.env.VITE_INDEXED_DB_NAME,
        import.meta.env.VITE_INDEXED_DB_VERSION,
        import.meta.env.VITE_INDEXED_DB_TABLE_NAME,
        import.meta.env.VITE_INDEXED_DB_SCHEMA
      );
      ```

3. **In the `src/hooks/useOfflineStorage.js` file, create the `StorageModelFactory` :**

   ```jsx
   // 1. Choose one of the following storage methods:
   const storageMethod = new IndexedDBStorageMethod(
     import.meta.env.VITE_INDEXED_DB_NAME,
     import.meta.env.VITE_INDEXED_DB_VERSION,
     import.meta.env.VITE_INDEXED_DB_TABLE_NAME,
     import.meta.env.VITE_INDEXED_DB_SCHEMA
   );
   const storageMethod = new LocalStorageMethod(
     import.meta.env.VITE_LOCAL_STORAGE_KEY
   );
   // 2. Create Storage Method
   const storageModel = StorageModelFactory.createModel(storageMethod);
   ```

### **`useOfflineStorage` Hooks API**

The `useOfflineStorage` hook returns an object with the following methods:

- **`createOfflineDataEntry(data)` —** Creates a new data entry in the storage.
  - `data`: The data object to create.
  - Returns a promise that resolves when the data is created.
- **`findOfflineData(criteria)`** — Finds data in the storage based on the given criteria, returns all data if not criteria parameter is passed.
  - `criteria`: The criteria object to use for finding data, eg `{uuid: 123}`.
  - Returns a promise that resolves to an array of tuples:
    - `[ [ uuid, { key: value } ], [ uuid2, { key: value } ] ]`
- **`updateOfflineDataEntry(criteria, data)`** — Updates data in the storage.
  - `criteria`: The criteria to use for updating data. This should be an object.
  - `data`: The updated data object.
  - Returns a promise that resolves to the updated data as an object:
    - `{ numberOfFish: 10, species: salmon }`

### **Usage**

```jsx
import useOfflineStorage from "./useOfflineStorage";

function MyComponent() {
  const { createOfflineDataEntry, findOfflineData, updateOfflineDataEntry } =
    useOfflineStorage();
  const data = { species: "Grouper", numberOfFish: 100 };

  // Create new offline data entry
  createOfflineDataEntry(data);
  // Find all offline data
  findOfflineData();
  // Find a specific offline data entry by uuid
  findOfflineData({ uuid: "1234" });
  // Update an offline data entry by uuid
  updateOfflineDataEntry({ uuid: "1234" }, data);

  // rest of code....
}

export default MyComponent;
```

---

# OfflineStorageWrapper Usage Guide

`OfflineStorageWrapper` is a context wrapper component that provides offline storage functionality to its child components through a React context. It supports both IndexedDB and LocalStorage methods.

## How to Use

**1. Wrap your component with `OfflineStorageWrapper`:**

```jsx
import { OfflineStorageWrapper } from "./path-to-OfflineStorageWrapper";

<OfflineStorageWrapper config={config}>
  <YourComponent />
</OfflineStorageWrapper>;
```

The config prop is an object that specifies the storage type and configuration. It should include the `type` set to `indexedDB` or `localStorage`, database name (`string`), database version number (`number`), and stores (`object`).

The `stores` object should contain a key that is mapped as the table name, the value should be a comma separated string that outlines the schema. For more information on setting up the stores, please see the official `Dexie.js` docs: [https://dexie.org/docs/Tutorial/React#3-create-a-file-dbjs-or-dbts](https://dexie.org/docs/Tutorial/React#3-create-a-file-dbjs-or-dbts).

For IndexedDB, the configuration should look like this:

```js
const config = {
  type: "indexedDB",
  name: "your_db_name",
  version: 1,
  stores: {
    table_name_1: "uuid, name",
    // Add more stores as needed
  },
};
```

For LocalStorage, the configuration should look like this:

```js
const config = {
  type: "localStorage",
  name: "your_storage_name",
};
```

**2. Use the useOfflineStorage hook in child components:**

```jsx
import { useOfflineStorage } from "./path-to-OfflineStorageWrapper";

function YourComponent() {
  const {
    createOfflineData,
    findOfflineData,
    updateOfflineData,
    deleteOfflineData,
  } = useOfflineStorage();

  // Use these functions to interact with offline storage
}
```

The `useOfflineStorage` hook provides four functions:

- `createOfflineData(tableName, data):` Creates a new record in the specified table.
- `findOfflineData(tableName, criteria):` Finds records in the specified table that match the criteria.
- `updateOfflineData(tableName, data):` Updates a record in the specified table.
- `deleteOfflineData(tableName, uuid):` Deletes a record with the specified UUID from the specified table.

## Error Handling

If you try to use the `useOfflineStorage` hook outside of an `OfflineStorageWrapper`, it will throw an error. Always make sure to use `useOfflineStorage` within a component that's wrapped with `OfflineStorageWrapper`.

## Testing during development

As a developer, you will often run into an issue where you are developing an "offline-first" feature that needs to be tested before pushed and merged into the `main` branch. For instance, you may be developing a `Toast` message that notifies the user whenever they go offline. If you are simply running the local vite server, and you go offline to test your feature, you'll notice that the page breaks on page refresh. This is because the `serviceWorker` is not being used until the production build is created. In order to do this, you need to bundle the application and serve it locally in order to simulate a production environment:

`npm run build && npm run serve`

This will bundle the application and serve it, so that when you turn your browser offline, the cached static assets will remain, and your application will not break when the page is refreshed.
