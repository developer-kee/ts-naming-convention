// Define allowed values for structured naming
type Feature = 'cart' | 'auth' | 'order';
type Action = 'add' | 'remove' | 'update';
type ObjectType = 'item' | 'quantity' | 'session';
type State = 'success' | 'failed' | 'pending' | undefined;

// Define the type-safe naming format
type NamingConvention<
    F extends Feature,
    A extends Action,
    O extends ObjectType,
    S extends State = undefined
> = S extends undefined
    ? `${F}_${A}_${O}`
    : `${F}_${A}_${O}_${S}`;

// Define allowed naming conventions
export type StrictNamingConvention = NamingConvention<'cart', 'add', 'item'> | NamingConvention<'cart', 'remove', 'item', 'failed'> | NamingConvention<'auth', 'update', 'session', 'pending'>;

// Type-safe function
export function trackEvent(
    event: StrictNamingConvention,
    details?: Record<string, unknown>
) {
    switch (event) {
        case 'cart_add_item':
            break;
        case 'cart_remove_item_failed':
            break;
        case 'auth_update_session_pending':
            break;
        default:
            break;
    }

    console.log(`Tracking Event: ${event}`, details);
}
