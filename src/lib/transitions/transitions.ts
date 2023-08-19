import { crossfade } from 'svelte/transition';
import { quintOut } from 'svelte/easing';

export const [send, receive] = crossfade({
	duration: (d) => Math.sqrt(d * 200),
	fallback(node, params) {
		console.log('params', params);
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 300,
			easing: quintOut,
			css: (t, u) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			
			`
		};
	}
});
