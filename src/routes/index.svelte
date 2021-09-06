<script lang="ts">
	let combatants = [];

	function createNewCombatant() {
		const blankCombatant = {
			name: '',
			initiative: null,
			damage: 0,
			hp: null
		};

		combatants = [...combatants, blankCombatant];
	}

	function updateCombatant(index: number) {
		return (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
			combatants = [
				...combatants.slice(0, index),
				{
					...combatants[index],
					[event.currentTarget.name]:
						event.currentTarget.type === 'number'
							? event.currentTarget.value
								? parseInt(event.currentTarget.value)
								: null
							: event.currentTarget.value
				},
				...combatants.slice(index + 1)
			];
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
		<tr>
			<td>
				<input type="text" name="name" value={combatant.name} on:change={updateCombatant(i)} />
			</td>
			<td>
				<input
					type="number"
					name="initiative"
					value={combatant.initiative}
					on:change={updateCombatant(i)}
				/>
			</td>
			<td>
				<input
					type="number"
					name="damage"
					value={combatant.damage}
					min="0"
					max={combatant.hp}
					on:change={updateCombatant(i)}
				/>
			</td>
			<td>
				<input
					type="number"
					name="hp"
					value={combatant.hp}
					min="1"
					on:change={updateCombatant(i)}
				/>
			</td>
		</tr>
	{/each}
</table>

<button on:click={createNewCombatant}>New combatant</button>
