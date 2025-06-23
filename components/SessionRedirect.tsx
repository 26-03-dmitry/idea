'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function SessionRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      const targetPath = new URL(redirect).pathname;
      if (targetPath && targetPath !== pathname) {
        router.replace(targetPath);
      }
    }
  }, [pathname, router]);

  return null; // This component does not render anything
} 