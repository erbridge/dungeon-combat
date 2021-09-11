import type { Combatant } from './Combatant';
import type { EngagementGroup } from './EngagementGroup';

export type Encounter = {
	combatants: Combatant[];
	engagementGroups: EngagementGroup[];
};
