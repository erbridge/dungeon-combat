<script lang="ts">
	import type { Encounter } from '$lib/models/Encounter';
	import type { EngagementGroup } from '$lib/models/EngagementGroup';
	import { createEventDispatcher } from 'svelte';

	export let group: EngagementGroup;
	export let encounter: Encounter;

	$: groupCombatants = encounter.combatants.filter(({ id }) => group.combatants.includes(id));

	const dispatch = createEventDispatcher<{
		merge: EngagementGroup['id'];
	}>();

	function merge() {
		dispatch('merge', group.id);
	}
</script>

<tr>
	<td>{group.id}</td>
	<td>{groupCombatants.map(({ initiative }) => initiative).sort()[groupCombatants.length - 1]}</td>
	{#each encounter.engagementGroups as otherGroup}
		<td>
			{#if otherGroup.id === group.id}
				-
			{:else}
				Range to {otherGroup.id}
			{/if}
		</td>
	{/each}

	<button on:click={merge}>Merge with...</button>
</tr>
