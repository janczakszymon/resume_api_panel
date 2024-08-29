import type { ITranslation } from '~/interface/ITranslation';

export interface IExperience {
	id: number | null;

	company: string;

	position: ITranslation[];

	location: string;

	startDate: string;

	endDate: string | null;
}
