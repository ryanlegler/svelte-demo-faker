<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import { send, receive } from '$lib/transitions/transitions';
	import { flip } from 'svelte/animate';
	import User from '$lib/components/User.svelte';

	export let data;

	$: user = data.user || {};
	$: users = data.users || [];
	$: userStack = [user];

	async function handleOnClick() {
		const response = await fetch('/', {
			method: 'POST',
			body: JSON.stringify({ user, users }),
			headers: {
				'content-type': 'application/json'
			}
		});

		await response.json();
		invalidateAll();
	}
	async function handleOnReject() {
		invalidate('user-load');
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="m-3 grid grid-cols-1 gap-5 md:grid-cols-2">
	<div class="flex gap-5 flex-col">
		{#each userStack as user (user.id)}
			<div
				in:receive={{ key: user.id }}
				out:send={{ key: user.id }}
				animate:flip={{ duration: 300 }}
			>
				<User {user} {handleOnClick} {handleOnReject} />
			</div>
		{/each}
	</div>

	<div class="flex gap-5 flex-col">
		{#each users as user, index (user.id)}
			<div
				style={`z-index: ${users.length - index}`}
				class="h-full"
				in:receive={{ key: user.id }}
				out:send={{ key: user.id }}
				animate:flip={{ duration: 300 }}
			>
				<User {user} />
			</div>
		{/each}
	</div>
</section>

<style>
</style>
