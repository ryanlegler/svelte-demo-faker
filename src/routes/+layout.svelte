<script lang="ts">
	/** @type {import('./$types').PageData} */
	import '../app.css';
	import { page } from '$app/stores';
	$: path = $page.url.pathname;
</script>

<header class="p-3 flex gap-3">
	<a class={path === '/with-form' ? 'active' : ''} href="/with-form">
		<div class="flex flex-col">with-form <span>(no optimistic updates)</span></div>
	</a>
	<a class={path === '/with-click-handler' ? 'active' : ''} href="/with-click-handler">
		<div class="flex flex-col">with-click-handler <span>(no progressive enhancement)</span></div>
	</a>
	<a class={path === '/with-form-enhance' ? 'active' : ''} href="/with-form-enhance">
		<div class="flex flex-col">
			with-form-enhance<span>(progressive enhancement + optimistic updates)</span>
		</div>
	</a>
</header>

<slot />

<style>
	a.active {
		color: #fff;
	}
	a {
		color: #a7a4a4;
	}

	a + a {
		border-left: 1px solid grey;
		padding-left: 1em;
	}
	a span {
		opacity: 0.5;
		font-size: 0.9em;
	}
</style>
