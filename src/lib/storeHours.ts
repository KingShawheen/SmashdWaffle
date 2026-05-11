export function isStoreOpen(): { open: boolean; message?: string } {
  const now = new Date();
  
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23'
  });
  
  const parts = formatter.formatToParts(now);
  let weekday = '';
  let hour = 0;
  let minute = 0;
  
  parts.forEach(p => {
    if (p.type === 'weekday') weekday = p.value;
    if (p.type === 'hour') hour = parseInt(p.value, 10);
    if (p.type === 'minute') minute = parseInt(p.value, 10);
  });
  
  if (weekday === 'Monday') {
    return { open: false, message: 'We are closed on Mondays.' };
  }
  
  if (hour < 8) {
    return { open: false, message: 'We open at 8:00 AM.' };
  }
  
  if (hour > 12 || (hour === 12 && minute >= 30)) {
    return { open: false, message: 'Online ordering cutoff is 12:30 PM.' };
  }
  
  return { open: true };
}
