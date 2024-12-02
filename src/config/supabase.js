// src/config/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zywyryijdfdqbzgfuxgd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5d3lyeWlqZGZkcWJ6Z2Z1eGdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5ODkzNzIsImV4cCI6MjA0ODU2NTM3Mn0.Z6aL9dy52NtZVty2k--48plX6cA-baxiPZJZoj9ue_Q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
