<script lang="ts">
	import CombatEntry from '$lib/components/CombatEntry.svelte';
	import type { Combatant } from '$lib/models/Combatant';

	const blankCombatant: Combatant = {
		name: '',
		initiative: null,
		damage: null,
		hp: null
	};

	let combatants: Combatant[] = [];

	function createNewCombatant() {
		combatants = [...combatants, { ...blankCombatant }];
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
		<th>Name</th>
		<th>Initiative</th>
		<th>Damage taken</th>
		<th>Hit points</th>
	</tr>

	{#each combatants as combatant, i}
		<CombatEntry {combatant} on:change={updateCombatant(i)} />
	{/each}
</table>

<button on:click={createNewCombatant}>New combatant</button>
