<script>
	import { v4 as uuidv4 } from 'uuid';
	export let data;
	const { user, lab_classes, lab_slots, labs, faculty_details, student_timetable } = data;

	let selected = [];
	student_timetable.forEach((lab) => {
		selected = [
			...selected,
			{
				id: lab.id,
				lab_class_id: lab.lab_class_id,
				strength: lab_classes.filter((item) => item.id == lab.lab_class_id)[0].strength,
				faculty_name: faculty_details.filter(
					(teacher) =>
						teacher.id == lab_classes.filter((item) => item.id == lab.lab_class_id)[0].faculty_id
				)[0].name,
				slot: lab_slots.filter(
					(slot) =>
						slot.id == lab_classes.filter((item) => item.id == lab.lab_class_id)[0].lab_slot_id
				)[0].slot,
				lab_name: labs.filter(
					(item) =>
						item.id ==
						lab_slots.filter(
							(slot) =>
								slot.id == lab_classes.filter((i) => i.id == lab.lab_class_id)[0].lab_slot_id
						)[0].lab_id
				)[0].course_name
			}
		];
	});

	async function handleAdd(lab_class_id) {
		let id = uuidv4();
		id = id.split('').splice(0, 15).join('');

		let flag = false;
		selected.forEach((item) => {
			if (item.lab_class_id == lab_class_id) flag = true;
		});
		if (flag) {
			alert('You cannot choose the same class twice');
			return;
		}

		let new_strength = lab_classes.filter((item) => item.id == lab_class_id)[0].strength;
		new_strength += 1;

		const response = await fetch('/api/addToDatabase?collectionName=student_lab_timetable', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: id,
				student_id: user.id,
				lab_class_id: lab_class_id
			})
		});

		const anotherResponse = await fetch('/api/updateDatabase?collectionName=lab_classes', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				record_id: lab_class_id,
				strength: new_strength
			})
		});
		selected = [
			...selected,
			{
				id,
				lab_class_id: lab_class_id,
				strength: new_strength,
				slot: lab_slots.filter(
					(slot) => slot.id == lab_classes.filter((item) => item.id == lab_class_id)[0].lab_slot_id
				)[0].slot,
				faculty_name: faculty_details.filter(
					(teacher) =>
						teacher.id == lab_classes.filter((item) => item.id == lab_class_id)[0].faculty_id
				)[0].name,
				lab_name: labs.filter(
					(item) =>
						item.id ==
						lab_slots.filter(
							(slot) => slot.id == lab_classes.filter((i) => i.id == lab_class_id)[0].lab_slot_id
						)[0].lab_id
				)[0].course_name
			}
		];
	}

	async function handleRemove(lab_class_id, class_id) {
		console.log(class_id);
		const response = await fetch('/api/removeFromDatabase?collectionName=student_lab_timetable', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: lab_class_id
			})
		});

		let new_strength = lab_classes.filter((item) => item.id == class_id)[0].strength;
		new_strength -= 1;

		const anotherResponse = await fetch('/api/updateDatabase?collectionName=lab_classes', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				record_id: class_id,
				strength: new_strength
			})
		});

		selected = selected.filter((item) => item.id != lab_class_id);
	}
	function handleRedirect() {
		window.location.href = '/student';
	}
</script>

<div class="button-area">
	<button on:click={handleRedirect}>Courses</button>
	<button class="selected">Labs</button>
</div>
<section>
	<h3>The labs that you have selected for the coming semester</h3>

	<div class="grid-container">
		{#each selected as lab (lab)}
			<div class="grid-item">
				<h3>{lab.lab_name}</h3>
				<div>Faculty name: {lab.faculty_name}</div>
				<div>Slot: {lab.slot}</div>
				<div>Strength: {lab.strength}</div>
				<button
					on:click={async () => {
						await handleRemove(lab.id, lab.lab_class_id);
					}}>Remove</button
				>
			</div>
		{/each}
	</div>
</section>

<section>
	<h3>The labs that are available for you to take</h3>

	<div class="grid-container">
		{#each lab_classes as lab (lab)}
			{#if lab.strength != 100}
				<div class="grid-item">
					<h3>
						{labs.filter(
							(item) => item.id == lab_slots.filter((slot) => slot.id == lab.lab_slot_id)[0].lab_id
						)[0].course_name}
					</h3>
					<div>
						Faculty name: {faculty_details.filter((teacher) => teacher.id == lab.faculty_id)[0]
							.name}
					</div>
					<div>Slot: {lab_slots.filter((slot) => slot.id == lab.lab_slot_id)[0].slot}</div>
					<div>Strength: {lab.strength}</div>
					<button
						on:click={async () => {
							await handleAdd(lab.id);
						}}>Add</button
					>
				</div>
			{/if}
		{/each}
	</div>
</section>

<style>
    section {
        margin-left: 20px;
    }
	.grid-container {
		display: grid;
		gap: 2rem;
		grid-template-columns: repeat(auto-fit, 250px);
	}

	.grid-item {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		border-radius: 1rem;
		box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
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
