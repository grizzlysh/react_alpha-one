import { useEffect } from 'react';
import { useRouter } from 'next/router';

type RedirectProps = {
  toUrl    : string;
  condition: boolean;
};

export default function useRedirect({ toUrl, condition }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (condition && router.pathname !== toUrl)
      router.replace(toUrl, undefined, { shallow: true });
  }, [condition, toUrl, router]);
}
