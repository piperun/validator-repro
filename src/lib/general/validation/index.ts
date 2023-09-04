import type { ZodIssue } from 'zod';

export const issueHelper = (issue: ZodIssue, defaultErrorContext = 'general') => {
	const path = issue.path[0] ?? defaultErrorContext;
	let errorMsg = '';
	errorMsg += issue.code === 'custom' ? issue.message : `${path}.` + issue.code;
	return { code: path, message: errorMsg };
};
