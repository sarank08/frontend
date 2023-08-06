<script>
    export let data;
    const {user} = data
</script>

<h2>Hello Mr. {user.name}</h2>
<slot />