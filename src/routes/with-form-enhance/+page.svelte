<script lang="ts">
	import { send, receive } from '$lib/transitions/transitions';
	import { flip } from 'svelte/animate';
	import User from '$lib/components/User.svelte';
	import type { User as UserModel } from '$lib/components/user';
	import { enhance } from '$app/forms';

	export let data;
	export let saving = '';
	export let userOptimistic: UserModel[] = [];
	$: userOptimistic = [data.user];

	export let usersOptimistic: UserModel[] = [];
	$: usersOptimistic =
		(usersOptimistic.length < data.users.length ? data.users : usersOptimistic) || [];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="m-3 grid grid-cols-1 gap-5 md:grid-cols-2">
	<form
		lang="ts"
		method="POST"
		use:enhance={async ({ action }) => {
			userOptimistic = [{ key: 1234 }]; // this is just a hack to trigger the loading state of the user - I'm sure there is a better way to do this
			if (action.search === '?/approve') {
				saving = 'saving...';
				usersOptimistic = [data.user, ...usersOptimistic];
			}
			return async ({ update }) => {
				if (action.search === '?/approve') {
					saving = 'saved!';
				}
				await update({ reset: false });
				setTimeout(async () => {
					saving = '';
				}, 100);
			};
		}}
	>
		<input type="hidden" name="user" value={JSON.stringify(userOptimistic)} />

		<div class="flex gap-5 flex-col relative">
			{#each userOptimistic as user (user.key)}
				<div
					in:receive={{ key: user.key }}
					out:send={{ key: user.key }}
					animate:flip={{ duration: 300 }}
				>
					<User {user} onRejectformaction="?/reject" onClickformaction="?/approve" />
				</div>
			{/each}
		</div>
	</form>

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
	<dialog class="rounded p-1" style="z-index: 1000" open={saving !== ''}>
		{saving}
	</dialog>
</section>

<style>
</style>
