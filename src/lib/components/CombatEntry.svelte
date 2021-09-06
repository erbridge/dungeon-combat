<script lang="ts">
	import CombatEntryCell from '$lib/components/CombatEntryCell.svelte';
	import type { Combatant } from '$lib/models/Combatant';
	import { createEventDispatcher } from 'svelte';

	export let combatant: Combatant;

	const dispatch = createEventDispatcher<{ change: Combatant }>();

	function change(
		event: CustomEvent<{ name: keyof Combatant; value: Combatant[keyof Combatant] }>
	) {
		dispatch('change', {
			...combatant,
			[event.detail.name]: event.detail.value
		});
	}
</script>

<tr>
	<CombatEntryCell type="text" name="name" value={combatant.name} editOnInit on:change={change} />
	<CombatEntryCell
		type="number"
		name="initiative"
		value={combatant.initiative}
		on:change={change}
	/>
	<CombatEntryCell
		type="number"
		name="damage"
		min={0}
		max={combatant.hp}
		value={combatant.damage}
		on:change={change}
	/>
	<CombatEntryCell type="number" name="hp" min={1} value={combatant.hp} on:change={change} />
</tr>
