import { useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export function useVisitTracker() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const visitData = {
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          screen_width: window.screen.width,
          screen_height: window.screen.height,
        };
        
        await supabase.from('visitas').insert([visitData]);
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };
    
    trackVisit();
  }, []);
}