<script lang="ts">
	import type { Combatant } from '$lib/models/Combatant';
	import { createEventDispatcher } from 'svelte';

	export let name: keyof Omit<Combatant, 'player'>;
	export let value: Combatant[typeof name];
	export let type: 'number' | 'text' = 'text';
	export let min: number | null = null;
	export let max: number | null = null;
	export let editOnInit = false;

	let editing = editOnInit;

	$: empty = type === 'number' ? value == null : !value;

	const dispatch = createEventDispatcher<{ change: { name: typeof name; value: typeof value } }>();

	function focusOnEdit(element: HTMLInputElement) {
		if (editing) {
			element.focus();
		}
	}

	function change(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const newValue =
			type === 'number' ? parseInt(event.currentTarget.value) : event.currentTarget.value;

		dispatch('change', {
			name,
			value: typeof newValue === 'number' && isNaN(newValue) ? null : newValue
		});
	}
</script>

<td>
	{#if editing || empty}
		<input
			{type}
			{name}
			{min}
			{max}
			{value}
			on:change={change}
			on:blur={() => {
				editing = false;
			}}
			use:focusOnEdit
		/>
	{:else}
		<span
			on:click={() => {
				editing = true;
			}}>{value}</span
		>
	{/if}
</td>
