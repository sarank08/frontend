<script>
	import {v4 as uuidv4} from 'uuid'
    
    export let data;
	let { labs, lab_slots, lab_classes, user } = data;
    let selected = []
    lab_classes.forEach(item => {
        data = {
            id: item.id,
            course_name: labs.filter(element => element.id == lab_slots.filter(i => i.id == item.lab_slot_id)[0].lab_id)[0].course_name,
            course_code: labs.filter(element => element.id == lab_slots.filter(i => i.id == item.lab_slot_id)[0].lab_id)[0].course_code,
            slot_id: item.lab_slot_id
        }
        selected = [...selected, data]
    });

    const cardSlot = {}
    labs.forEach(lab => {
        cardSlot[lab.id] = 'select a slot'
    });

    async function handleAdd(lab_id) {
        let id = uuidv4()
        id = id.split('').slice(0,15).join('')

        let flag = false
        lab_classes.forEach(element => {
            if(element.faculty_id == user.id && element.lab_slot_id == cardSlot[lab_id]) flag = true
        });
        selected.forEach(element => {
            if (element.slot_id == cardSlot[lab_id]) flag = true
        });
        if (flag) {
            alert("You already have a class on the same slot")
            return;
        }

        const response = await fetch('/api/addToDatabase?collectionName=lab_classes', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                lab_slot_id: cardSlot[lab_id],
                faculty_id: user.id,
                lab_strength: 0
            })
        })

        selected = [...selected, {
            id,
            course_name : labs.filter(element => element.id == lab_id)[0].course_name,
            course_code : labs.filter(element => element.id == lab_id)[0].course_code,
            slot_id: cardSlot[lab_id]
        }]
    }

    async function handleRemove(lab_slot_id) {
        const response = await fetch('/api/removeFromDatabase?collectionName=lab_classes', {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id:lab_slot_id
            })
        })
        selected.filter(item => item.slot_id != lab_slot_id)
    }
    function handleRedirection() {
        window.location.href = '/teacher'
    }
</script>

<div class="button-area">
    <button on:click={handleRedirection}>Courses</button>
    <button class="selected">Labs</button>
</div>

<section>
<h2>The labs that you have taken</h2>

<div class="grid-container">
    {#each selected as selected_lab (selected_lab)}
        <div class="grid-item">
            <h2>{selected_lab.course_name}</h2>
            <div><b>Course Code: </b> {selected_lab.course_code}</div>
            <div><b>Lab slot: </b>{lab_slots.filter(element => element.id == selected_lab.slot_id)[0].slot}</div>
            <button on:click={()=> {handleRemove(selected_lab.slot_id)}}>Remove</button>
        </div>
    {/each}
</div>
</section>

<section>
<h2>Available labs for you to take</h2>

<div class="grid-container">
	{#each labs as lab (lab)}
		<div class="grid-item">
			<h2>{lab.course_name}</h2>
			<div><b>Course code:</b> {lab.course_code}</div>
			<select name="slot" id="slot" bind:value={cardSlot[lab.id]}>
				{#each lab_slots as slot}
					{#if slot.lab_id == lab.id}
						<option value={slot.id}>{slot.slot}</option>
					{/if}
				{/each}
			</select>
            <button on:click={()=>{handleAdd(lab.id)}}>Add</button>
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
        box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
        border-radius: 1rem;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
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