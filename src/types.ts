/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Registration {
  id: string;
  phoneNumber: string;
  timestamp: string;
  status: 'pending_review' | 'contacted' | 'admitted';
  note?: string;
}

export interface VerificationCodeState {
  code: string;
  phoneNumber: string;
  expiresAt: number;
}
