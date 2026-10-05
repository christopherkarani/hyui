import { writable } from 'svelte/store';

/** Shared active tab for the Industries section (set by nav dropdown, read by tabs). */
export const activeIndustry = writable(0);
