# Stage 1: Exact Mobile Login/Profile UI Replication Plan — ARSCA

## 1. Overview & Objective
Replicate the ARSCA mobile authenticated profile UI to strictly match the reference image. When an authenticated Firebase user views the Login tab on mobile, they will see the clean, centered profile card with the exact 9 visual elements in precise vertical order, with no extraneous features, mock cards, or visual clutter.

---

## 2. Proposed Exact Files to Modify
To ensure strict change control, only the following **three existing files** will be modified:

1. **`src/components/LoginPage.tsx`**
   - Add `onLogout?: () => void;` to `LoginPageProps`.
   - In the authenticated state (`clientUser` or `authenticatedUser` present), replace the current unstyled/minimal state with the exact 9-element profile card.
   - Preserve the unauthenticated Google sign-in card ("Client Login" with "Continue with Google" and authorized-domain diagnostics).

2. **`src/components/BottomNav.tsx`**
   - In the 5th tab: When `clientUser` is present, change the label from `"Login"` to `"Profile"`.
   - Render the circular pale-mint initial avatar or user indicator with active green highlight matching the reference design.

3. **`src/App.tsx`**
   - Pass `onLogout={handleLogout}` into the `<LoginPage />` component instantiation so the "Sign out" button immediately signs out the user and clears state.

*No other files, database configurations, backend APIs, or routes will be created or touched.*

---

## 3. Visual Element Hierarchy & Specifications (Strict 9-Element Order)

Inside the centered white card (`bg-white rounded-2xl border border-[#E2DDD2] shadow-sm p-6 sm:p-8 max-w-sm w-full mx-auto`):

| # | Element | Specification & Styling |
|---|---|---|
| **1** | **Centered Circular Avatar** | `w-20 h-20 rounded-full bg-[#D1FAE5]` (pale mint-green), centered horizontally with relative positioning. |
| **2** | **User Initial** | Bold uppercase initial in dark teal (`text-2xl font-bold text-[#081E23]`), derived dynamically from `displayName` or `email` (e.g. "K" for Keshav). |
| **3** | **Checkmark Badge** | Small circular green badge overlapping lower-right edge of avatar (`absolute bottom-0 right-0 w-6 h-6 bg-[#20BA68] rounded-full border-2 border-white flex items-center justify-center text-white`). |
| **4** | **Heading** | `"Welcome back!"` in bold dark teal (`text-xl font-bold text-[#081E23] mt-4 text-center`). |
| **5** | **Display Name** | Authenticated user's actual display name (`text-sm font-semibold text-[#0F201C] mt-1 text-center truncate`). |
| **6** | **Email Address** | Authenticated user's actual email (`text-xs text-[#5C6E6A] mt-0.5 text-center truncate`). |
| **7** | **Status Pill** | Pale mint rounded pill with green check icon and text `"Successfully logged in"` (`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] border border-[#20BA68]/20 text-[#189452] text-xs font-medium mt-3 mx-auto`). |
| **8** | **Subtle Horizontal Divider** | Hairline separator line (`border-t border-[#EAE6DE] my-6 w-full`). |
| **9** | **Sign Out Button** | Full-width rounded outline button with sign-out icon (`LogOut` from `lucide-react`) and `"Sign out"` text (`w-full py-3 px-4 rounded-xl border border-[#D5CEC2] hover:bg-[#F8F6F0] active:bg-[#ECE5D8] text-[#081E23] font-semibold text-sm flex items-center justify-center space-x-2 transition-colors cursor-pointer`). |

---

## 4. Execution Workflow
- **Stage 1 (Current)**: Inspection & Approval Plan presented. Zero code files modified.
- **Stage 2 (Implementation upon approval)**: Apply the exact changes to `LoginPage.tsx`, `BottomNav.tsx`, and `App.tsx`.
- **Stage 3 (Verification)**: Run `compile_applet` and type-checking, verify mobile layout rendering and sign-out interaction.
