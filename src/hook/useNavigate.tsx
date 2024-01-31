import { useSelector } from "react-redux";
import { useAppSelector } from "../lib/redux/store";
import { UNIT } from "@/app/(dashboard)/weather/type";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IParams {
  pathname?: string;
  query?: any;
}
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

  const createSearchParams = (props: IParams) => {
    const { pathname: pathParam = pathname, query = {} } = props;
    const api = Object.keys(query).reduce(
      (prev: string, cur: string, index: number) => {
        if (query[cur])
          return prev + (index ? "&" : "") + cur + "=" + query[cur];
        else return prev;
      },
      pathParam + "?"
    );

    return api;
  };

  const onNavigate = (props: IParams) => router.push(createSearchParams(props));

  const onQueryChange = (props: any) => {
    const str = createSearchParams({ query: props });
    router.replace(str);
  };

  return {
    query,
    createSearchParams,
    onNavigate,
    onQueryChange,
  };
};

export default useNavigate;
