# **TS-Naming-Convention**

A **TypeScript utility** for enforcing **structured naming conventions** in projects. It ensures **consistent, type-safe naming** for various use cases such as events, API routes, and state management keys.

---

## **Code Explanation**

### **1️⃣ Naming Convention Type Definition**

The core of the project is the **`NamingConvention`** type, which ensures that names follow a strict pattern:

```typescript
export type NamingConvention<
  F extends Feature,
  A extends Action,
  O extends ObjectType,
  S extends State = undefined
> = S extends undefined
  ? `${F}_${A}_${O}`
  : `${F}_${A}_${O}_${S}`;
```

#### **What This Does:**
- **`F` (Feature)** → Defines the primary category (e.g., `cart`, `auth`).
- **`A` (Action)** → Represents the action being performed (e.g., `add`, `remove`).
- **`O` (ObjectType)** → Specifies the target of the action (e.g., `item`, `session`).
- **`S` (State, optional)** → Provides an optional state descriptor (e.g., `success`, `failed`).

✅ **Example Usage:**
```typescript
type CartAddItemSuccess = NamingConvention<'cart', 'add', 'item', 'success'>;
// Result: "cart_add_item_success"
```

---

### **2️⃣ Predefined Naming Values**
To restrict allowed values, the following types are defined:

```typescript
export type Feature = 'cart' | 'auth' | 'order';
export type Action = 'add' | 'remove' | 'update';
export type ObjectType = 'item' | 'quantity' | 'session';
export type State = 'success' | 'failed' | 'pending' | undefined;
```

This ensures **only valid combinations** can be used, preventing typos and inconsistencies.

✅ **Example Restriction:**
```typescript
type InvalidEvent = NamingConvention<'cart', 'checkout', 'item'>; // ❌ TypeScript Error
```

---

### **3️⃣ Defining a Safe Event List**
The `CartEvents` object defines **only selected valid events**, while TypeScript ensures that no invalid keys are used.

```typescript
export const CartEvents: Partial<Record<NamingConvention<Feature, Action, ObjectType, State>, string>> = {
  'cart_add_item_success': 'An item was successfully added to the cart.',
  'cart_remove_item_failed': 'Failed to remove an item from the cart.',
  'auth_update_session_pending': 'User session update is pending.'
};
```

🔹 **Why use `Partial<Record<...>>`?**
- Allows defining only a few entries while **still enforcing strict naming rules**.
- Prevents invalid keys from being added.

---

### **4️⃣ Event Validation Function**
This function checks if a given event exists in `CartEvents`.

```typescript
export function validateEvent<EventName extends keyof typeof CartEvents>(
  event: EventName
): boolean {
  return Object.prototype.hasOwnProperty.call(CartEvents, event);
}
```

✅ **Example Usage:**
```typescript
console.log(validateEvent('cart_add_item_success')); // true
console.log(validateEvent('auth_update_session_pending')); // true

// ❌ TypeScript Error: Invalid key
// console.log(validateEvent('cart_some_random_event')); 
```

---

### **5️⃣ Compiling the Code**
To compile the TypeScript code, run:

```sh
npx tsc
```

This generates a `dist/` folder with compiled JavaScript files (if `noEmit` is set to `false` in `tsconfig.json`).

---

## **Why Use This Utility?**
✅ **Prevents human errors** in naming conventions.
✅ **Improves readability** by enforcing structured naming.
✅ **Avoids inconsistencies** across event tracking, API routes, and state keys.
✅ **Fully TypeScript-powered** → No runtime dependencies!

This project provides a **scalable** and **reliable** way to enforce structured naming in TypeScript projects.

---

## **License**
This project is licensed under the **MIT License**.

---

For any issues or feature requests, please create an issue on GitHub. 🚀

