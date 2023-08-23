<script lang="ts">
	import { send, receive } from '$lib/transitions/transitions';
	import { flip } from 'svelte/animate';
	import User from '$lib/components/User.svelte';
	import type { User as UserModel } from '$lib/components/user';
	export let data;
	export let userStack: UserModel[] = [data.user];
	export let users: UserModel[] = data.users || [];
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="m-3 grid grid-cols-1 gap-5 md:grid-cols-2">
	<form lang="ts" method="POST">
		<input type="hidden" name="user" value={JSON.stringify(userStack)} />

		<div class="flex gap-5 flex-col relative">
			{#each userStack as user (user.key)}
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
		{#each users as user, index (user.key)}
			<div
				style={`z-index: ${users.length - index}`}
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
