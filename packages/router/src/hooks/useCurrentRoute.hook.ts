import {useRouter} from '../RouterCore';

export function useCurrentRoute() {
  const router = useRouter();

  if (router.currentRoute === null)
    throw new Error(`No route found!`);


  return router.currentRoute;
}
