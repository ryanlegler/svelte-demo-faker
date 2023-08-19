<script lang="ts">
	import type { User } from './user';
	export let handleOnReject: () => void = null as unknown as () => void;
	export let handleOnClick: () => void = null as unknown as () => void;
	export let user: User;
	$: ({ avatar, firstName, email, lastName, sex } = user);
</script>

<div class="h-full border-white rounded-md p-4 border-2 bg-slate-900">
	<div class="flex items-center justify-center gap-4">
		<img class="rounded-full" src={avatar} alt="user avatar" width="100" height="100" />

		<div class="flex flex-col w-full gap-1 items-start">
			<span class="sm:text-xl text-m font-bold">
				{firstName}
				{lastName}
			</span>
			<span class="sm:text-l text-xs text-ellipsis max-w-full overflow-hidden">
				{email}
			</span>
			<span
				class="sm:text-l text-xs text-ellipsis overflow-hidden bg-slate-600 px-2 py-1 rounded-md"
			>
				{sex}
			</span>
		</div>
		<div class="text-sm flex gap-2">
			{#if !!handleOnReject}
				<button
					on:click={handleOnClick}
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-600"
					>Accept</button
				>
			{/if}

			{#if !!handleOnClick}
				<button
					on:click={handleOnReject}
					class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-600"
					>Reject</button
				>
			{/if}
		</div>
	</div>
</div>
