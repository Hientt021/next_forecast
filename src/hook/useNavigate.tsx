import { useSelector } from "react-redux";
import { useAppSelector } from "../lib/redux/store";
import { UNIT } from "@/app/weather/type";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useNavigate = () => {
  const { unit } = useAppSelector((state) => state.app);
  const search = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = useMemo(() => {
    let result: any = {};
    search.forEach((value, key) => {
      result = { ...result, [key]: value };
    });
    return result;
  }, [search]);

  const createSearchParams = (url: string, params: any) => {
    const api = Object.keys(params).reduce(
      (prev: string, cur: string, index: number) => {
        if (params[cur])
          return prev + (index ? "&" : "") + cur + "=" + params[cur];
        else return prev;
      },
      url + "?"
    );
    return api;
  };

  const onNavigate = ({ path, query }: { path?: string; query: any }) =>
    router.push(createSearchParams(path || pathname, query));

  const onQueryChange = (query: any) => {
    router.push(createSearchParams(pathname, query));
  };

  return {
    query,
    createSearchParams,
    onNavigate,
    onQueryChange,
  };
};

export default useNavigate;
