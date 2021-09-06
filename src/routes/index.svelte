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
</script>

<h1>Dungeon Combat</h1>

<table>
	<tr>
		<th>Name</th>
		<th>Initiative</th>
		<th>Damage taken</th>
		<th>Hit points</th>
	</tr>

	{#each combatants as combatant}
		<tr>
			<td><input type="text" name="name" value={combatant.name} /></td>
			<td><input type="number" name="initiative" value={combatant.initiative} /></td>
			<td
				><input
					type="number"
					name="damage"
					value={combatant.damage}
					min="0"
					max={combatant.hp}
				/></td
			>
			<td><input type="number" name="hp" value={combatant.hp} min="1" /></td>
		</tr>
	{/each}
</table>

<button on:click={createNewCombatant}>New combatant</button>
