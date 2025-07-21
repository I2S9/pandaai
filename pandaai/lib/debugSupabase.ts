import { createClient } from '../utils/supabase/client';

export const debugSupabase = async () => {
  const supabase = createClient();
  
  console.log('🔍 DEBUG SUPABASE');
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
  
  try {
    // Test 1: Basic connection
    console.log('\n📡 Test 1: Basic connection...');
    const { error: testError } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Connection failed:', testError);
      return false;
    }
    console.log('✅ Connection successful');
    
    // Test 2: Check table structure
    console.log('\n📊 Test 2: Check table structure...');
    const { data: tableData, error: tableError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('❌ Table access failed:', tableError);
      return false;
    }
    
    console.log('✅ Table structure:', Object.keys(tableData[0] || {}));
    
    // Test 3: Check if user_id is TEXT type
    console.log('\n🔤 Test 3: Check user_id type...');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .limit(1);
    
    if (userError) {
      console.error('❌ User table error:', userError);
    } else {
      console.log('✅ User table accessible');
      if (userData && userData.length > 0) {
        console.log('Sample user ID type:', typeof userData[0].id);
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Debug failed:', error);
    return false;
  }
};

export const testFlashcardInsert = async (userId: string, topic: string) => {
  const supabase = createClient();
  
  console.log('\n🧪 Test flashcard insert...');
  console.log('User ID:', userId);
  console.log('User ID type:', typeof userId);
  
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .insert({
        user_id: userId,
        topic: topic,
        question: 'Test question',
        answer: 'Test answer',
        review_count: 0,
        difficulty_level: 1
      })
      .select();

    if (error) {
      console.error('❌ Flashcard insert failed:', error);
      return false;
    }
    
    console.log('✅ Flashcard inserted successfully:', data);
    return true;
  } catch (error) {
    console.error('❌ Flashcard insert error:', error);
    return false;
  }
};

export const testSessionInsert = async (userId: string) => {
  const supabase = createClient();
  
  console.log('\n⏱️ Test session insert...');
  
  try {
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        user_id: userId,
        start_time: new Date().toISOString(),
        duration_seconds: 60
      })
      .select();

    if (error) {
      console.error('❌ Session insert failed:', error);
      return false;
    }
    
    console.log('✅ Session inserted successfully:', data);
    return true;
  } catch (error) {
    console.error('❌ Session insert error:', error);
    return false;
  }
}; 