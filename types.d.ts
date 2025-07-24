import type { PDFAPolicy } from './lookups.js';
type ActionMode = 'embedded' | 'remote';
type ActionStatus = 'COMPLETED' | 'DECLINED' | 'IN_PROGRESS' | 'NOT_STARTED' | 'STARTED';
type SignerType = 'approver' | 'certifio' | 'certifiocloud' | 'esig' | 'freezone';
type AuthenticationMethodReference = 'call' | 'certifiocloud' | 'link' | 'saml' | 'secret' | 'sms';
type Language = 'en' | 'fr';
export interface ConsignoCloudResponseWorkflow {
    msg: string;
    parameters: unknown;
    response: {
        id: string;
        version: number;
        name: string;
        status: 0 | 1 | 2 | 3 | 4 | 5;
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
                type: SignerType;
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                amr: AuthenticationMethodReference[];
                lang: Language;
                contactOwner: string;
                placeHolder: boolean;
                generated: boolean;
                iv: string;
            };
            status: ActionStatus;
            statusDate: string;
            mode: ActionMode;
            secondFactorUsed: Array<'none' | AuthenticationMethodReference>;
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
export interface ConsignoCloudRequestWorkflowCreate {
    name: string;
    expiresOn: `${number}-${number}-${number}` | number;
    pdfaPolicy: (typeof PDFAPolicy)[keyof typeof PDFAPolicy];
    documents: Array<{
        documentId?: string;
        name: string;
        data?: string;
        fields?: Array<{
            x: number;
            y: number;
            height: number;
            width: number;
            page: string;
            assignedTo: `${number}`;
        }>;
        anchors?: Array<{
            tag: string;
            assignedTo: `${number}`;
            xOffset: number;
            yOffset: number;
            height: number;
            width: number;
            page: string;
            skipIfNotFound?: boolean;
        }>;
    }>;
    /** 0 = create, 1 = create and launch */
    status: 0 | 1;
    actions: Array<{
        mode: ActionMode;
        returnUrl?: string;
        zoneLabel: string;
        step: number;
        ref: `${number}`;
        signer: {
            type: SignerType;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            /** Must be set when AMR = 'secret' */
            secretQuestion?: string;
            /** Must be set when AMR = 'secret' */
            secretAnswer?: string;
            /** Must be set when AMR = 'secret' */
            isSecretAnswerChanged?: boolean;
            amr?: AuthenticationMethodReference[];
            /** Must be set when type = 'certifio' */
            subjectDN?: string;
            lang?: Language;
            clientUserId?: string;
            role?: string;
            placeHolder?: boolean;
        };
    }>;
    notifications: Array<{
        contact: {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            secretQuestion?: string;
            secretAnswer?: string;
            isSecretAnswerChanged?: boolean;
            amr?: AuthenticationMethodReference[];
            lang?: Language;
        };
    }>;
    webhooks?: Array<{
        url: string;
        insecure: boolean;
    }>;
}
export {};
