import { createClient } from '@supabase/supabase-js';

// Test Supabase connection
async function testSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('Testing Supabase connection...');
  console.log('URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('Key:', supabaseKey ? '✅ Set' : '❌ Missing');

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing environment variables');
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Test basic connection
    const { error } = await supabase
      .from('flashcards')
      .select('count')
      .limit(1);

    if (error) {
      console.error('❌ Connection failed:', error);
    } else {
      console.log('✅ Connection successful!');
    }

    // Test table structure
    const { data: tableData, error: tableError } = await supabase
      .from('flashcards')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('❌ Table access failed:', tableError);
    } else {
      console.log('✅ Table access successful!');
      console.log('Table structure:', Object.keys(tableData[0] || {}));
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSupabase(); 