<script lang="ts">
  import { onMount } from 'svelte';
  //import { Splitpanes, Pane } from 'svelte-splitpanes';
  import VerticalSplit from '../../../shared/ui/VerticalSplit.svelte';

  import TopPanel from '../../../widgets/top-panel/ui/TopPanel.svelte';
  import LeftPanel from '../../../widgets/left-panel/ui/LeftPanel.svelte';
  import RightPanel from '../../../widgets/right-panel/ui/RightPanel.svelte';
  import LoginModal from '../../../features/auth/ui/LoginModal.svelte';
  import type { Museum } from '../../../entities/museum/model/types';
  import { fetchMuseums, deleteMuseum, updateMuseum } from '../../../shared/api/client';

  let authenticated = false;
  let museums: Museum[] = [];
  let selectedId: number | null = null;
  let selectedMuseum: Museum | null = null;

  async function loadMuseums() {
    museums = await fetchMuseums();
  }

  function handleSelect(id: number) {
    selectedId = id;
    selectedMuseum = museums.find((m) => m.id === id) ?? null;
  }

  async function handleDelete() {
    if (selectedId === null) return;
    await deleteMuseum(selectedId);
    selectedId = null;
    selectedMuseum = null;
    await loadMuseums();
  }

  async function handleSave(data: Partial<Museum>) {
    if (selectedId === null) return;
    await updateMuseum(selectedId, data);
    await loadMuseums();
  }

  onMount(() => {
    // Данные загружаются только после аутентификации
  });

  function handleLoginSuccess() {
    authenticated = true;
    loadMuseums();
  }
</script>

{#if !authenticated}
  <LoginModal onSuccess={handleLoginSuccess} />
{:else}
  <div class="flex h-screen flex-col">
    <TopPanel
      onSync={() => alert('Sync')}
      onMail={() => alert('Mail')}
      onAbout={() => alert('About')}
    />
    <div class="flex-1">
      <VerticalSplit>
        <div slot="left" class="h-full">
          <LeftPanel
            {museums}
            {selectedId}
            onSelect={handleSelect}
            onRefresh={loadMuseums}
            onDelete={handleDelete}
          />
        </div>
        <div slot="right" class="h-full">
          <RightPanel museum={selectedMuseum} onSave={handleSave} />
        </div>
      </VerticalSplit>
      */
    </div>
  </div>
{/if}