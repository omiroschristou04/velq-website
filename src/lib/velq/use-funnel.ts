import { useCallback, useEffect, useState } from "react";
import { emptyFunnel, loadFunnel, saveFunnel, clearFunnel, type FunnelState } from "./funnel-storage";

/** Loads the public funnel from localStorage after hydration; `ready` is false until then. */
export function useFunnel() {
  const [state, setState] = useState<FunnelState>(emptyFunnel);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setState(loadFunnel());
    setReady(true);
  }, []);

  const update = useCallback((fn: (s: FunnelState) => FunnelState) => {
    setState((s) => {
      const next = fn(s);
      setSaved(saveFunnel(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    clearFunnel();
    setState(emptyFunnel());
  }, []);

  return { state, ready, saved, update, reset };
}
