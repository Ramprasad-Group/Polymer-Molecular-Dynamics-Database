import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jgatnwvttasbkwrspxrj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnYXRud3Z0dGFzYmt3cnNweHJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2Mzc1NTUsImV4cCI6MTk5NjIxMzU1NX0.K6toojBgFk_JL_dWgI0b4WfomIqyQx3EZLS-RhVU58w"
);
