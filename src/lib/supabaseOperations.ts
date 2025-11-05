import { supabase } from './supabase';

// Destinations CRUD operations
export async function createDestinationInSupabase(data: any) {
  const { data: result, error } = await supabase
    .from('destinations')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function getDestinationsFromSupabase(filters?: { category?: string; featured?: boolean }) {
  let query = supabase.from('destinations').select('*');
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters?.featured !== undefined) {
    query = query.eq('featured', filters.featured);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updateDestinationInSupabase(id: string, data: any) {
  const { data: result, error } = await supabase
    .from('destinations')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function deleteDestinationFromSupabase(id: string) {
  const { error } = await supabase
    .from('destinations')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Hotels CRUD operations
export async function createHotelInSupabase(data: any) {
  const { data: result, error } = await supabase
    .from('hotels')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function getHotelsFromSupabase(filters?: { destination_id?: string; featured?: boolean }) {
  let query = supabase.from('hotels').select('*');
  
  if (filters?.destination_id) {
    query = query.eq('destination_id', filters.destination_id);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updateHotelInSupabase(id: string, data: any) {
  const { data: result, error } = await supabase
    .from('hotels')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function deleteHotelFromSupabase(id: string) {
  const { error } = await supabase
    .from('hotels')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Activities CRUD operations
export async function createActivityInSupabase(data: any) {
  const { data: result, error } = await supabase
    .from('activities')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function getActivitiesFromSupabase(filters?: { destination_id?: string; category?: string }) {
  let query = supabase.from('activities').select('*');
  
  if (filters?.destination_id) {
    query = query.eq('destination_id', filters.destination_id);
  }
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updateActivityInSupabase(id: string, data: any) {
  const { data: result, error } = await supabase
    .from('activities')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function deleteActivityFromSupabase(id: string) {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
}

// Leads CRUD operations
export async function createLeadInSupabase(data: any) {
  const { data: result, error } = await supabase
    .from('leads')
    .insert([data])
    .select()
    .single();
  
  if (error) throw error;
  return result;
}

export async function getLeadsFromSupabase() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
}

export async function updateLeadInSupabase(id: string, data: any) {
  const { data: result, error } = await supabase
    .from('leads')
    .update(data)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return result;
}