/*
 * Request Lookups
 */
export const PDFAPolicies = {
    None: 0,
    Preferred: 1,
    Mandatory: 2
};
export const CreateWorkflowStatuses = {
    Create: 0,
    CreateAndLaunch: 1
};
export const ActionModes = {
    Embedded: 'embedded',
    Remote: 'remote'
};
export const Languages = {
    English: 'en',
    French: 'fr'
};
export const SignerTypes = {
    Approver: 'approver',
    Certifio: 'certifio',
    CertifioCloud: 'certifiocloud',
    Esig: 'esig',
    Freezone: 'freezone'
};
export const AuthenticationMethodReferences = {
    Call: 'call',
    CertifioCloud: 'certifiocloud',
    Link: 'link',
    SAML: 'saml',
    Secret: 'secret',
    SMS: 'sms'
};
/*
 * Response Lookups
 */
export const WorkflowStatuses = {
    0: 'Created, Not Launched',
    1: 'Launched, In Progress',
    2: 'Completed',
    3: 'Expired',
    4: 'Created from Template, Not Launched',
    5: 'Declined',
    6: 'Deleted'
};
/*
 * Export all lookups
 */
export default {
    ActionModes,
    AuthenticationMethodReferences,
    CreateWorkflowStatuses,
    Languages,
    PDFAPolicies,
    SignerTypes,
    WorkflowStatuses
};
