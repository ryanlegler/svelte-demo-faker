<script>
	import { fly, slide } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	let creating = 'waiting...';

	let state = {
		id: 'user-name',
		userName: 'placeholder'
	};

	// $: console.log('form', form);
</script>

<form
	method="POST"
	action="?/foo"
	use:enhance={() => {
		creating = 'creating.....';
		return async ({ update }) => {
			setTimeout(async () => {
				await update({ reset: false });
				creating = 'done!';
			}, 1000);
		};
	}}
>
	<input class="text-grey-300" name="user-name" bind:value={state.userName} />

	{#if state.userName}
		<div in:fly out:fly>{state.userName}</div>
	{/if}

	{#if creating}
		<div in:fly out:fly>Creating: {creating}</div>
	{/if}

	<button class="" aria-label="Mark as complete">SUBMIT</button>
</form>
