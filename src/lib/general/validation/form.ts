import { FolderFormSchema, LinkSchema } from '$lib/general/validation/schemas/folder';
import { validate } from './base';

export function validateFolderForm(folderData: object) {
	return validate(folderData, FolderFormSchema);
}
export function validateLinkForm(folderData: object) {
	return validate(folderData, LinkSchema);
}
