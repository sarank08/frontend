<script>
    export let data
    const {user} = data
</script>
<h1>Welcome Dr. {user.name}</h1>
<slot />