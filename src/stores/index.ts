/**
 * FOREIGNER_APP 状态管理索引
 */

// 用户状态
export { useUserStore, UserState, User, UserStats, Achievement, ACHIEVEMENTS } from './userStore';

// 预订状态
export { useBookingStore, BookingState, BookingType, BookingStatus } from './bookingStore';

// 支付状态
export { usePaymentStore, PaymentState, PaymentMethod, PaymentStatus } from './paymentStore';

// 翻译状态
export { useTranslationStore, TranslationState, TranslationHistoryItem, SavedPhrase, LANGUAGE_OPTIONS } from './translationStore';
