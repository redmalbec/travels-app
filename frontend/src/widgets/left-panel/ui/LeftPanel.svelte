<script lang="ts">
  import type { Museum } from '../../../entities/museum/model/types';
  import ModalNew from '../../../features/museum-create/ui/ModalNew.svelte';

  export let museums: Museum[] = [];
  export let selectedId: number | null = null;
  export let onSelect: (id: number) => void;
  export let onRefresh: () => void;
  export let onDelete: () => void;

  let showModal = false;

  function handleNew() {
    showModal = true;
  }

  function handleCreated() {
    onRefresh();
  }

  function handleDelete() {
    if (selectedId !== null) {
      onDelete();
    }
  }
</script>

<div class="flex h-full flex-col">
  <div class="h-64 overflow-y-auto border-b">
    <table class="w-full text-sm">
      <thead class="sticky top-0 bg-gray-100">
        <tr>
          <th class="p-1 text-left">Страна</th>
          <th class="p-1 text-left">Музей</th>
          <th class="p-1 text-left">Рейтинг</th>
        </tr>
      </thead>
      <tbody>
        {#each museums as museum (museum.id)}
          <tr
            class="cursor-pointer hover:bg-blue-50 {selectedId === museum.id ? 'bg-blue-100' : ''}"
            on:click={() => onSelect(museum.id)}
          >
            <td class="p-1">{museum.country}</td>
            <td class="p-1">{museum.name}</td>
            <td class="p-1">{museum.rating}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="flex gap-2 p-2">
    <button on:click={handleNew} class="rounded bg-blue-600 px-3 py-1 text-sm text-white">BtNew</button>
    <button
      on:click={handleDelete}
      disabled={selectedId === null}
      class="rounded bg-red-600 px-3 py-1 text-sm text-white disabled:opacity-50"
    >
      BtDel
    </button>
  </div>
</div>

{#if showModal}
  <ModalNew onClose={() => (showModal = false)} onCreated={handleCreated} />
{/if}