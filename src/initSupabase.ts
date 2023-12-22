import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Better put your these secret keys in .env file
export const supabase = createClient("https://wynwhfaivudkplhfaaew.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5bndoZmFpdnVka3BsaGZhYWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMyNTc5NzYsImV4cCI6MjAxODgzMzk3Nn0.3h0t9Ax_RL_8LIUHIDrIEdkC1XB-5j78Cm-EmHK9BYo", {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false // Prevents Supabase from evaluating window.location.href, breaking mobile
});
