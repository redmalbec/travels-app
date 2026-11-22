<script lang="ts">
  export let onSync: () => void;
  export let onMail: () => void;
  export let onAbout: () => void;
</script>

<div class="flex h-12 items-center gap-2 border-b bg-gray-100 px-4">
  <button on:click={onSync} class="rounded bg-blue-600 px-3 py-1 text-sm text-white">BtSync</button>
  <button on:click={onMail} class="rounded bg-blue-600 px-3 py-1 text-sm text-white">BtMail</button>
  <button on:click={onAbout} class="rounded bg-blue-600 px-3 py-1 text-sm text-white">BtAbout</button>
</div>