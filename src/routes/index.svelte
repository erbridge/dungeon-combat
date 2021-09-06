<script lang="ts">
	import CombatEntry from '$lib/components/CombatEntry.svelte';
	import type { Combatant } from '$lib/models/Combatant';

	let combatants: Combatant[] = [];

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
</script>

<h1>Dungeon Combat</h1>

<table>
	<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Initiative</th>
		<th>Damage taken</th>
		<th>Hit points</th>
		<th>Notes</th>
	</tr>

	{#each combatants as combatant, i}
		<CombatEntry {combatant} on:change={updateCombatant(i)} />
	{/each}
</table>

<button on:click={createNewCombatant}>New combatant</button>
