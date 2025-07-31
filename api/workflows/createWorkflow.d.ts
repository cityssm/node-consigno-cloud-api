import type { ConsignoCloudAPIType } from '../../index.js';
import type { ActionModes, AuthenticationMethodReferences, CreateWorkflowStatuses, Languages, PDFAPolicies, SignerTypes } from '../../lookups.js';
import type { ConsignoCloudResponseWorkflow } from './types.js';
export declare function createWorkflow(this: ConsignoCloudAPIType, workflowDefinition: CreateWorkflowRequest): Promise<ConsignoCloudResponseWorkflow>;
interface Document_UploadAsData {
    name: string;
    /**
     * The content of the document, base64 encoded.
     */
    data: string;
}
interface Document_PreviouslyUploaded {
    documentId: string;
}
interface Signer_Type_Certifio {
    type: 'certifio';
    subjectDN: string;
}
interface Signer_Type_Other {
    type: Exclude<(typeof SignerTypes)[keyof typeof SignerTypes], 'certifio'>;
}
interface SignerAndContact_AMR_Secret {
    amr: Array<(typeof AuthenticationMethodReferences)[keyof typeof AuthenticationMethodReferences]>;
    secretQuestion: string;
    secretAnswer: string;
    isSecretAnswerChanged: true;
}
interface SignerAndContact_AMR_NoSecret {
    amr: Array<Exclude<(typeof AuthenticationMethodReferences)[keyof typeof AuthenticationMethodReferences], 'secret'>>;
}
export interface CreateWorkflowAnchor {
    tag: string;
    xOffset: number;
    yOffset: number;
    /** Default = 165 */
    height?: number;
    width?: number;
    assignedTo: `${number}`;
    page: string;
    skipIfNotFound?: boolean;
}
export interface CreateWorkflowRequest {
    name: string;
    expiresOn: `${number}-${number}-${number}` | number;
    pdfaPolicy: (typeof PDFAPolicies)[keyof typeof PDFAPolicies];
    documents: Array<(Document_PreviouslyUploaded | Document_UploadAsData) & {
        fields?: Array<{
            x: number;
            y: number;
            /** Default = 165 */
            height?: number;
            width?: number;
            assignedTo: `${number}`;
            page: string;
        }>;
        anchors?: CreateWorkflowAnchor[];
    }>;
    /** 0 = create, 1 = create and launch */
    status: (typeof CreateWorkflowStatuses)[keyof typeof CreateWorkflowStatuses];
    actions: Array<{
        mode?: (typeof ActionModes)[keyof typeof ActionModes];
        returnUrl?: string;
        zoneLabel: string;
        step: number;
        ref: `${number}`;
        signer: (Signer_Type_Certifio | Signer_Type_Other) & (SignerAndContact_AMR_NoSecret | SignerAndContact_AMR_Secret) & {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            lang?: (typeof Languages)[keyof typeof Languages];
            clientUserId?: string;
            role?: string;
            placeHolder?: boolean;
        };
    }>;
    notifications: Array<{
        contact: (SignerAndContact_AMR_NoSecret | SignerAndContact_AMR_Secret) & {
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            lang?: (typeof Languages)[keyof typeof Languages];
        };
    }>;
    webhooks?: Array<{
        url: string;
        /** Default = false */
        insecure?: boolean;
    }>;
}
export {};
