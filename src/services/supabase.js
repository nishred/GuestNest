import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://nsmitxxcuxwdkttsivag.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zbWl0eHhjdXh3ZGt0dHNpdmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MTUyMDksImV4cCI6MjA0NzE5MTIwOX0.ArNf7NowJRZXBb7FKqbbDGsAoD-doPs4Fy3gBorNamA"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
