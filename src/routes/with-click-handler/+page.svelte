<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import { send, receive } from '$lib/transitions/transitions';
	import { flip } from 'svelte/animate';
	import User from '$lib/components/User.svelte';
	import type { User as UserModel } from '$lib/components/user';

	export let data;
	export let userOptimistic: UserModel[] = [];

	$: userOptimistic = [data.user];
	async function handleOnReject() {
		userOptimistic = [{ key: 1234 } as unknown as UserModel];
		invalidate('user-load');
	}

	export let usersOptimistic: UserModel[] = [];
	$: usersOptimistic = data.users || [];

	async function handleOnClick() {
		usersOptimistic = [data.user, ...usersOptimistic];
		userOptimistic = [{ key: 1234 } as unknown as UserModel];
		// invalidate('user-load');
		const response = await fetch('/with-click-handler', {
			method: 'POST',
			body: JSON.stringify({ user: data.user, users: usersOptimistic }),
			headers: {
				'content-type': 'application/json'
			}
		});

		await response.json();
		// invalidate('users-load');
		invalidateAll();
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="m-3 grid grid-cols-1 gap-5 md:grid-cols-2">
	<div class="flex gap-5 flex-col relative">
		{#each userOptimistic as user (user.key)}
			<div
				in:receive={{ key: user.key }}
				out:send={{ key: user.key }}
				animate:flip={{ duration: 300 }}
			>
				<User {user} {handleOnClick} {handleOnReject} />
			</div>
		{/each}
	</div>

	<div class="flex gap-5 flex-col">
		{#each usersOptimistic as user, index (user.key)}
			<div
				style={`z-index: ${usersOptimistic.length - index}`}
				class="h-full"
				in:receive={{ key: user.key }}
				out:send={{ key: user.key }}
				animate:flip={{ duration: 300 }}
			>
				<User {user} />
			</div>
		{/each}
	</div>
</section>

<style>
</style>
