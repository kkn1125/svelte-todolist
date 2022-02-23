<script>
    export let root, value;
</script>

<div class="wrap">
    <textarea bind:this={root} bind:value={value}></textarea>
</div>

<style lang="scss">
    .wrap{
        display: flex;
        flex-direction: column;
        textarea{
            background: white;
            box-shadow: 0 0 1rem 0 rgb(0,0,0,0.5);
        }
    }
</style>