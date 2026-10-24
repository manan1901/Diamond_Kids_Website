import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Route badalte hi page ko wapas top par le jaata hai.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
