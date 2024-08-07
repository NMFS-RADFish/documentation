---
sidebar_position: 5
---

# Components and Usage

## Building your first page and form

When building applications with React, there is an existing component library, [react-uswds](https://trussworks.github.io/react-uswds/?path=/story/welcome--welcome) that our project extends for the purposes of building any RADFish application. These components maintain all functionality of `react-uswds` components, but are branded with NOAA themes and styles. These components live in `react-radfish` directory, and allow for development in a modern React environment with NOAA look and feel.

For reference on the full `react-uswds` library, you can reference the deployed storybook:

[https://trussworks.github.io/react-uswds/](https://trussworks.github.io/react-uswds/?path=/story/welcome--welcome)

> 🚨 Note: Whenever possible, you should use components from `react-radfish` rather than importing components directly from `@trussworks/react-uswds`. This ensures that the component you are using have the correctly styles and theme applied.

**Example**

If you wanted to build a `TextInput` component into an existing form, you can use the `@trussworks` [storybook reference](https://trussworks.github.io/react-uswds/?path=/docs/components-text-input--default-text-input) related to component props that are available.

```jsx

import { TextInput, Label } from "@trussworks/react-uswds";

<Label htmlFor="fullName">Full Name</Label>
<TextInput
  id="fullName"
  name="fullName"
  type="text"
  placeholder="Full Name"
  value={formData["fullName"] || ""}
  aria-invalid={validationErrors.fullName ? "true" : "false"}
  validationStatus={validationErrors.fullName ? "error" : undefined}
  onChange={handleChange}
  onBlur={(e) => handleBlur(e, fullNameValidators)}
/>
```

### Forms

Controlled forms are a key aspect of any NOAA application, and is used to collect data relevant to that application in the context of the user. This could be intaking data related to trip reports, admin applications, or similar types of scope.

For more specific information regarding how to build a form, you can reference the [State Management](./state-management.md) portion of this documentation.

### Tables

Tables are also a key component type for all NOAA applications. These components are usually meant for visualizing data in a user friendly manner. However, there are cases where having this data also be writable (ie: submittable) to a backend. Utilizing caching strategies with IndexedDB is an effective way to ensure that these types of components remain fully functional when offline.

Form more specific information regarding how to build a table, you can reference the [State Management](./state-management.md) portion of this documentation.
