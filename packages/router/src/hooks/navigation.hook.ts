import {useRouter} from '../RouterCore';

export function useNavigateTo() {
  const router = useRouter();
  return router.navigateTo;
}

export function useRedirect() {
  const router = useRouter();
  return router.redirect;
}

export function useBack() {
  const router = useRouter();
  return router.back;
}

export function useForward() {
  const router = useRouter();
  return router.forward;
}
