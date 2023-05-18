export interface Project {
	client: string;
	client_rating: number | null;
	worker_rating: number | null;
	description: string;
	due_date: string;
	id: string;
	invoice: string;
	name: string;
	project_invoice: {
		id: string;
		request_network_id: number;
		request_network_url: string;
		status: string;
		amount: string;
		// Add other properties from project_invoice if available
	};
	role: string;
	status: string;
	worker: string;
}
