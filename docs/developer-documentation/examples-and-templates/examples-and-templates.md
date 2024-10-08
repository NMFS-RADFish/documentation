---
sidebar_position: 2
---

# Examples and Templates

## Examples

Examples are small, scoped projects that are meant to demonstrate how to implement core pieces of functionality within the RADFish ecosystem. Each example includes a detailed `README.md` file about the purpose of each example, and the reasoning behind the design pattern, and the best practices utilized in each.

These examples are meant to be a reference for any RADFish project. While these examples can certainly be used as a starting point to build out a new RADFish application, we still suggest starting with a fresh `react-javascript` template (see below).

You can visualize the source code for each example at the open source repository for the overall RADFish [boilerplate](https://github.com/NMFS-RADFish/boilerplate/tree/main/examples). Each of these examples can be cloned and run separately as you are working with each from the RADFish CLI. To learn more about how to run these scripts, please reference the [running examples](./building-your-application/available-scripts/running-example) section of this documentation

Below are a list of pre-built examples that you can use as a starting point for your application. These examples are scoped to one core feature.

1. [Computed Form Fields](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/computed-form-fields/README.md)
1. [Conditional Form Fields](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/conditional-form-fields/README.md)
1. [Field Validators](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/field-validators/README.md)
1. [Mock API](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/mock-api/README.md)
1. [Multistep Form](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/multistep-form/README.md)
1. [Network Status](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/network-status/README.md)
1. [On Device Storage](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/on-device-storage/README.md)
1. [Persisted Form](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/persisted-form/README.md)
1. [Server Sync](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/server-sync/README.md)
1. [Simple Table](https://github.com/NMFS-RADFish/boilerplate/blob/main/examples/simple-table/README.md)

## Templates

Templates are meant to be a clean starting point for a new RADFish project. These templates are framework specific. Note that at the time of this writing, only the `react-javascript` template is supported, though new frameworks/languages are planned to be supported in the future!

The template will come pre-configured with everything you need to get up and running to start coding your new project as quickly as possible. This will include the core modules of RADFish, including service-worker configuration, application routing, and offline storage.

If you want to create a new project based from the `react-javascript` library, you can execute the following RADFish CLI command, similar to how you run examples: `npx @nmfs-radfish/create-radfish-app my-app --template react-javascript`

This will create a new RADFish project named `my-app` in your current working directory. Happy hacking!

Note: The `react-javascript` template is the default, so running `npx @nmfs-radfish/create-radfish-app my-app` will create the same project without needing to specify the template.