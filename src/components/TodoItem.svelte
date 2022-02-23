<script>
    import { createEventDispatcher } from 'svelte';
    import BtnCheck from './BtnCheck.svelte';
    import BtnDelete from './BtnDelete.svelte';

    let dispatch = createEventDispatcher();

    $: convertedValue = (val) => val.replace(/\n/g, '<br>');
    $: toggleStyle = (bool) => bool
    ?'color: rgba(0,0,0,0.5);text-decoration-line: line-through;'
    :'color: rgba(0,0,0,1);text-decoration-line: none;';

    export let idx, todo;
</script>

<li>
    <span style={toggleStyle(todo.done)}>{idx+1} {@html convertedValue(todo.text)}</span>
    <span class="regdate">{todo.regdate.toLocaleString().slice(0, -3)}</span>
    <BtnCheck {todo} on:checkTodo={(ev)=>dispatch('check', ev.detail)}/>
    <BtnDelete {todo} on:deleteTodo={(ev)=>dispatch('deletes', ev.detail)}/>
</li>

<style lang="scss">
    li {
        border-bottom: 1px dashed rgb(214, 214, 214);
        padding-bottom: .5rem;
        &:not(:last-child){
            margin-bottom: .5rem;
        }
        &:last-child{
            border-bottom: none;
            padding-bottom: 0;
        }
        .regdate{
            font-size: .7rem;
            color: gray;
        }
    }
</style>