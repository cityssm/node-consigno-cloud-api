# ConsignO Cloud API for Node

[![DeepSource](https://app.deepsource.com/gh/cityssm/node-consigno-cloud-api.svg/?label=active+issues&show_trend=true&token=g4HQMRMjtWEHNN2a7PwGpdjt)](https://app.deepsource.com/gh/cityssm/node-consigno-cloud-api/)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=cityssm_node-consigno-cloud-api&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=cityssm_node-consigno-cloud-api)

**An unofficial wrapper around the [ConsignO Cloud](https://consignocloud.com/) API.**

_Note that this project is not endorsed by Notarius._

💡 See the [ConsignO Cloud Basic API Documentation](https://support.notarius.com/wp-content/uploads/api/consigno-cloud-api-en.html) for more information.

## Installation

When development is more complete, the package will be published on NPM.
Until then, it can be installed from the GitHub repository.

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

💡 Using this package in a Typescript environment is encouraged to help with complex function parameters.

- `getWorkflow(workflowId)`
- `createWorkflow(workflowDefinition)`
- `downloadDocuments(workflowId)`
- `downloadAuditTrail(workflowId)`

## Related Projects

**[PDF Puppeteer](https://www.npmjs.com/package/@cityssm/pdf-puppeteer)**<br />
Converts URLs and HTML to PDFs using Puppeteer.

**[Sunrise Cemetery Management System (CMS)](https://github.com/cityssm/sunrise-cms)**<br />
A completely free, open source, web-based application to assist cemetery managers with managing their cemetery records.

💡 Discover even more on [the City of Sault Ste. Marie's GitHub page](https://cityssm.github.io/).
