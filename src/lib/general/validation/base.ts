import type { ZodType, ZodError } from 'zod';

export function validate<T>(data: unknown, schema: ZodType<T>): undefined | ZodError {
	const result = schema.safeParse(data);
	if (!result.success) {
		return result.error;
	}
}
