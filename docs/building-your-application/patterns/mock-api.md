---
sidebar_position: 4
---

# Mock API

As a frontend developer, it can sometimes be a blocker when you are developing a feature that has a dependency on an external API. Often times, you can be waiting for a backend developer to finish building our their API endpoints before you can continue building your feature. RADFishApp ships with a built-in mock server that allows the frontend developer to “stub out” and mock API requests/responses without this hard dependency during development.

More specifically, RADFishApp ships with [mock service worker](https://mswjs.io/) and is preconfigured in the boilerplate application.

At the entrypoint of the React application, we enable API mocking with the `enableMocking` function:

```jsx
async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root"));

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
```

Keep in mind that mocking should only be available during development, and should not ship with the production application. It can be useful to use a `NODE_ENV` environment variable to ensure that API mocks are only used in `DEVELOPMENT`. The `public/mockServiceWorker.js` file installs and configures the mock server. You should not need to modify this file.

**Configuring mock endpoints:**

In `src/mocks` you will notice a `browser.js` file and a `handlers.js` file. As a developer, you will do most of your work in `handlers.js` file, where you can add different mock http handlers to your application. For each handler you create, the mock service worker will intercept the request, and handle that request as defined in the file.

For instance:

```jsx
export const handlers = [
  http.get("/species", () => {
    return HttpResponse.json({ data: ["grouper", "marlin"] }, { status: 200 });
  }),
  http.post("/species", async ({ request }) => {
    const response = await request.json();
    return HttpResponse.json({ data: response }, { status: 201 });
  }),
];
```

This file creates two handlers, a `GET` and `POST` request that returns a `HttpResponse` to the application. We recommend looking at the [msw docs](https://mswjs.io/) for more detailed information on how to further customize this for your needs.

---
