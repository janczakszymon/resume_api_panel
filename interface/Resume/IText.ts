import type { ITranslation } from '../ITranslation';

export interface IText {
	id: number | null;

	section: string;

	textPrimary: ITranslation[];

	textSecondary: ITranslation[];
}
