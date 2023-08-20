<script lang="ts">
	import type { User } from './user';
	export let handleOnReject: () => void = null as unknown as () => void;
	export let handleOnClick: () => void = null as unknown as () => void;
	export let user: User;
	$: ({ avatar, firstName, email, lastName, sex } = user);
</script>

<div class="h-full border-white rounded-md p-4 border-2 bg-slate-900">
	<div class="flex items-center justify-center gap-4">
		<div class="w-[75px]">
			<img class="rounded-full" src={avatar} alt="user avatar" width="100%" height="100%" />
		</div>

		<div class="flex flex-col w-full gap-1 items-start">
			<span class="text-m font-bold">
				{firstName}
				{lastName}
			</span>
			<span class="text-xs text-ellipsis max-w-full overflow-hidden">
				{email}
			</span>
			<span class="text-xs text-ellipsis overflow-hidden bg-slate-600 px-2 py-1 rounded-md">
				{sex}
			</span>
		</div>
		<div class="flex gap-4">
			{#if !!handleOnReject}
				<button
					on:click={handleOnClick}
					class="text-[30px] transition-transform origin-center hover:scale-[1.3]">✅</button
				>
			{/if}

			{#if !!handleOnClick}
				<button
					on:click={handleOnReject}
					class="text-[30px] transition-transform origin-center hover:scale-[1.3]">❌</button
				>
			{/if}
		</div>
	</div>
</div>
