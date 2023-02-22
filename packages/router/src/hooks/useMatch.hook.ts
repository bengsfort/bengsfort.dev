import {useRouter} from '../RouterCore';

export function useMatch(path: string) {
  const router = useRouter();
  return router.currentRoute?.path === path;
}
