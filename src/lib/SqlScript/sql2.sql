-- Insert default admin profile
-- Note: You need to create the user in Supabase Auth first, then use their UUID here


-- Alternative: If you want to create via SQL (requires admin privileges)
-- This creates both auth user and profile in one go
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@faroholidays.com',
  crypt('faro2025', gen_salt('bf')), -- Password: faro2025
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Then insert the profile using the generated UUID
INSERT INTO profiles (id, email, full_name, role)
SELECT id, email, 'Faro Admin', 'admin'
FROM auth.users 
WHERE email = 'admin@faroholidays.com';