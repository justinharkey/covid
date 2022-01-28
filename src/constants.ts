export class SupabaseService {
	static hostname =  import.meta.env.VITE_hostname ?? '';
	static publicKey = import.meta.env.VITE_publicKey ?? '';
}