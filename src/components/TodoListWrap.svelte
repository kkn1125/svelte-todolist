<script>
    import Alert from './Alert.svelte';
    import AddBtn from './AddBtn.svelte';
    import Input from './Input.svelte';
    import TodoList from './TodoList.svelte';
    
    let todos = [
        {id: 0, text: 'test', done: false, regdate: new Date()},
        {id: 1, text: '킴슨입니다.', done: false, regdate: new Date()},
    ];

    let board;
    let todo;

    $: remaining = todos.filter(t=>t.done).length;
    $: total = todos.length;

    function addTodo(ev){
        if(!todo) {
            alert('빈 칸은 입력할 수 없습니다!');
            return;
        }
        todos[todos.length] = {
            id: todos.reduce((t,n)=>t<n.id?n.id:t,0)+1,
            text: todo,
            done: false,
            regdate: new Date(),
        };
        todo = '';
        board.focus();
    }

    function handleCheck(ev){
        let idx = todos.findIndex((a)=>a.id==ev.detail);
        todos[idx].done = !todos[idx].done;
    }

    function handleDelete(ev){
        todos = todos.filter(t=>t.id!=ev.detail);
    }
</script>

<TodoList {todos} on:check={handleCheck} on:deletes={handleDelete}/>
<Alert {remaining} {total}/>
<Input bind:root={board} bind:value={todo}/>
<AddBtn {addTodo}/>