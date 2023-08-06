<script>
	export let course_name;
	export let course_code;
	export let credits;
	export let selectedSlot;
</script>

<main>
	<h2>{course_name}</h2>
	<div><b>course code: </b>{course_code}</div>
	<div><b>credits: </b>{credits}</div>
	{#if selectedSlot}
		<div><b>Slot:</b> {selectedSlot}</div>
	{/if}
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 10px;
		height: 100%;
	}
</style>
