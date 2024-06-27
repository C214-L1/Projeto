import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IInfo {
  action: string;
  payload: string;
}

export function updateSearchParams(info: IInfo) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  current.set(info.action, info.payload);

  const search = current.toString();
  const query = search ? `?${search}` : "";

  router.push(`${pathname}${query}`);
}
