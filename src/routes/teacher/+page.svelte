<script>
	import Card from '../../lib/components/Card.svelte';
	import { v4 as uuidv4 } from 'uuid';
	export let data;
	let { courses, theory_slots, user, selected_classes } = data;
	let selected = [];
	// console.log(theory_slots)
	selected_classes.forEach((element) => {
		// console.log(theory_slots.filter(item => item.id == element.slot_id)[0].course_id)
		const data = {
			// slot: theory_slots.filter(item => item.id == element.slot_id)[0].slot,
			slot_id: element.slot_id,
			course_name: courses.filter(
				(item) => item.id == theory_slots.filter((i) => i.id == element.slot_id)[0].course_id
			)[0].course_name,
			id: element.id,
			course_code: courses.filter(
				(item) => item.id == theory_slots.filter((i) => i.id == element.slot_id)[0].course_id
			)[0].course_code,
			credits: courses.filter(
				(item) => item.id == theory_slots.filter((i) => i.id == element.slot_id)[0].course_id
			)[0].credits
		};
		selected = [...selected, data];
	});

	let cardSlot = {};
	// $: console.log(cardSlot)
	courses.forEach((course) => {
		cardSlot[course.id] = '';
	});

	const handleSelected = async (id, slotId) => {
		let flag = false;
		selected.forEach((item) => {
			if (item.slot_id == slotId) flag = true;
		});
		selected_classes.forEach((item) => {
			if (item.slot_id == slotId) flag = true;
		});
		if (flag) {
			alert('You cannot select the same class twice')
			return
		}

		courses.forEach(async (element) => {
			const someId = uuidv4();
			if (element.id == id) {
				selected = [
					...selected,
					{
						course_name: element.course_name,
						slot_id: slotId,
						id: someId,
						course_code: element.course_code,
						credits: element.credits
					}
				];

				const response = await fetch('/api/addToDatabase?collectionName=theory_classes', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						// id: someId,
						teacher_id: user.id,
						slot_id: slotId,
						course_id: id,
						class_strength: 0
					})
				});
				return response.json();
			}
		});
		// courses = courses.filter((course) => course.id != id);
	};

	async function handleRemove(id) {
		const response = await fetch('/api/removeFromDatabase?collectionName=theory_classes', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id
			})
		});
		selected = selected.filter((course) => course.slot_id != id);
	}
	function handleRedirection() {
		window.location.href = '/teacher/labs';
	}
</script>

<div class="button-area">
	<button class="selected">Courses</button>
	<button on:click={handleRedirection}>Labs</button>
</div>

<section>
	<h2>The courses that you have chosen to take in this semester</h2>
	<div class="grid-container">
		{#each selected as selected_course (selected_course.id)}
			<div class="grid-item">
				<Card
					course_code={selected_course.course_code}
					course_name={selected_course.course_name}
					credits={selected_course.credits}
					selectedSlot={theory_slots.filter((item) => selected_course.slot_id == item.id)[0].slot}
				>
					<button
						on:click={() => {
							handleRemove(selected_course.slot_id);
						}}>Remove</button
					>
				</Card>
			</div>
		{/each}
	</div>
</section>

<section>
	<h2>The courses and their respective slots that are available for you take this semester</h2>
	<div class="grid-container">
		{#each courses as course (course)}
			<!-- {console.log(theory_slots.filter(item => cardSlot[course.id] == item.id))} -->
			<div class="grid-item">
				<Card
					course_code={course.course_code}
					course_name={course.course_name}
					credits={course.credits}
					selectedSlot={theory_slots.filter((item) => item.id == cardSlot[course.id]).slot}
				>
				<select name="slot" id="slot" bind:value={cardSlot[course.id]}>
					{#each theory_slots as slot}
					{#if slot.course_id == course.id}
					<option value={slot.id}>{slot.slot}</option>
					{/if}
					{/each}
				</select>
				<button
					on:click={async () => {
						await handleSelected(course.id, cardSlot[course.id]);
					}}>Add</button
				>
				</Card>
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		margin-left: 20px;
	}
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, 250px);
		gap: 1rem;
	}
	.grid-item {
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border-radius: 1rem;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
	}
	button {
		font-size: 1.2rem;
		padding: 0.5rem;
		background-color: black;
		color: white;
		border-radius: 5px;
		cursor: pointer;
		border: none;
		transition-duration: 250ms;
	}
	button:hover {
		color: black;
		background-color: white;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}
	.button-area {
		display: flex;
		justify-content: space-around;
	}
	.button-area button {
		font-size: 1.2rem;
		padding: 1rem;
		border-radius: 5px;
		border: none;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		transition-duration: 250ms;
		width: 100px;
	}
	.selected {
		color: black;
		background-color: white;
	}
</style>
