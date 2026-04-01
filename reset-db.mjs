import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vxeuohbusmtjlqlbfgxy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4ZXVvaGJ1c210amxxbGJmZ3h5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzE5NzYwMiwiZXhwIjoyMDg4NzczNjAyfQ.H2AHPcGh5XcANP4CdBjcS3AeJqhHV6MZULm5ojHiUCc';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function run() {
  console.log('Fetching all users...');
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error('Error listing users:', listError);
    process.exit(1);
  }

  console.log(`Found ${users.length} users. Deleting...`);
  for (const user of users) {
    const { error: delError } = await supabase.auth.admin.deleteUser(user.id);
    if (delError) {
      console.error(`Failed to delete ${user.email}:`, delError);
    } else {
      console.log(`Deleted ${user.email}`);
    }
  }

  console.log('Creating superadmin@mail.com...');
  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email: 'superadmin@mail.com',
    password: 'superadmin123',
    email_confirm: true,
    user_metadata: { role: 'superadmin', full_name: 'Superadmin' }
  });

  if (createError) {
    console.error('Failed to create superadmin:', createError);
    process.exit(1);
  } else {
    console.log('Created superadmin successfully:', newUser.user.email);
  }
}

run();
