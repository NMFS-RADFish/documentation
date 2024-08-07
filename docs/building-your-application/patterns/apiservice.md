---
sidebar_position: 3
---

# Integrating with Backend Services

The **`RADFishAPIService`** is a class designed to facilitate interactions with a backend API. It simplifies making HTTP requests (GET, POST, PUT, DELETE) by encapsulating them into easy-to-use class methods. This service handles the construction of requests, including headers and query parameters, and processes responses.

### **Features**

- **Token-based Authentication**: Manages API authentication using an access token.
- **HTTP Request Methods**: Supports GET, POST, PUT, and DELETE requests.
- **Error Handling**: Captures and returns error responses from an API.

### Why Use It

- **Simplification**: Abstracts the complexity of making HTTP requests and handling responses.
- **Reusability**: Can be easily reused across different components or services in your application.
- **Consistency**: Provides a consistent way to handle API requests and responses.
- **Error Handling**: Centralizes error handling logic, making it easier to manage.

### Usage

**Initializing the Service**

To use **`RADFishAPIService`**, instantiate it with an access token:

```jsx
import RADFishAPIService from "./RADFishAPIService";

const ApiService = new RADFishAPIService("your_access_token_here");
```

**Making API Requests**

- **`GET` Request**

  - Asynchronous function to perform a `GET` request
  - `@param {string} endpoint` - The API endpoint to perform the GET request.
  - `@param {Object} queryParams` - The query parameters for the GET request.
  - `@returns {Promise<Object|string>}` - A promise that resolves to the API response data or an error string.

  ```jsx
  const getData = async (endpoint, queryParams) => {
    return await ApiService.get(endpoint, queryParam);
  };

  getData("https://api.example.com/data", { param1: "a" });
  ```

- **`POST` Request**

  - Asynchronous function to perform a `POST` request
  - `@param {string} endpoint` - The API endpoint to perform the POST request.
  - `@param {Object} body` - The request body for the POST request.
  - `@returns {Promise<Object|string>}` - A promise that resolves to the API response data or an error string.

  ```jsx
  const postData = async (endpoint, body) => {
    return await ApiService.get(endpoint, body);
  };

  postData("https://api.example.com/data", { name: "foo" });
  ```

- **`PUT` Request**

  - Asynchronous function to perform a `PUT` request
  - `@param {string} endpoint` - The API endpoint to perform the PUT request.
  - `@param {Object} body` - The request body for the PUT request.
  - `@returns {Promise<Object|string>}` - A promise that resolves to the API response data or an error string.

  ```jsx
  const updateData = async (endpoint, body) => {
    return await ApiService.get(endpoint, body);
  };

  putData("https://api.example.com/data", { name: "bar" });
  ```

- **`DELETE` Request**

  - Asynchronous function to perform a `DELETE` request
  - `@param {string} endpoint` - The API endpoint to perform the DELETE request.
  - `@param {Object} body` - The request body for the DELETE request.
  - `@returns {Promise<Object|string>}` - A promise that resolves to the API response data or an error string.

  ```jsx
  const deleteData = async (endpoint, body) => {
    return await ApiService.get(endpoint, body);
  };

  deleteData("https://api.example.com/data", { id: 1 });
  ```

### **Handling Responses and Errors**

Responses and errors from the API are returned as promises.

### **Additional Information**

- The **`processQueryParameters`** and **`setHeaders`** functions are utility functions used internally by **`RADFishAPIService`** to process query parameters and set request headers, respectively.
- Ensure that the access token provided to **`RADFishAPIService`** is valid and has the necessary permissions for the requests being made.

By using **`RADFishAPIService`**, developers can streamline API interactions, making their code more readable and maintainable while handling various aspects of HTTP communication in a centralized manner.

---

# React Query

TODO
