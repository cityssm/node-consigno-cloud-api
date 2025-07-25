# ConsignO Cloud API for Node

An unofficial wrapper around the [ConsignO Cloud](https://consignocloud.com/) API.

_Note that this project is not endorsed by Notarius._

## Installation

When development is more complete, the package will be available from NPM.
Until then, it can be install from the GitHub repository.

```sh
npm install github:cityssm/node-consigno-cloud-api
```

## Usage

```javascript
import { ConsignoCloudAPI } from '@cityssm/consigno-cloud-api'

const api = new ConsignoCloudAPI({
  baseUrl: 'https://consigno.example.com/api/v1',
  apiKey: 't0p-secr3t-k3y',
  apiSecret: 'sup3r-secr3t-s3cret'
})

// Optionally impersonate a user
api.setLoginAs('clerk', '3rd-p@rty-app-p@ssw0rd')

// Get a workflow
const workflowData = await api.getWorkflow('workflowABC')
```

## Supported APIs

Using this package in a Typescript environment is encouraged to help with complex function parameters.

- `getWorkflow(workflowId)`
- `createWorkflow(workflowDefinition)`
