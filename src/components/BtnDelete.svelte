<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let todo;
</script>

<button on:click={()=>dispatch('deleteTodo', todo.id)}>&times</button>