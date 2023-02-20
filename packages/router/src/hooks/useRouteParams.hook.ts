import {useRouter} from '../RouterCore';

export function useRouteParams() {
  const router = useRouter();
  return router.currentRoute?.params;
}
