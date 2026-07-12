// =====================================
// OMID COMMUNITY
// Supabase Connection
// =====================================

import { createClient } from 
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";


const supabaseUrl =
"https://sxqckoqzomjxvqnlpgde.supabase.co";


const supabaseKey =
"sb_publishable_DauX5wzrvNsyKC8GW4g2yw_sCLMNc3F";


export const supabase =
createClient(
    supabaseUrl,
    supabaseKey
);


console.log("Supabase connected successfully!");
