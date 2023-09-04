import { validateFolderForm } from '$lib/general/validation/form';
import { error, type RequestHandler } from '@sveltejs/kit';
import { issueHelper } from '$lib/general/validation';

export const POST = (async (handler) => {
	const body = await handler.request.json();
	const validFolder = validateFolderForm(body);
	let issues;
	if (validFolder?.issues) {
		issues = validFolder.issues.map((issue) => {
			return issueHelper(issue);
		});
		throw error(400, { message: JSON.stringify(issues) });
	}

	return new Response(JSON.stringify("correct"), {
		status: 200,
		headers: { 'content-type': 'application/json' },
	});
}) satisfies RequestHandler;