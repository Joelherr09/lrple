// lib/date-utils.ts

export function formatChileanDate(
  dateInput: string | null | undefined, 
  format: 'short' | 'long' | 'datetime' | 'time' = 'short'
): string {
  if (!dateInput) return '—';
  
  // ✅ Detectar si es una fecha sin hora (formato 'YYYY-MM-DD')
  const isDateOnly = typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput);
  
  if (isDateOnly) {
    // Para fechas sin hora, NO usamos timeZone para evitar desfases
    const [year, month, day] = dateInput.split('-').map(Number);
    
    // Formatear manualmente según el formato solicitado
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    switch (format) {
      case 'short':
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      case 'long':
        return `${day} de ${meses[month - 1]} de ${year}`;
      case 'datetime':
        return `${day} de ${meses[month - 1]} de ${year}`;
      case 'time':
        return '—';
      default:
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }
  }
  
  // Para fechas con hora (TIMESTAMP), usamos el método con timeZone
  const date = new Date(dateInput);
  
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Santiago',
  };
  
  switch (format) {
    case 'short':
      options.year = 'numeric';
      options.month = '2-digit';
      options.day = '2-digit';
      break;
    case 'long':
      options.year = 'numeric';
      options.month = 'long';
      options.day = 'numeric';
      break;
    case 'datetime':
      options.year = 'numeric';
      options.month = 'long';
      options.day = 'numeric';
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
      break;
    case 'time':
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
      break;
  }
  
  return new Intl.DateTimeFormat('es-CL', options).format(date);
}