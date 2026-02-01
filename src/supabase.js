import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ladfnwsrssiofdsbojeq.supabase.co";
const supabaseKey = "sb_publishable_uEtrioCkKbAmexSqwKQuDA_4xEOT20O";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
