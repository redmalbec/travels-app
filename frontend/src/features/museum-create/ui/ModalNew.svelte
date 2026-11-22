<script lang="ts">
  import { createMuseum } from '../../../shared/api/client';

  export let onClose: () => void;
  export let onCreated: () => void;

  let country = '';
  let city = '';
  let name = '';
  let rating = 0;
  let pict = '';

  async function handleSave() {
    await createMuseum({ country, city, name, rating, pict });
    onCreated();
    onClose();
  }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div class="w-96 rounded-lg bg-white p-6 shadow-xl">
    <h2 class="mb-4 text-lg font-bold">Новый музей</h2>
    <input bind:value={country} placeholder="Страна" class="mb-2 w-full rounded border p-2" />
    <input bind:value={city} placeholder="Город" class="mb-2 w-full rounded border p-2" />
    <input bind:value={name} placeholder="Название музея" class="mb-2 w-full rounded border p-2" />
    <input bind:value={rating} type="number" placeholder="Рейтинг" class="mb-2 w-full rounded border p-2" />
    <input bind:value={pict} placeholder="Ссылка на изображение" class="mb-4 w-full rounded border p-2" />
    <div class="flex gap-2">
      <button on:click={handleSave} class="flex-1 rounded bg-blue-600 p-2 text-white">Сохранить</button>
      <button on:click={onClose} class="flex-1 rounded bg-gray-300 p-2">Отмена</button>
    </div>
  </div>
</div>