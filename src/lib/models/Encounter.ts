import type { Combatant } from './Combatant';
import type { EngagementGroup } from './EngagementGroup';
import type { Range } from './Range';

export type Encounter = {
	combatants: Combatant[];
	engagementGroups: EngagementGroup[];
	engagementGroupRanges: { [id: EngagementGroup['id']]: Range };
};
