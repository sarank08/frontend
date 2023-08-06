<script>
	import { v4 as uuidv4 } from 'uuid';

	export let data;
	const { user, theory_classes, theory_slots, theory, faculty_details, student_timetable } = data;
	let selected = [];
	student_timetable.forEach((item) => {
		selected = [
			...selected,
			{
				id: item.id,
				classroom_id: item.theory_class_id,
				strength: theory_classes.filter((room) => room.id == item.theory_class_id)[0].strength,
				course_name: theory.filter(
					(course) =>
						course.id ==
						theory_slots.filter(
							(slot) =>
								slot.id ==
								theory_classes.filter((room) => room.id == item.theory_class_id)[0].slot_id
						)[0].course_id
				)[0].course_name,
				course_code: theory.filter(
					(course) =>
						course.id ==
						theory_slots.filter(
							(slot) =>
								slot.id ==
								theory_classes.filter((room) => room.id == item.theory_class_id)[0].slot_id
						)[0].course_id
				)[0].course_code,
				credit: theory.filter(
					(course) =>
						course.id ==
						theory_slots.filter(
							(slot) =>
								slot.id ==
								theory_classes.filter((room) => room.id == item.theory_class_id)[0].slot_id
						)[0].course_id
				)[0].credits,
				faculty_name: faculty_details.filter(
					(teacher) =>
						teacher.id ==
						theory_classes.filter((room) => room.id == item.theory_class_id)[0].teacher_id
				)[0].name,
				slot: theory_slots.filter(
					(slot) =>
						slot.id == theory_classes.filter((room) => room.id == item.theory_class_id)[0].slot_id
				)[0].slot
			}
		];
	});

	async function handleAdd(classroom_id) {
		let id = uuidv4();
		id = id.split('').slice(0, 15).join('');

		let flag = false;
		selected.forEach((item) => {
			if (item.classroom_id == classroom_id) flag = true;
		});
		student_timetable.forEach((item) => {
			if (item.theory_class_id == classroom_id) flag = true;
		});
		if (flag) {
			alert('You cannot choose the same class twice');
			return;
		}

		const response = await fetch('/api/addToDatabase?collectionName=student_theory_timetable', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id,
				student_id: user.id,
				theory_class_id: classroom_id
			})
		});

		let new_strength =
			selected.length === 0
				? undefined
				: selected.filter((item) => item.classroom_id == classroom_id)[0].strength;
		new_strength ? (new_strength += 1) : (new_strength = 1);
		console.log(classroom_id);
		const anotherResponse = await fetch('/api/updateDatabase?collectionName=theory_classes', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				record_id: classroom_id,
				strength: new_strength
			})
		});

		selected = [
			...selected,
			{
				id: id,
				classroom_id: classroom_id,
				strength: new_strength,
				course_name: theory.filter(
					(course) =>
						course.id ==
						theory_slots.filter(
							(slot) =>
								slot.id == theory_classes.filter((room) => room.id == classroom_id)[0].slot_id
						)[0].course_id
				)[0].course_name,
				course_code: theory.filter(
					(course) =>
						course.id ==
						theory_slots.filter(
							(slot) =>
								slot.id == theory_classes.filter((room) => room.id == classroom_id)[0].slot_id
						)[0].course_id
				)[0].course_code,
				credit: theory.filter(
					(course) =>
						course.id ==
						theory_slots.filter(
							(slot) =>
								slot.id == theory_classes.filter((room) => room.id == classroom_id)[0].slot_id
						)[0].course_id
				)[0].credits,
				faculty_name: faculty_details.filter(
					(teacher) =>
						teacher.id == theory_classes.filter((room) => room.id == classroom_id)[0].teacher_id
				)[0].name,
				slot: theory_slots.filter(
					(slot) => slot.id == theory_classes.filter((room) => room.id == classroom_id)[0].slot_id
				)[0].slot
			}
		];
	}
	async function handleRemove(class_id, classroom_id) {
		const response = await fetch(
			'/api/removeFromDatabase?collectionName=student_theory_timetable',
			{
				method: 'DELETE',
				headers: {
					'Content-Types': 'application/json'
				},
				body: JSON.stringify({
					id: class_id
				})
			}
		);

		let new_strength =
			selected.length === 0
				? undefined
				: selected.filter((item) => item.id == class_id)[0].strength;
		new_strength = new_strength ? new_strength - 1 : 0;

		const anotherResponse = await fetch('/api/updateDatabase?collectionName=theory_classes', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				record_id: classroom_id,
				strength: new_strength
			})
		});
		selected = selected.filter((course) => course.id != class_id);
	}
	function handleRedirection() {
		window.location.href = '/student/labs';
	}
</script>

<div class="button-area">
	<button class="selected">Courses</button>
	<button on:click={handleRedirection}>Labs</button>
</div>

<section>
	<h3>Your current selected courses for the next semester</h3>

	<div class="grid-container">
		{#each selected as course (course)}
			<div class="grid-item">
				<h3>{course.course_name}</h3>
				<div>Course code: {course.course_code}</div>
				<div>Credits: {course.credit}</div>
				<div>Slot: {course.slot}</div>
				<div>Strength: {course.strength}</div>
				<button
					on:click={() => {
						handleRemove(course.id, course.classroom_id);
					}}>Remove</button
				>
			</div>
		{/each}
	</div>
</section>

<section>
	<h3>Courses that are available for you to take</h3>

	<div class="grid-container">
		{#each theory_classes as classroom (classroom)}
			<div class="grid-item">
				<h3>
					{theory.filter(
						(course) =>
							course.id === theory_slots.filter((slot) => slot.id == classroom.slot_id)[0].course_id
					)[0].course_name}
				</h3>
				<div>
					Course code: {theory.filter(
						(course) =>
							course.id === theory_slots.filter((slot) => slot.id == classroom.slot_id)[0].course_id
					)[0].course_code}
				</div>
				<div>
					Credits: {theory.filter(
						(course) =>
							course.id === theory_slots.filter((slot) => slot.id == classroom.slot_id)[0].course_id
					)[0].credits}
				</div>
				<div>
					Faculty name: {faculty_details.filter((teacher) => teacher.id == classroom.teacher_id)[0]
						.name}
				</div>
				<div>Slot: {theory_slots.filter((slot) => slot.id == classroom.slot_id)[0].slot}</div>
				<div>Strength: {classroom.strength}</div>
				<button
					on:click={() => {
						handleAdd(classroom.id);
					}}>Add</button
				>
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
		gap: 2rem;
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
