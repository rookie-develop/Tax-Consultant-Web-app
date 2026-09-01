import { AppConfig, ServiceCategory, SubService } from '../types';

/**
 * Builds a clean, professional, service-specific WhatsApp request text.
 */
export function generateWhatsAppMessage(
  category: ServiceCategory,
  subService: SubService,
  config: AppConfig
): string {
  // If a subservice has a custom message template override, use it
  if (subService.customMessageTemplate) {
    return subService.customMessageTemplate(category.title, subService.title, config.firmName);
  }

  // Standard professional ARSCA request template
  return `Hello ${config.firmName} Team,

I would like to enquire / request assistance regarding *${subService.title}* (${category.title}).

Please guide me regarding:
• Required documents checklist
• Filing process & estimated timeline
• Applicable service fees

Looking forward to your guidance. Thank you!`;
}

/**
 * Builds the standard WhatsApp Click-to-Chat URL
 * Uses https://wa.me/<number>?text=<encoded_message>
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  // Clean phone number: remove any non-digit characters
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
