<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
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
		invalidate('root-load');
	}
	async function handleOnReject() {
		invalidate('user-load');
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="m-10 grid grid-cols-2 gap-5">
	<div class="flex gap-5 flex-col">
		{#each userStack as user (user.id)}
			<h1
				class="text-4xl font-bold underline"
				in:receive={{ key: user.id }}
				out:send={{ key: user.id }}
				animate:flip={{ duration: 900 }}
			>
				<User {user} {handleOnClick} {handleOnReject} />
			</h1>
		{/each}
		<!-- <div>
			<button
				on:click={handleOnClick}
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-600"
				>Accept</button
			>

			<button
				on:click={handleOnReject}
				class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-600"
				>Reject</button
			>
		</div> -->
	</div>

	<div class="flex gap-5 flex-col">
		{#each users as user, index (user.id)}
			<div
				style={`z-index: ${users.length - index}`}
				class="h-full"
				in:receive={{ key: user.id }}
				out:send={{ key: user.id }}
				animate:flip={{ duration: 900 }}
			>
				<User {user} />
			</div>
		{/each}
	</div>
</section>

<style>
</style>
