<script lang="ts">
	import CombatEntry from '$lib/components/CombatEntry.svelte';
	import type { Combatant } from '$lib/models/Combatant';
	import type { EngagementGroup } from '$lib/models/EngagementGroup';

	let combatants: Combatant[] = [];
	let engagementGroups: EngagementGroup[] = [];
	let engagingCombatant: Combatant['id'] | null = null;

	function createNewCombatant() {
		combatants = [
			...combatants,
			{
				id: (combatants.map(({ id }) => id).sort()[combatants.length - 1] ?? -1) + 1,
				name: '',
				initiative: null,
				damage: null,
				hp: null,
				notes: ''
			}
		];
	}

	function updateCombatant(index: number) {
		return (event: CustomEvent<Combatant>) => {
			combatants = [...combatants.slice(0, index), event.detail, ...combatants.slice(index + 1)];
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

			engagementGroups = [
				...engagementGroups.filter(({ id }) => id !== group.id),
				{
					...group,
					combatants: [...group.combatants, engagingCombatant]
				}
			].sort((a, b) => a.id - b.id);

			engagingCombatant = null;
		};
	}
</script>

<h1>Dungeon Combat</h1>

<table>
	<tr>
		<th>ID</th>
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
			{engagementGroups}
			on:change={updateCombatant(i)}
			on:engage={setEngagingCombatant}
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

<button on:click={createNewCombatant}>New combatant</button>
