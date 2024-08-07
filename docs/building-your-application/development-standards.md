---
sidebar_position: 4
---

# Development Standards

---

**USWDS**

USWDS (United States Web Design System) is a web design system that specifies coding patterns, components, and design tokens that outline how government applications should be built while adhering to 508 compliance guidelines.

More specifically, when building applications with React, there is an existing component library, [react-uswds](https://trussworks.github.io/react-uswds/?path=/story/welcome--welcome) that our project extends for the purposes of building any RADFish application. These components maintain all functionality of `react-uswds` components, but are branded with NOAA themes and styles. These components live in `react-radfish` directory, and allow for development in a modern React environment with NOAA look and feel.

For reference on the full `react-uswds` library, you can reference the deployed storybook:

[https://trussworks.github.io/react-uswds/](https://trussworks.github.io/react-uswds/?path=/story/welcome--welcome)

The benefit of referencing and leveraging `react-radfish` when building applications is to increase developer velocity, design consistency, and ensures that front-end development is happening in compliance with government regulation. The storybook above provides examples of a wide variety of compliant components that can be used to build apps for a wide variety of use cases.

<aside>
🚨 Note: Whenever possible, you should use components from `react-radfish` rather than importing components directly from `@trussworks/react-uswds`. This ensure that the component you are using have the correctly styles and theme applied.

If you need another component for your application support, please see `CONTRIBUTING` section (In progress)

</aside>

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

---

### **NOAA Branding Guidelines and Style Guide**

Branding refers to the process of creating a distinct identity for a product or application. It involves defining and maintaining a set of visual elements, such as logos, colors, and typography, that represent the brand.

You will notice, that the components above do not have any `className` assigned, and you may be wondering how to style that component. To do this, there are a couple of things to keep in mind.

1. Each component in `react-radfish` has it’s own scoped css file, that modifies the existing `@trussworks` css in order to inject NOAA styles. This file should not be touched. If you notice a bug or issue, please see `CONTRIBUTING`
2. You can modify the general theme of these components in the `styles/theme.css` file. You can change things like color variables, font-family, and line-height here, and they will be propagated throughout the application, as well as throughout `react-radfish` . RADFish utilizes css variables, and can be used like so:

```css
// styles/theme.js
:root {
  --noaa-dark-blue: #0054a4;
}

// form.css
.your-custom-class {
  background-color: var(--noaa-dark-blue);
}
```

1. If you need to add additional styles to a particular component, you can do so by adding another `className` **after** the component has been imported from `react-radfish`

```jsx
import { Label } from "../react-radfish";

<Label htmlFor="fullName" className="your-custom-class">
  Full Name
</Label>;
```

By following this method, you can leverage the underlying `uswds` component, maintain the NOAA theme, and can extend if further to suit you needs as a developer.

**_508 Compliance (Section 508 of the Rehabilitation Act)_**

508 compliance, also known as Section 508 compliance, refers to the adherence to accessibility standards outlined in Section 508 of the Rehabilitation Act. In the context of web development, it signifies the design and development of websites and digital content in a manner that ensures accessibility for individuals with disabilities. In a nutshell, this ensures that website can be navigated and understood by users with various disabilities, such as those with visual or auditory impairments. Developers must follow these guidelines to ensure their websites are accessible and usable by everyone, promoting an inclusive and diverse online experience.

As NOAA is a governmental agency, Section 508 compliance is crucial for the development of frontend apps because it ensures that these applications are accessible to all users, including those with disabilities. NOAA provides vital information related to weather, oceans, and atmospheric conditions, and it is imperative that individuals with diverse abilities can access and utilize these resources.

508 compliance has been a driving factor for many decisions we make in RADFish, from extending a compliant component library in `@trussworks/react-uswds` to our UX strategies.

**Resources:**
Read more about 508 compliance here: [https://www.section508.gov/](https://www.section508.gov/)
