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
  iconName: 'FileText' | 'Receipt' | 'PieChart' | 'Building2' | 'ShieldAlert' | 'Calculator' | 'Briefcase' | 'Scale';
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
}
