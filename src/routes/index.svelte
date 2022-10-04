<script lang="ts">
	import CombatEntry from '$lib/components/CombatEntry.svelte';
	import GroupEntry from '$lib/components/GroupEntry.svelte';
	import type { Combatant } from '$lib/models/Combatant';
	import type { Encounter } from '$lib/models/Encounter';
	import type { EngagementGroup } from '$lib/models/EngagementGroup';

	let encounter: Encounter = {
		combatants: [],
		engagementGroups: [],
		engagementGroupRanges: {}
	};

	$: combatants = encounter.combatants;
	$: engagementGroups = encounter.engagementGroups;

	let engagingCombatant: Combatant['id'] | null = null;
	let mergingGroup: EngagementGroup['id'] | null = null;

	function createNewCombatant(isPlayer: boolean) {
		return () => {
			encounter = {
				...encounter,
				combatants: [
					...combatants,
					{
						id: (combatants.map(({ id }) => id).sort()[combatants.length - 1] ?? -1) + 1,
						name: '',
						initiative: null,
						damage: null,
						hp: null,
						notes: '',
						isPlayer
					}
				]
			};
		};
	}

	function updateCombatant(index: number) {
		return (event: CustomEvent<Combatant>) => {
			encounter = {
				...encounter,
				combatants: [...combatants.slice(0, index), event.detail, ...combatants.slice(index + 1)]
			};
		};
	}

	function setEngagingCombatant(event: CustomEvent<Combatant['id']>) {
		engagingCombatant = event.detail;
	}

	function engageWith(id: Combatant['id']) {
		return () => {
			const group = engagementGroups.find(({ combatants }) => combatants.includes(id)) ?? {
				id: (engagementGroups.map(({ id }) => id).sort()[engagementGroups.length - 1] ?? -1) + 1,
				combatants: [id]
			};

			encounter = {
				...encounter,
				engagementGroups: [
					...engagementGroups.filter(({ id }) => id !== group.id),
					{
						...group,
						combatants: [...group.combatants, engagingCombatant]
					}
				].sort((a, b) => a.id - b.id)
			};
			engagingCombatant = null;
		};
	}

	function disengageCombatant(event: CustomEvent<Combatant['id']>) {
		engagingCombatant = null;

		const group = engagementGroups.find(({ combatants }) => combatants.includes(event.detail));

		if (group) {
			const combatants = group.combatants.filter((id) => id !== event.detail);

			if (combatants.length > 1) {
				encounter = {
					...encounter,
					engagementGroups: [
						...engagementGroups.filter(({ id }) => id !== group.id),
						{
							...group,
							combatants
						}
					].sort((a, b) => a.id - b.id)
				};
			} else {
				encounter = {
					...encounter,
					engagementGroups: engagementGroups.filter(({ id }) => id !== group.id)
				};
			}
		}
	}

	function setMergingGroup(event: CustomEvent<EngagementGroup['id']>) {
		mergingGroup = event.detail;
	}

	function mergeWith(id: EngagementGroup['id']) {
		return () => {
			// const group = engagementGroups.find(({ combatants }) => combatants.includes(id)) ?? {
			// 	id: (engagementGroups.map(({ id }) => id).sort()[engagementGroups.length - 1] ?? -1) + 1,
			// 	combatants: [id]
			// };
			// encounter = {
			// 	...encounter,
			// 	engagementGroups: [
			// 		...engagementGroups.filter(({ id }) => id !== group.id),
			// 		{
			// 			...group,
			// 			combatants: [...group.combatants, engagingCombatant]
			// 		}
			// 	].sort((a, b) => a.id - b.id)
			// };
			// engagingCombatant = null;
		};
	}
</script>

<h1>Dungeon Combat</h1>

<table>
	<tr>
		<th>Group</th>
		<th>Name</th>
		<th>Initiative</th>
		<th>Damage taken</th>
		<th>Hit points</th>
		<th>Notes</th>
	</tr>

	{#each combatants as combatant, i}
		<CombatEntry
			{combatant}
			{encounter}
			on:change={updateCombatant(i)}
			on:engage={setEngagingCombatant}
			on:disengage={disengageCombatant}
		/>
	{/each}
</table>

{#if engagingCombatant != null}
	<h2>Who is {combatants.find(({ id }) => id === engagingCombatant).name} engaging?</h2>

	<ul>
		{#each combatants.filter(({ id, name }) => id !== engagingCombatant && name) as combatant}
			<li><button on:click={engageWith(combatant.id)}>{combatant.name}</button></li>
		{/each}
	</ul>
{/if}

<button on:click={createNewCombatant(true)}>New player</button>
<button on:click={createNewCombatant(false)}>New non-player</button>

<h2>Groups</h2>

<table>
	<tr>
		<th>ID</th>
		<th>Initiative</th>
		{#each engagementGroups as group}
			<th>Range to {group.id}</th>
		{/each}
	</tr>

	{#each engagementGroups as group}
		<GroupEntry {group} {encounter} on:merge={setMergingGroup} />
	{/each}
</table>
