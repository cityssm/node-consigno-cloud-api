export declare const PDFAPolicies: {
    readonly None: 0;
    readonly Preferred: 1;
    readonly Mandatory: 2;
};
export declare const CreateWorkflowStatuses: {
    readonly Create: 0;
    readonly CreateAndLaunch: 1;
};
export declare const ActionModes: {
    readonly Embedded: "embedded";
    readonly Remote: "remote";
};
export declare const Languages: {
    readonly English: "en";
    readonly French: "fr";
};
export declare const SignerTypes: {
    readonly Approver: "approver";
    readonly Certifio: "certifio";
    readonly CertifioCloud: "certifiocloud";
    readonly Esig: "esig";
    readonly Freezone: "freezone";
};
export declare const AuthenticationMethodReferences: {
    readonly Call: "call";
    readonly CertifioCloud: "certifiocloud";
    readonly Link: "link";
    readonly SAML: "saml";
    readonly Secret: "secret";
    readonly SMS: "sms";
};
export declare const WorkflowStatuses: {
    readonly 0: "Created, Not Launched";
    readonly 1: "Launched, In Progress";
    readonly 2: "Completed";
    readonly 3: "Expired";
    readonly 4: "Created from Template, Not Launched";
    readonly 5: "Declined";
    readonly 6: "Deleted";
};
declare const _default: {
    ActionModes: {
        readonly Embedded: "embedded";
        readonly Remote: "remote";
    };
    AuthenticationMethodReferences: {
        readonly Call: "call";
        readonly CertifioCloud: "certifiocloud";
        readonly Link: "link";
        readonly SAML: "saml";
        readonly Secret: "secret";
        readonly SMS: "sms";
    };
    CreateWorkflowStatuses: {
        readonly Create: 0;
        readonly CreateAndLaunch: 1;
    };
    Languages: {
        readonly English: "en";
        readonly French: "fr";
    };
    PDFAPolicies: {
        readonly None: 0;
        readonly Preferred: 1;
        readonly Mandatory: 2;
    };
    SignerTypes: {
        readonly Approver: "approver";
        readonly Certifio: "certifio";
        readonly CertifioCloud: "certifiocloud";
        readonly Esig: "esig";
        readonly Freezone: "freezone";
    };
    WorkflowStatuses: {
        readonly 0: "Created, Not Launched";
        readonly 1: "Launched, In Progress";
        readonly 2: "Completed";
        readonly 3: "Expired";
        readonly 4: "Created from Template, Not Launched";
        readonly 5: "Declined";
        readonly 6: "Deleted";
    };
};
export default _default;
