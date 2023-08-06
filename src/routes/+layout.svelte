<script>
	export let data;
</script>

<nav>
	<div>
		<a href="/">Home</a>
		{#if !data.user}
			<div>
				<button>
					<a href="/login">Login</a>
				</button>
				<button>
					<a href="/register">Register</a>
				</button>
			</div>
		{:else}
			<form action="/api/logout" method="post">
				<button type="submit">Log OUT</button>
			</form>
		{/if}
	</div>
</nav>
<slot />

<style>
	a {
		text-decoration: none;
	}
	button a {
		color: inherit;
	}
	nav > div {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		font-size: 1.2rem;
		align-items: center;
	}
	nav > div > div {
		display: flex;
		gap: 1.3rem;
	}
	button {
		padding: 1em;
		font-size: 1rem;
		border-radius: 5px;
		border: none;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		transition-duration: 250ms;
		color: white;
		background-color: black;
	}
	button:hover {
		
		color: black;
		background-color: white;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}
	
</style>
