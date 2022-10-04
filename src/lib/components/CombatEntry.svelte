<script lang="ts">
	import CombatEntryCell from '$lib/components/CombatEntryCell.svelte';
	import type { Combatant } from '$lib/models/Combatant';
	import type { Encounter } from '$lib/models/Encounter';
	import { createEventDispatcher } from 'svelte';

	export let combatant: Combatant;
	export let encounter: Encounter;

	$: engagementGroup = encounter.engagementGroups.find(({ combatants }) =>
		combatants.includes(combatant.id)
	);

	const dispatch = createEventDispatcher<{
		change: Combatant;
		engage: Combatant['id'];
		disengage: Combatant['id'];
	}>();

	function change(
		event: CustomEvent<{ name: keyof Combatant; value: Combatant[keyof Combatant] }>
	) {
		dispatch('change', {
			...combatant,
			[event.detail.name]: event.detail.value
		});
	}

	function engage() {
		dispatch('engage', combatant.id);
	}

	function disengage() {
		dispatch('disengage', combatant.id);
	}
</script>

<tr>
	<td>{engagementGroup?.id ?? 'free'}</td>
	<CombatEntryCell type="text" name="name" value={combatant.name} editOnInit on:change={change} />
	<CombatEntryCell
		type="number"
		name="initiative"
		value={combatant.initiative}
		on:change={change}
	/>
	{#if combatant.isPlayer}
		<td>-</td>
	{:else}
		<CombatEntryCell
			type="number"
			name="damage"
			min={0}
			max={combatant.hp}
			value={combatant.damage}
			on:change={change}
		/>
	{/if}
	<CombatEntryCell type="number" name="hp" min={1} value={combatant.hp} on:change={change} />
	<CombatEntryCell type="text" name="notes" value={combatant.notes} on:change={change} />

	{#if combatant.name}
		{#if engagementGroup}
			<button on:click={disengage}>Disengage</button>
		{:else}
			<button on:click={engage}>Engage with...</button>
		{/if}
	{/if}
</tr>
