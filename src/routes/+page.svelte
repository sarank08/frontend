<script>
    export let data;
</script>
{#if data.user}
<h1>Welcome {data.user.name}</h1>
{:else}
<h1>Register or login now</h1>
{/if}
