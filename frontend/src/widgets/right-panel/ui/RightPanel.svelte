<script lang="ts">
  import type { Museum } from '../../../entities/museum/model/types';

  export let museum: Museum | null = null;
  export let onSave: (data: Partial<Museum>) => void;

  let country = museum?.country ?? '';
  let city = museum?.city ?? '';
  let name = museum?.name ?? '';
  let rating = museum?.rating ?? 0;
  let pict = museum?.pict ?? '';

  $: if (museum) {
    country = museum.country;
    city = museum.city;
    name = museum.name;
    rating = museum.rating;
    pict = museum.pict;
  }

  function handleSave() {
    onSave({ country, city, name, rating, pict });
  }
</script>

<div class="flex h-full flex-col p-4">
  <div class="flex flex-1 gap-4">
    <div class="flex-1 space-y-2">
      <input bind:value={name} placeholder="TxtMuseum" class="w-full rounded border p-2" />
      <input bind:value={city} placeholder="TxtCity" class="w-full rounded border p-2" />
      <input bind:value={country} placeholder="TxtYear / Country" class="w-full rounded border p-2" />
      <div class="flex items-center gap-2">
        <span class="text-sm">ImgRating:</span>
        <span class="text-yellow-500">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</span>
      </div>
    </div>
    <div class="flex-1">
      {#if pict}
        <img src={pict} alt="Museum" class="h-48 w-full rounded object-cover" />
      {:else}
        <div class="flex h-48 items-center justify-center rounded bg-gray-200 text-gray-400">ImgPict</div>
      {/if}
    </div>
  </div>
  <div class="mt-4 flex gap-2">
    <button on:click={handleSave} class="rounded bg-green-600 px-3 py-1 text-sm text-white">BtSave</button>
    <button class="rounded bg-gray-400 px-3 py-1 text-sm text-white">BtFtp</button>
    <button class="rounded bg-gray-400 px-3 py-1 text-sm text-white">BtPrint</button>
    <button class="rounded bg-gray-400 px-3 py-1 text-sm text-white">BtFunc</button>
  </div>
</div>