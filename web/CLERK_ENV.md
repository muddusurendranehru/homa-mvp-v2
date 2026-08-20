# Clerk environment variables

Add these to your **`web/.env.local`** file (create the file if it doesn’t exist). Get the values from [clerk.com](https://clerk.com) → your application → API Keys.

```env
# Clerk (replace with your keys from clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY** — Publishable key (starts with `pk_test_` or `pk_live_`). Safe to expose in the browser.
- **CLERK_SECRET_KEY** — Secret key (starts with `sk_test_` or `sk_live_`). Server-only; never commit or expose in the client.

After login or signup, users are redirected to **/dashboard**.

Optional (if Clerk redirects to `/sign-in` instead of `/auth`):

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
```

To enable **Google login**, enable the Google provider in the Clerk Dashboard: Configure → User & Authentication → Social Connections → Google.

---

## Fix 403 / "Phone numbers from India are not supported"

If sign-up fails with **403 (Forbidden)** or you see **"Phone numbers from this country (India) are currently not supported"**, Clerk is trying to require or verify an Indian phone number, which may not be supported in your plan.

**Fix in Clerk Dashboard:**

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com) → your application.
2. **User & Authentication** → **Email, phone, username** (or **Sign-up options**).
3. Set **Phone number** to **Optional** or **Off** for sign-up.
4. Rely on **Email** (and/or **Google**) only for sign-up and sign-in.

After saving, sign-up should complete with email or Google only; the "Fill in missing fields" step will no longer require a phone number.
