<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick} class="button">
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<style>
	.button{
			background-color: red;
	}
</style>