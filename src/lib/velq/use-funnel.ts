import { useCallback, useEffect, useRef, useState } from "react";
import { emptyFunnel, loadFunnel, saveFunnel, clearFunnel, type FunnelState } from "./funnel-storage";

/** Persist a confirmation before navigating to the membership route. */
export function useFunnel() {
  const [state, setState] = useState<FunnelState>(emptyFunnel);
  const current = useRef(state);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    current.current = loadFunnel();
    setState(current.current);
    setReady(true);
  }, []);

  const update = useCallback((fn: (s: FunnelState) => FunnelState) => {
    const next = fn(current.current);
    current.current = next;
    setSaved(saveFunnel(next));
    setState(next);
  }, []);

  const reset = useCallback(() => {
    clearFunnel();
    current.current = emptyFunnel();
    setState(current.current);
    setSaved(true);
  }, []);

  return { state, ready, saved, update, reset };
}
