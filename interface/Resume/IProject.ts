import type { ITranslation } from '~/interface/ITranslation';

export interface IProject {
	id: number | null;

	name: ITranslation[];

	fullName: ITranslation[];

	description: ITranslation[];

	type: string;
}
