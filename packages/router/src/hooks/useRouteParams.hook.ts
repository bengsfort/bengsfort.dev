import {useRouter} from '../RouterCore';

export function useRouteParams<T extends Record<string, any> = Record<string, any>>() {
  const router = useRouter();
  return router.currentRoute?.params as T;
}
