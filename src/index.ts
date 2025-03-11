import { trackEvent } from './namingConvention';

// Test tracking an event
trackEvent('cart_add_item', { itemId: 123 });
trackEvent('auth_update_session_pending');

// ❌ TypeScript Error: Invalid format
// trackEvent('cartItemAdded');