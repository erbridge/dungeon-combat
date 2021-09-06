<script lang="ts">
	import type { Combatant } from '$lib/models/Combatant';
	import { createEventDispatcher } from 'svelte';

	export let combatant: Combatant;

	const dispatch = createEventDispatcher<{ change: Combatant }>();

	function change(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		dispatch('change', {
			...combatant,
			[event.currentTarget.name]:
				event.currentTarget.type === 'number'
					? event.currentTarget.value
						? parseInt(event.currentTarget.value)
						: null
					: event.currentTarget.value
		});
	}
</script>

<tr>
	<td>
		<input type="text" name="name" value={combatant.name} on:change={change} />
	</td>
	<td>
		<input type="number" name="initiative" value={combatant.initiative} on:change={change} />
	</td>
	<td>
		<input
			type="number"
			name="damage"
			min="0"
			max={combatant.hp}
			value={combatant.damage}
			on:change={change}
		/>
	</td>
	<td>
		<input type="number" name="hp" min="1" value={combatant.hp} on:change={change} />
	</td>
</tr>
