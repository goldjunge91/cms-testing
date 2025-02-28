import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Direkter Client ohne SSR-Wrapper
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Teste Verbindung mit URL:', supabaseUrl);
    console.log('Teste Verbindung mit Key:', supabaseKey);
    
    const supabase = createClient(supabaseUrl as string, supabaseKey as string);
    
    // Versuche eine einfache Abfrage
    const { data, error } = await supabase
      .from('sites')
      .select('*')
      .limit(1);
      
    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error('Unexpected error:', e);
    return NextResponse.json({ success: false, error: e }, { status: 500 });
  }
}
