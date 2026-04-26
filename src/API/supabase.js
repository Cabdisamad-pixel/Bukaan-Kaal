
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://sxaqfzxwijqmbtztajhh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4YXFmenh3aWpxbWJ0enRhamhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNjAxNTcsImV4cCI6MjA4NjczNjE1N30.RC4_4LeoEpOohZUww-WcOeztLI5zH-IAPcKv155l164"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase