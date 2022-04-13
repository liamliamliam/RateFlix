import axios from 'axios';
import { dev, GC } from './helpers';

export const backend = axios.create({
  withCredentials: true,
  baseURL: dev() ? GC.domains.server.local : GC.domains.server.hosted
});
