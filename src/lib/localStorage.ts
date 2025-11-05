// Local storage CRUD operations for demo mode
export function getStoredDestinations() {
  const stored = localStorage.getItem('demo_destinations');
  return stored ? JSON.parse(stored) : [];
}

export function saveDestination(destination: any) {
  const destinations = getStoredDestinations();
  const newDestination = { ...destination, id: Date.now().toString() };
  destinations.push(newDestination);
  localStorage.setItem('demo_destinations', JSON.stringify(destinations));
  return newDestination;
}

export function removeDestination(id: string) {
  const destinations = getStoredDestinations();
  const filtered = destinations.filter((d: any) => d.id !== id);
  localStorage.setItem('demo_destinations', JSON.stringify(filtered));
}

export function updateStoredDestination(id: string, updates: any) {
  const destinations = getStoredDestinations();
  const updated = destinations.map((d: any) =>
    d.id === id ? { ...d, ...updates, id } : d
  );
  localStorage.setItem('demo_destinations', JSON.stringify(updated));
  return updated.find((d: any) => d.id === id);
}