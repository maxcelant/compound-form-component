
export default function toCapital(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
    .join(' ');
}