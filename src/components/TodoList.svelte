<script>
    import { createEventDispatcher } from 'svelte';
    import {afterUpdate} from 'svelte';
    import TodoItem from './TodoItem.svelte';

    let dispatch = createEventDispatcher();

    let ul;

    $: idx = (data) => todos.indexOf(data);

    afterUpdate(()=>{
        ul.scrollTo(0, ul.scrollHeight);
    });

    export let todos;
</script>

<ul bind:this={ul}>
    {#each todos as todo (todo.id)}
    <TodoItem idx={idx(todo)} {todo} on:check={(ev)=>dispatch('check', ev.detail)} on:deletes={(ev)=>dispatch('deletes', ev.detail)}/>
    {/each}
</ul>

<style lang="scss">
    ul{
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: .5rem;
        margin: 1rem 0;
        background-color: white;
        box-shadow: 0 0 1rem 0 rgb(0,0,0,0.5);
        max-height: 45vh;
        overflow-y: auto;
    }
</style>