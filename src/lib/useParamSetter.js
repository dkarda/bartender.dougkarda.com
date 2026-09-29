import { useSearchParams } from "react-router-dom";

export function useParamSetter() {
  const [params, setParams] = useSearchParams();

  function update(updates, replace = false) {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(updates)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    setParams(next, { replace });
  }

  return [params, update];
}
