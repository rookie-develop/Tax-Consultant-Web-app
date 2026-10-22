export interface SubService {
  id: string;
  title: string;
  shortDesc: string;
  badge?: string;
  keyHighlights: string[];
  customMessageTemplate?: (categoryTitle: string, subServiceTitle: string, firmName: string) => string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  iconName: 'FileText' | 'Receipt' | 'PieChart' | 'Building2' | 'ShieldAlert' | 'Calculator' | 'Briefcase' | 'Scale' | 'Landmark' | 'IndianRupee' | 'ReceiptIndianRupee';
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
    activeBg: string;
    badgeBg: string;
  };
  subServices: SubService[];
}

export interface AppConfig {
  firmName: string;
  firmSubtitle: string;
  whatsappNumber: string; // international format without + or spaces, e.g. "919876543210"
  displayPhone: string;
  emailContact: string;
  workingHours: string;
  whatsappChannelUrl?: string;
  youtubeChannelUrl?: string;
}

export interface ClientUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL?: string | null;
}

export interface ClientRecord {
  id: string; // Document ID (e.g., 'ARSCA001')
  name: string;
  email: string;
  uid: string;
  driveFolderId: string;
}

export type TaxObligationType =
  | 'gstr1'
  | 'gstr3b'
  | 'cmp08'
  | 'advance_tax'
  | 'itr_salaried'
  | 'itr_business'
  | 'tax_audit'
  | 'tds';

export interface ClientPreference {
  uid: string;
  email: string;
  obligations: TaxObligationType[];
  gstFilingFrequency: 'monthly' | 'quarterly';
  pushNotificationsEnabled: boolean;
  updatedAt?: string | number;
}

export interface FCMTokenRecord {
  tokenId: string;
  token: string;
  uid: string;
  platform: 'web' | 'android_twa';
  browser?: string;
  createdAt: number;
  updatedAt: number;
  status: 'active' | 'stale';
}

export interface TaxDeadline {
  id: string;
  taxType: TaxObligationType;
  title: string;
  period: string;
  frequency: 'monthly' | 'quarterly' | 'annual';
  statutoryDueDate: string; // YYYY-MM-DD
  effectiveDueDate: string; // YYYY-MM-DD (accounts for extensions)
  isExtended: boolean;
  extensionCircularRef?: string;
  applicableAudience: 'all' | 'monthly_filers' | 'quarterly_filers';
  status: 'active' | 'archived';
  updatedBy?: string;
}

export interface NotificationRule {
  id: string;
  name: string;
  taxType: TaxObligationType;
  daysBeforeDeadline: number;
  isEnabled: boolean;
  titleTemplate: string;
  bodyTemplate: string;
  actionUrl: string;
  isTestRule: boolean;
  targetTestUids?: string[];
}

export interface InAppNotification {
  id: string;
  uid: string; // 'broadcast' or specific user UID
  title: string;
  body: string;
  category: 'deadline' | 'circular' | 'general' | 'system';
  taxType?: TaxObligationType;
  effectiveDueDate?: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: number;
}

export interface DeliveryLog {
  id: string; // Idempotency key: `${ruleId}_${deadlineId}_${period}_${uid}`
  idempotencyKey: string;
  ruleId: string;
  deadlineId: string;
  period: string;
  uid: string;
  tokensTargeted: number;
  successCount: number;
  failureCount: number;
  staleTokensRemoved: number;
  status: 'delivered' | 'failed' | 'skipped_duplicate';
  sentAt: number;
  errorLog?: string[];
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'superadmin' | 'staff';
  createdAt?: number;
}

