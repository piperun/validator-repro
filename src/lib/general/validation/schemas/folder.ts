import { z } from 'zod';
import isAlpha from 'validator/lib/isAlpha';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isURL from 'validator/lib/isURL';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const FolderTypeEnum = {
	folder: 'folder',
	link: 'link',
	document: 'document',
};

const checkEmptyRequest = (zodObject: object) => {
	const emptyList = Object.keys(zodObject).filter((key) => zodObject[key as keyof object]);
	if (!emptyList.length) return false;
	else return true;
};

export const LocaleCheck = (str: string, ignore = false) =>
	isAlpha(str, 'sv-SE', ignore ? { ignore: ' ' } : {});
export const AlphaNumericCheck = (str: string, ignore = false) =>
	isAlphanumeric(str, 'sv-SE', ignore ? { ignore: ' ' } : {});

export const IdSchema = z.string().cuid().array();

export const TitleSchema = z
	.string()
	.min(3)
	.max(20)
	.refine((title) => AlphaNumericCheck(title, true), { message: 'title.alpha_only' });

export const DescriptionSchema = z.string().optional();

export const TagSchema = z
	.string()
	.refine((tag) => LocaleCheck(tag), { message: 'Only characters are allowed in tag' })
	.array()
	.optional();

export const LinkSchema = z
	.string()
	.url()
	.refine((url) => isURL(url), { message: 'link.invalid_link' })
	.array()
	.nonempty();

const documentTypeSchema = z
	.object({
		document: z.string(),
		documentFile: z
			.any()
			.refine((files) => files?.length == 1, 'Image is required.')
			.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
			.refine(
				(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
				'.jpg, .jpeg, .png and .webp files are accepted.',
			),
	})
	.partial()
	.refine(({ document, documentFile }) => document !== undefined || documentFile !== undefined, {
		message: 'One of the fields must be defined',
	});

export const DocumentSchema = z.object({
	folderTitle: TitleSchema,
	description: z.string().optional(),
});

export const FolderSchema = z.object({
	title: TitleSchema,
	description: DescriptionSchema,
	tags: TagSchema,
	access: z.literal('PRIVATE').or(z.literal('PUBLIC')),
});

export const FolderFormSchema = FolderSchema.extend({
	type: z.nativeEnum(FolderTypeEnum),
});

export const UpdateFolderSchema = FolderSchema.partial();
