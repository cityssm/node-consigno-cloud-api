import type { ActionModes, AuthenticationMethodReferences, Languages, SignerTypes, WorkflowStatuses } from '../../lookups.js';
type ActionStatus = 'COMPLETED' | 'DECLINED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'STARTED';
export interface ConsignoCloudResponseWorkflow {
    msg: string;
    parameters: unknown;
    response: {
        id: string;
        version: number;
        name: string;
        status: keyof typeof WorkflowStatuses;
        documents: Array<{
            documentId: string;
            name: FunctionStringCallback;
            originalDocumentId: string;
            fields: Array<{
                x: number;
                y: number;
                width: number;
                height: number;
                assignedTo: string;
                name: string;
                visible: boolean;
                locked: boolean;
                assignable: boolean;
                merged: boolean;
                signed: boolean;
                declined: boolean;
                page: `${number}`;
            }>;
        }>;
        totalActions: number;
        remainingActions: number;
        createdBy: string;
        assignTo: string;
        createdOn: string;
        createdInVersion: string;
        modifiedBy: string;
        modifiedOn: string;
        expiresOn: string;
        auditTrailDocumentId: string;
        reminderBeforeExpirationSent: boolean;
        acls: unknown;
        webhooks: Array<{
            url: string;
            insecure: boolean;
        }>;
        duplicateWebhooks: boolean;
        workflowOwnerEmailsEnabled: boolean;
        parallelActions: boolean;
        finalizedInVersion: string;
        signatureInProgress: boolean;
        editUrl: string;
        sequentialDocuments: boolean;
        actions: Array<{
            id: string;
            step: number;
            signer: {
                type: (typeof SignerTypes)[keyof typeof SignerTypes];
                firstName: string;
                lastName: string;
                email: string;
                phone: string;
                amr: Array<(typeof AuthenticationMethodReferences)[keyof typeof AuthenticationMethodReferences]>;
                lang: (typeof Languages)[keyof typeof Languages];
                contactOwner: string;
                placeHolder: boolean;
                generated: boolean;
                iv: string;
            };
            status: ActionStatus;
            statusDate: string;
            mode: (typeof ActionModes)[keyof typeof ActionModes];
            secondFactorUsed: Array<'none' | (typeof AuthenticationMethodReferences)[keyof typeof AuthenticationMethodReferences]>;
            declineReason: unknown;
        }>;
        statusDate: string;
        ownerLastName: string;
        ownerEmail: string;
        organizationId: string;
        identificationText: string;
        personWithUndownloadedFinalDocuments: Array<{
            email: string;
            firstName: string;
            lastName: string;
        }>;
        hasOwnerDownloadedFinalDocuments: boolean;
        personWithDownloadedFinalDocuments: Array<{
            email: string;
            firstName: string;
            lastName: string;
        }>;
        personWithDownloadedAuditTrail: Array<{
            email: string;
            firstName: string;
            lastName: string;
        }>;
    };
}
export {};
