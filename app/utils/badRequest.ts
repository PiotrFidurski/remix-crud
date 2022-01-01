import { json } from 'remix';

export function badRequest<T>(data: T) {
  json(data, { status: 400 });
}
