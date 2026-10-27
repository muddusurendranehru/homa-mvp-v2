/** Routes that use AppShell (sidebar). Marketing homepage and rest of site do not. */
export const PATIENT_CARE_APP_SHELL_PATHS = ['/labs', '/pharmacy', '/emergency'] as const;

export function usesPatientCareAppShell(pathname: string | null): boolean {
  if (!pathname) return false;
  return PATIENT_CARE_APP_SHELL_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}
