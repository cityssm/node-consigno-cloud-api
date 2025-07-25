export declare const PDFAPolicy: {
    readonly None: 0;
    readonly Preferred: 1;
    readonly Mandatory: 2;
};
export declare const WorkflowStatus: {
    readonly 0: "Created, Not Launched";
    readonly 1: "Launched, In Progress";
    readonly 2: "Completed";
    readonly 3: "Expired";
    readonly 4: "Created from Template, Not Launched";
    readonly 5: "Declined";
};
export declare const CreateWorkflowStatus: {
    readonly Create: 0;
    readonly CreateAndLaunch: 1;
};
export declare const ActionMode: {
    readonly Embedded: "embedded";
    readonly Remote: "remote";
};
export declare const Language: {
    readonly English: "en";
    readonly French: "fr";
};
export declare const SignerType: {
    readonly Approver: "approver";
    readonly Certifio: "certifio";
    readonly CertifioCloud: "certifiocloud";
    readonly Esig: "esig";
    readonly Freezone: "freezone";
};
export declare const AuthenticationMethodReference: {
    readonly Call: "call";
    readonly CertifioCloud: "certifiocloud";
    readonly Link: "link";
    readonly SAML: "saml";
    readonly Secret: "secret";
    readonly SMS: "sms";
};
